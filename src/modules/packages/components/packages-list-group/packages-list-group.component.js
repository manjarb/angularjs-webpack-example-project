import angular from 'angular';

export const PackagesListGroupComponent = {
    bindings: {
        pagesData: '<'
    },
    template: require('./packages-list-group.component.html'),
    controller: [
        'PackagesService',
        '$scope',
        class PackagesListGroupController {
            constructor(PackagesService, $scope) {
                this.scope = $scope;
                this.$ctrl = $scope.$ctrl;
                this.packagesSevice = PackagesService;
                this.scope.returnPageTitle = this.packagesSevice.returnPageTitle;
                this.scope.packageDragStart = this.packageDragStart.bind(this)
            }
            $onInit() {
            }

            packageDragStart(e, page) {
                e.dataTransfer.setData("currentDragPage", JSON.stringify(page));
            }
        }
    ]
};

export default angular.module('packagesListGroup', [])
    .component('packagesListGroup', PackagesListGroupComponent);