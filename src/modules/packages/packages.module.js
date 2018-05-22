import angular from 'angular';
import packagesListGroupModule from './components/packages-list-group/packages-list-group.component';
import packagesSearchBoxModule from './components/packages-search-box/packages-search-box.component'
import packagesDropZoneBoxModule from './components/packages-drop-zone-box/packages-drop-zone-box.component'

export default angular.module('packages', [
    packagesListGroupModule.name,
    packagesSearchBoxModule.name,
    packagesDropZoneBoxModule.name
]);