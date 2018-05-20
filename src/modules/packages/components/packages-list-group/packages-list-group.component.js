import angular from 'angular';

export const PackagesListGroupComponent = {
    template: require('./packages-list-group.component.html'),
    controller: class PackagesListGroupController {

    }
};

export default angular.module('packagesListGroup', [])
    .component('packagesListGroup', PackagesListGroupComponent);