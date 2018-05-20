import angular from 'angular';

export const HeaderComponent = {
    scope: {},
    template: require('./header.component.html'),
    controller: class HeaderController {
    }
};

export default angular.module('header', [])
                        .component('headerComponent', HeaderComponent);