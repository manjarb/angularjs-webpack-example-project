import './app.component.scss';

export const AppComponent = {
    template: require('./app.component.html'),
    controller: [
        'PackagesService',
        '$scope',
        class AppController {
            constructor (PackagesService, $scope) {
                this.scope = $scope;
                this.scope.mergedPackageNameArray = [];
                this.packagesSevices = PackagesService;
            }

            $onInit() {
                this.getDataPackageList();
            }

            async getDataPackageList() {
                const packages = await this.packagesSevices.getPackagesList();
                this.scope.pagesPackageData = packages.data;
                this.scope.$apply();
                /*this.packagesData.map((dep) => {
                    this.mergedDepArray = this.mergedDepArray.concat(dep.dependencies);
                });
                console.log(this.mergedDepArray, 'mergedDepArray');*/
            }
    }]
};

