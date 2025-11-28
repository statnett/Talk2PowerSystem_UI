const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack');
const {BaseHrefWebpackPlugin} = require("base-href-webpack-plugin");

const BACKEND_URL = "http://localhost:8000";

module.exports = (env, argv) => {
    const isProd = argv.mode === 'production';
    const baseHref = env.baseHref || '/';
    return {
        entry: './src/app.js',
        output: {
            filename: 'main.[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
            publicPath: baseHref,
        },
        devtool: isProd ? false : 'source-map',
        module: {
            rules: [
                {
                    test: /\.html$/i,
                    loader: 'html-loader',
                    options: {
                        sources: {
                            list: [
                                // Disable html-loader from processing <img src="..."> attributes.
                                // These image files are handled by CopyWebpackPlugin and copied to /dist/images,
                                // so we reference them directly by their public path (e.g. /images/foo.svg).
                                {
                                    tag: 'img',
                                    attribute: 'src',
                                    type: 'src',
                                    filter: () => false
                                }
                            ]
                        }
                    }
                },
                {
                    test: /\.css$/i,
                    use: [
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        isProd ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext][query]'
                    }
                },
                {
                    test: /\.(png|jpg|jpeg|gif|ico)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name][ext][query]'
                }
                },
            ],
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/layout.html',
                minify: isProd ? {
                    collapseWhitespace: true,
                    removeComments: true,
                    minifyJS: true,
                } : false,
            }),
            new BaseHrefWebpackPlugin({ baseHref: baseHref }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src/assets/i18n',
                        to: 'assets/i18n',
                    },
                    {
                        from: 'src/assets/images',
                        to: 'images',
                    },
                    {
                        from: 'src/assets/data',
                        to: 'assets/data',
                    }
                ],
            }),
            ...(isProd ? [new MiniCssExtractPlugin({
                filename: 'main.[contenthash].css',
            })] : []),
        ],
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                    },
                },
            },
            minimize: isProd,
            minimizer: [
                new CssMinimizerPlugin(),
            ],
        },
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'dist'),
                publicPath: baseHref,
            },
            port: 3000,
            open: true,
            hot: true,
            devMiddleware: {
                publicPath: baseHref,
            },
            historyApiFallback: {
                index: `${baseHref}index.html`,
            },
            watchFiles: ['src/**/*'],

            // Proxy only certain paths to real backend
            proxy: {
                '/rest': {
                    target: BACKEND_URL,
                    secure: false,
                    changeOrigin: true,
                },
                '/__about': {
                    target: BACKEND_URL,
                    secure: false,
                    changeOrigin: true,
                }
            }
        }
    };
};
