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
                this.scope.packageDragStart = this.packageDragStart.bind(this);
                this.scope.allowDrop = this.allowDrop;
                this.scope.onPackageDrop = this.onPackageDrop.bind(this);

            }

            $onInit() {
            }

            allowDrop(e) {
                e.preventDefault();
            }

            packageDragStart(e, page) {
                e.dataTransfer.setData("currentDragPage", JSON.stringify(page));
                if (this.packagesSevice.checkIfObjectExistByKey(this.$ctrl.pagesData, 'page', page.page)) {
                    const currentPagePosition = this.packagesSevice.findArrayPositionWithData(this.$ctrl.pagesData, 'page', page.page);
                    this.$ctrl.pagesData.splice(currentPagePosition, 1);
                }
            }

            onPackageDrop(e) {
                const currentDragPage = JSON.parse(e.dataTransfer.getData("currentDragPage"));
                if (!this.packagesSevice.checkIfObjectExistByKey(this.$ctrl.pagesData, 'page', currentDragPage.page)) {
                    this.$ctrl.pagesData.push(currentDragPage);
                    this.scope.$apply();
                }
            }
        }
    ]
};

export default angular.module('packagesListGroup', [])
    .component('packagesListGroup', PackagesListGroupComponent);