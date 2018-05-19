// Core Styles
import './styles/main.scss';

// Core Angular
import angular from 'angular';
import { AppComponent, AppController } from "./app.component";

// These all export the module name
// import ngAnimateModuleName from 'angular-animate';

// Modules
// import 'common/components/1'; // Paths are just examples

const dependencies = [
    // ngAnimateModuleName
];

console.log('running angular999');

angular.module('app', dependencies)
    .component('appComponent', AppComponent);
    // .controller('AppController', AppController);