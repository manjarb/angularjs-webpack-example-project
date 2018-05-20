import './app.component.scss';

export const AppComponent = {
    template: require('./app.component.html'),
    controller: [
        'PackagesService',
        class AppController {
            constructor (PackagesService) {
                this.packagesSevices = PackagesService;
            }

            $onInit() {
               this.packagesData = this.getDataPackageList();
            }

            async getDataPackageList() {
                const packages = await this.packagesSevices.getPackagesList();
                return packages.data;
            }
    }]
};

