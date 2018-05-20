import './app.component.scss';

export const AppComponent = {
    template: require('./app.component.html'),
    controller: class AppController {
        constructor() {}
        $onInit() {
            console.log('AppController Init');
        }
    }
};

