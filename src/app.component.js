export const AppComponent = {
    template: require('./app.component.html')
};

export class AppController {
    constructor() {}
    $onInit() {
        console.log('AppController Init');
    }
}