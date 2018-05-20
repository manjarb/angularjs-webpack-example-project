import angular from 'angular';

export const PackagesListGroupComponent = {
    template: require('./packages-list-group.component.html')
};

export class PackagesListGroupController {

}

export default angular.module('packagesListGroup', [])
    .component('packagesListGroup', PackagesListGroupComponent)
    .controller('packagesListGroupController', PackagesListGroupController);