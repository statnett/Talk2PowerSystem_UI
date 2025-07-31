import './tt2ps-header.directive.scss';
import template from './tt2ps-header.directive.html';

const HeaderModule = angular.module('tt2ps.components.header', []);

HeaderModule.directive('tt2psHeader', Tt2psHeaderDirective);

function Tt2psHeaderDirective() {
    return {
        restrict: 'E',
        template,
        link: () => {},
    };
}

export default HeaderModule;
