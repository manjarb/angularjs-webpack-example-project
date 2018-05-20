import './app.component.scss';

export const AppComponent = {
    template: require('./app.component.html'),
    controller: [
        'PackagesService',
        '$scope',
        class AppController {
            constructor (PackagesService, $scope) {
                this.scope = $scope;
                this.scope.pagesPackageDataLeft = [];
                this.scope.pagesPackageDataRight = [];
                this.packagesSevices = PackagesService;
            }

            $onInit() {
                this.getDataPackageList();
            }

            async getDataPackageList() {
                const packages = await this.packagesSevices.getPackagesList();
                const half_length = Math.ceil(packages.data.length / 2);
                this.scope.pagesPackageDataLeft = packages.data.slice(0, half_length);
                this.scope.pagesPackageDataRight = packages.data.slice(half_length, packages.data.length);
                this.scope.$apply();
                /*this.packagesData.map((dep) => {
                    this.mergedDepArray = this.mergedDepArray.concat(dep.dependencies);
                });
                console.log(this.mergedDepArray, 'mergedDepArray');*/
            }
    }]
};

