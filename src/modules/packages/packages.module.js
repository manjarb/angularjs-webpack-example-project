import angular from 'angular';
import packagesListGroupModule from './components/packages-list-group/packages-list-group.component';

export default angular.module('packages', [
    packagesListGroupModule.name
]);