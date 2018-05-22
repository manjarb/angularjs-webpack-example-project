import angular from 'angular';
import './packages-drop-zone-box.component.scss';

export const PackagesDropZoneBoxComponent = {
    scope: {},
    bindings: {
        onComparePackages: '&'
    },
    template: require('./packages-drop-zone-box.component.html'),
    controller: [
        'PackagesService',
        '$scope',
        class PackagesDropZoneBoxController {
            constructor(PackagesService, $scope) {
                this.scope = $scope;
                this.$ctrl = $scope.$ctrl;
                this.packagesSevice = PackagesService;
                this.scope.returnPageTitle = this.packagesSevice.returnPageTitle;
                this.scope.allowDrop = this.allowDrop;
                this.scope.onPackageDrop = this.onPackageDrop.bind(this);
                this.scope.packageDragStart = this.packageDragStart.bind(this);
                this.scope.startComparePackages = this.startComparePackages.bind(this);

                this.scope.selectedPages = [];
            }

            $onInit() {
            }

            allowDrop(e) {
                e.preventDefault();
            }

            packageDragStart(e, page) {
                e.dataTransfer.setData("currentDragPage", JSON.stringify(page));
                if (this.packagesSevice.checkIfObjectExistByKey(this.scope.selectedPages, 'page', page.page)) {
                    const currentPagePosition = this.packagesSevice.findArrayPositionWithData(this.scope.selectedPages, 'page', page.page);
                    this.scope.selectedPages.splice(currentPagePosition, 1);
                }
            }

            onPackageDrop(e) {
                const currentDragPage = JSON.parse(e.dataTransfer.getData("currentDragPage"));
                if (!this.packagesSevice.checkIfObjectExistByKey(this.scope.selectedPages, 'page', currentDragPage.page)) {
                    this.scope.selectedPages.push(currentDragPage);
                    this.scope.$apply();
                }
            }

            startComparePackages() {
                this.$ctrl.onComparePackages({
                    $event: {
                        comparePackages: this.scope.selectedPages
                    }
                });
            }
    }]
};

export default angular.module('packagesDropZoneBox', [])
    .component('packagesDropZoneBox', PackagesDropZoneBoxComponent);