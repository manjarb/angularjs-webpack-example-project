// Core Styles
import './styles/main.scss';

// Core Angular
import angular from 'angular';

import { AppComponent } from "./app.component";
import CommonModule from './modules/common/common.module';
import PackagesModule from './modules/packages/packages.module';

// These all export the module name
// import ngAnimateModuleName from 'angular-animate';

const dependencies = [
    // ngAnimateModuleName
    CommonModule.name,
    PackagesModule.name
];

angular.module('app', dependencies)
    .component('appComponent', AppComponent);