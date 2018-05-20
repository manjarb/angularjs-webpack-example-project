import angular from 'angular';

export const PackagesSearchBoxComponent = {
    scope: {},
    bindings: {
        pagesData: '<'
    },
    template: require('./packages-search-box.component.html'),
    controller: [
        '$scope',
        class PackagesSearchBoxController {
            constructor($scope) {
                this.$ctrl = $scope.$ctrl;
            }
            $onInit() {
                /// console.log(this.$ctrl, '$ctrl');
                // console.log(this.$ctrl['pagesData'], 'pagesData');
            }
    }]
};

export default angular.module('packagesSearchBox', [])
    .component('packagesSearchBox', PackagesSearchBoxComponent);