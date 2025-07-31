import './tt22ps.directive.scss';
import template from './tt2ps.directive.html';

const TT2PSLoaderModule = angular
    .module('tt2ps.directives.core.tt2ps-loader', []);

TT2PSLoaderModule.directive('tt2psLoader', TT2PSLoaderDirective);

TT2PSLoaderDirective.$inject = ['$timeout'];

function TT2PSLoaderDirective($timeout) {
    return {
        restrict: 'A',
        scope: {
            size: '@',
            trigger: '@',
            messageAttr: '=message',
            timeoutAttr: '=timeout',
            ngShow: '=',
            ngHide: '='
        },
        template,
        link: function (scope) {
            const restartTimeout = function ($timeout, scope) {
                scope.timer = undefined;
                scope.currentMessage = scope.getMessage();
                const time = scope.timeout[scope.index % scope.timeout.length];
                if (time) {
                    scope.timer = $timeout(function () {
                        if (scope.index + 1 < scope.message.length || scope.message.length === 0) {
                            scope.index++;
                            restartTimeout($timeout, scope);
                        }
                    }, time * 1000);
                }
            };

            scope.message = scope.messageAttr;
            scope.getMessage = function () {
                return scope.message[scope.index];
            };
            if (scope.message === undefined) {
                scope.message = [''];
            } else if (typeof scope.message === 'function') {
                scope.getMessage = scope.message;
                scope.message = []; // empty array = infinite number of messages
            } else if (typeof scope.message !== 'object') {
                scope.message = [scope.message];
            }

            scope.timeout = scope.timeoutAttr;
            if (scope.timeout === undefined) {
                scope.timeout = [0];
            } else if (typeof scope.timeout !== 'object') {
                scope.timeout = [scope.timeout];
            }

            scope.index = 0;
            restartTimeout($timeout, scope);

            const triggerFunction = function (show) {
                if (scope.timer) {
                    $timeout.cancel(scope.timer);
                }
                if (show) {
                    scope.index = 0;
                    restartTimeout($timeout, scope);
                }
            };

            scope.$watch('ngShow', function (value) {
                triggerFunction(value);
            });

            scope.$watch('ngHide', function (value) {
                triggerFunction(!value);
            });

            scope.$on('$destroy', function () {
                if (scope.timer) {
                    $timeout.cancel(scope.timer);
                }
            });

        },
    };
}

export default TT2PSLoaderModule;
