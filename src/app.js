/**
 * Entry point for the AngularJS application.
 * Loads styles, dependencies, the main controller module, and configures routing and translation.
 */

import './styles/main.scss';
import './vendor/vendor';
import angular from 'angular';
import ngRoute from 'angular-route';
import ocLazyLoad from 'oclazyload';
import ngTranslate from 'angular-translate';
import toastr from 'angular-toastr';
import ngTranslateLoaderStaticFiles from 'angular-translate-loader-static-files';

import mainModule from './main.controller';
import EditableContentModule from './directives/core/editable-content/editable-content.directive';
import TooltipModule from "./directives/core/tt2ps-tooltips/tt2ps-tooltips.directive";
import routes from './routes';
import CopyToClipboardModule from "./directives/core/copy-to-clipboard/copy-to-clipboard.directive";
import {NumberUtils} from "./services/utils/number-utils";
import HeaderModule from "./directives/tt2ps-header/tt2ps-header.directive";
import TT2PSLoaderModule from "./directives/core/tt2ps-loader/tt2ps-loader.directive";
import OpenInSparqlEditorModule from "./directives/core/open-in-sparql-editor/open-in-sparql-editor.directive";

// $translate.instant converts <b> from strings to &lt;b&gt
// and $sce.trustAsHtml could not recognise that this is valid html
export const decodeHTML = function (html) {
    let txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
};

let dependencies = [
    ngRoute,
    ocLazyLoad,
    ngTranslate,
    toastr,
    ngTranslateLoaderStaticFiles,
    mainModule.name,
    EditableContentModule.name,
    TooltipModule.name,
    CopyToClipboardModule.name,
    HeaderModule.name,
    TT2PSLoaderModule.name,
    OpenInSparqlEditorModule.name
];

angular.module('tt2ps', dependencies)
    .config([
        '$routeProvider',
        '$locationProvider',
        '$translateProvider',
        'toastrConfig',
        function ($routeProvider, $locationProvider, $translateProvider, toastrConfig) {

            /**
             * Initializes the configuration by setting routing and translations.
             * Enables HTML5 routing and registers routes and translation settings.
             */
            const init = () => {
                // Enables HTML5 mode for routing, removing the hashbang (#!) from URLs.
                $locationProvider.html5Mode(true);
                setupTranslation();
                registerRoutes();
                configureToastr();
            };

            /**
             * Configures the translation provider to load language files via HTTP from static JSON files.
             */
            const setupTranslation = () => {
                $translateProvider.useStaticFilesLoader({
                    prefix: 'assets/i18n/',
                    suffix: '.json',
                });

                $translateProvider.preferredLanguage('en');
                // Sets strategy to 'escape' to HTML-escape the translation values for security.
                $translateProvider.useSanitizeValueStrategy('escape');
            };

            /**
             * Registers application routes and sets up lazy-loaded modules.
             */
            const registerRoutes = () => {
                routes.forEach(route => {
                    const template = require(`${route.template}`);
                    $routeProvider.when(route.path, {
                        template: template.default || template,
                        controller: route.controller,
                        resolve: {
                            load: [
                                '$ocLazyLoad',
                                $ocLazyLoad => import(`${route.lazyModule}`).then(mod => $ocLazyLoad.inject(mod.default.name))
                            ]
                        }
                    });
                });

                $routeProvider.otherwise({redirectTo: '/'});
            };

            const configureToastr = () => {
                angular.extend(toastrConfig, {
                    timeOut: 5000,
                    positionClass: 'toast-bottom-right',
                    tapToDismiss: false,
                    extendedTimeOut: 5000
                });
            }

            init();
        }
    ])
    .filter('trustAsHtml', ['$translate', '$sce', ($translate, $sce) => (message) => $sce.trustAsHtml(decodeHTML(message))])
    .filter('formatNumberToLocaleString', ['$translate', ($translate) => (number) => NumberUtils.formatNumberToLocaleString(number, $translate.use())]);;

if (module.hot) {
    module.hot.accept();
}
