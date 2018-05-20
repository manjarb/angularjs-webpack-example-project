// Core Styles
import './styles/main.scss';

// Core Angular
import angular from 'angular';
import { AppComponent, AppController } from "./app.component";
import CommonModule from './modules/common/common.module';
import PackagesModule from './modules/packages/packages.module';

// These all export the module name
// import ngAnimateModuleName from 'angular-animate';

// Modules
// import 'common/components/1'; // Paths are just examples

const dependencies = [
    // ngAnimateModuleName
    CommonModule.name,
    PackagesModule.name
];

angular.module('app', dependencies)
    .component('appComponent', AppComponent)
    .controller('appController', AppController);