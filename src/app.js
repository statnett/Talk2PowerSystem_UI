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
import UnauthorizedInterceptorModule from "./interceptors/unauthorized.interceptor";
import AuthenticationInterceptorModule from "./interceptors/authentication.interceptor";
import UserDatetimeHeaderInterceptor from './interceptors/user-datetime-header.interceptor';
import SecurityServiceModule from "./services/security/security.service";
import SecurityContextServiceModule from "./services/security/security-context.service";
import {SecurityConfigurationModel} from "./models/security/security-configuration";
import AuthenticationModule from "./services/security/authentication.service";
import {UserModel} from "./models/security/user";
import ToastrServiceModule from "./services/toast.service";

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
    ngTranslateLoaderStaticFiles,
    mainModule.name,
    EditableContentModule.name,
    TooltipModule.name,
    CopyToClipboardModule.name,
    HeaderModule.name,
    TT2PSLoaderModule.name,
    OpenInSparqlEditorModule.name,
    UnauthorizedInterceptorModule.name,
    AuthenticationInterceptorModule.name,
    UserDatetimeHeaderInterceptor.name,
    SecurityServiceModule.name,
    SecurityContextServiceModule.name,
    AuthenticationModule.name,
    ToastrServiceModule.name
];

const TT2PSModule = angular.module('tt2ps', dependencies);

TT2PSModule.$inject = [
    '$httpProvider',
    '$routeProvider',
    '$locationProvider',
    '$translateProvider'
]

TT2PSModule.config(TT2PS)
    .filter('trustAsHtml', ['$translate', '$sce', ($translate, $sce) => (message) => $sce.trustAsHtml(decodeHTML(message))])
    .filter('formatNumberToLocaleString', ['$translate', ($translate) => (number) => NumberUtils.formatNumberToLocaleString(number, $translate.use())]);


function TT2PS($httpProvider, $routeProvider, $locationProvider, $translateProvider) {
    /**
     * Initializes the configuration by setting routing and translations.
     * Enables HTML5 routing and registers routes and translation settings.
     */
    const init = () => {
        // Enables HTML5 mode for routing, removing the hashbang (#!) from URLs.
        $locationProvider.html5Mode(true);
        setupTranslation();
        registerRoutes();
        initInterceptors();
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

    const initInterceptors = () => {
        $httpProvider.interceptors.push('UnauthorizedInterceptor');
        $httpProvider.interceptors.push('AuthenticationInterceptor');
        $httpProvider.interceptors.push('UserDatetimeInterceptor');
    };

    init();
}

TT2PSModule.run([
    '$rootScope',
    '$location',
    '$q',
    'SecurityService',
    'SecurityContextService',
    'AuthenticationService',
    '$route',
    function ($rootScope, $location, $q, SecurityService, SecurityContextService, AuthenticationService, $route) {

        const unregisterRouteDisabling = $rootScope.$on('$routeChangeStart', (event) => {
            event.preventDefault();
        });

        const setAuthenticatedUser = () => {
            AuthenticationService.getActiveAccount()
                .then((activeAccount) => {
                    const user = new UserModel({
                        username: activeAccount.username,
                        name: activeAccount.name
                    });
                    SecurityContextService.updateAuthenticatedUser(user);
                });
        };

        const setupSecurityConfiguration = () => {
            return SecurityService.getConfiguration()
                .then((securityConfiguration) => {
                    SecurityContextService.updateSecurityConfiguration(securityConfiguration);
                    return securityConfiguration;
                });
        };

        const authenticateUser = (securityConfiguration) => {
            return AuthenticationService.initialize(securityConfiguration)
                .then(() => AuthenticationService.isAuthenticated())
                .then((isAuthenticated) => !isAuthenticated ? $location.path('login') : setAuthenticatedUser());
        };

        const init = () => {
            setupSecurityConfiguration()
                .then((securityConfiguration) => securityConfiguration.enabled ? authenticateUser(securityConfiguration) : $q.resolve())
                .catch((err) => {
                    console.error('Failed to load security config:', err);
                    SecurityContextService.updateSecurityConfiguration(new SecurityConfigurationModel());
                })
                .finally(() => {
                    // After security configuration is ready, allow routing
                    unregisterRouteDisabling();
                    // Force route reload to apply registered routes
                    $route.reload();
                });
        }

        init();
    }
]);

if (module.hot) {
    module.hot.accept();
}
