import angular from 'angular';

export const HeaderComponent = {
    template: require('./header.component.html')
};

export class HeaderController {

}

export default angular.module('header', [])
                        .component('headerComponent', HeaderComponent)
                        .controller('headerController', HeaderController);