import angular from 'angular';
import packagesListGroupModule from './components/packages-list-group/packages-list-group.component';
import packagesSearchBoxModule from './components/packages-search-box/packages-search-box.component'

export default angular.module('packages', [
    packagesListGroupModule.name,
    packagesSearchBoxModule.name
]);