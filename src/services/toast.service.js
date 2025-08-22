import 'angular-toastr';
import angular from "angular";

const ToastrServiceModule = angular.module("tt2ps.services.toastr-service", [
    'toastr'
]);

/**
 * Configure the angular-toastr global settings for the application.
 */
ToastrServiceModule.config(['toastrConfig', function(toastrConfig) {
    angular.extend(toastrConfig, {
        timeOut: 5000,
        positionClass: 'toast-bottom-right',
        tapToDismiss: false,
        allowHtml: true,
        extendedTimeOut: 5000
    });
}]);

ToastrServiceModule.factory("ToastrService", ToastrService);
ToastrService.$inject = ['toastr'];

/**
 * Service providing wrapper methods around angular-toastr for displaying notifications.
 */
function ToastrService(toastr) {
    const decodeHtmlEntities = (text) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    };

    const show = (type, message, title) => {
        toastr[type](decodeHtmlEntities(message), title || undefined, {
            allowHtml: true,
            closeButton: true,
            timeOut: 5000,
        });
    };

    return {
        success: (message, title) => show("success", message, title),
        error: (message, title) => show("error", message, title),
        info: (message, title) => show("info", message, title),
        warning: (message, title) => show("warning", message, title),
    };
}

export default ToastrServiceModule;
