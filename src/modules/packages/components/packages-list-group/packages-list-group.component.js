import angular from 'angular';

export const PackagesListGroupComponent = {
    bindings: {
        pagesData: '<'
    },
    template: require('./packages-list-group.component.html'),
    controller: class PackagesListGroupController {
        constructor($scope) {
            this.scope = $scope;
            this.$ctrl = $scope.$ctrl;
            this.scope.returnPageTitle = this.returnPageTitle.bind(this);
            this.scope.packageDragStart = this.packageDragStart.bind(this)
        }
        $onInit() {
        }

        returnPageTitle(props) {
            const title = _.find(props, {'-name': 'title'});
            return title['value']['#text'];
        }

        packageDragStart(e, page) {
            console.log(e.target.children[0].id, 'ee');
            console.log(page, 'page');
        }
    }
};

export default angular.module('packagesListGroup', [])
    .component('packagesListGroup', PackagesListGroupComponent);