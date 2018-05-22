import angular from 'angular';

export const PackagesListGroupComponent = {
    scope: {},
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
                this.scope.listPagesData = [];
                this.setPagesData = this.setPagesData.bind(this);
            }

            $onInit() {
                setTimeout(() => {
                    this.setPagesData();
                }, 500);
            }

            setPagesData() {
                this.scope.listPagesData = this.$ctrl.pagesData.slice();
                this.scope.$apply();
            }

            allowDrop(e) {
                e.preventDefault();
            }

            packageDragStart(e, page) {
                e.dataTransfer.setData("currentDragPage", JSON.stringify(page));
                if (this.packagesSevice.checkIfObjectExistByKey(this.scope.listPagesData, 'page', page.page)) {
                    const currentPagePosition = this.packagesSevice.findArrayPositionWithData(this.scope.listPagesData, 'page', page.page);
                    this.scope.listPagesData.splice(currentPagePosition, 1);
                }
            }

            onPackageDrop(e) {
                const currentDragPage = JSON.parse(e.dataTransfer.getData("currentDragPage"));
                if (!this.packagesSevice.checkIfObjectExistByKey(this.scope.listPagesData, 'page', currentDragPage.page)) {
                    this.scope.listPagesData.push(currentDragPage);
                    this.scope.$apply();
                }
            }
        }
    ]
};

export default angular.module('packagesListGroup', [])
    .component('packagesListGroup', PackagesListGroupComponent);