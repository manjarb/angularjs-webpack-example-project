import angular from 'angular';
import './packages-drop-zone-box.component.scss';

export const PackagesDropZoneBoxComponent = {
    bindings: {

    },
    template: require('./packages-drop-zone-box.component.html'),
    controller: class PackagesDropZoneBoxController {
        constructor($scope) {
            this.scope = $scope;
            this.$ctrl = $scope.$ctrl;
            this.scope.allowDrop = this.allowDrop;
            this.scope.onPackageDrop = this.onPackageDrop;

            this.scope.selectedPages = [];
        }

        $onInit() {
        }

        allowDrop(e) {
            e.preventDefault();
        }

        onPackageDrop(e) {
            const currentDragPage = JSON.parse(e.dataTransfer.getData("currentDragPage"));
            console.log(JSON.parse(currentDragPage));
        }


    }
};

export default angular.module('packagesDropZoneBox', [])
    .component('packagesDropZoneBox', PackagesDropZoneBoxComponent);