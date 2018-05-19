// Core Styles
import './styles/main.scss';

// Core Angular
import angular from 'angular';
import AppController from "./app.component";

// These all export the module name
// import ngAnimateModuleName from 'angular-animate';

// Modules
// import 'common/components/1'; // Paths are just examples

const dependencies = [
    // ngAnimateModuleName
];

angular.module('app', dependencies)
    .controller(AppController, function() {
        // Controller code
    })
    .config(function() {
        // Config code
    });