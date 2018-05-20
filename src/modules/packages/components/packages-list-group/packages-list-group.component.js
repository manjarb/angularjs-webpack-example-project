import angular from 'angular';

export const PackagesListGroupComponent = {
    bindings: {
        pagesData: '='
    },
    template: require('./packages-list-group.component.html'),
    controller: class PackagesListGroupController {
        constructor($scope) {
            this.$ctrl = $scope.$ctrl;
        }
        $onInit() {
            console.log(this.$ctrl, 'group init2');
        }
    }
};

export default angular.module('packagesListGroup', [])
    .component('packagesListGroup', PackagesListGroupComponent);