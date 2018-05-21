import './app.component.scss';
import Chart from 'chart.js';
import _ from 'lodash';

export const AppComponent = {
    scope: {},
    template: require('./app.component.html'),
    controller: [
        'PackagesService',
        'ChartService',
        '$scope',
        class AppController {
            constructor (PackagesService, ChartService, $scope) {
                this.scope = $scope;
                this.scope.pagesPackageDataLeft = [];
                this.scope.pagesPackageDataRight = [];
                this.scope.adjustPackageResult = [];
                this.packagesSevices = PackagesService;
                this.chartService = ChartService;
            }

            $onInit() {
                this.getDataPackageList();
            }

            async getDataPackageList() {
                const packages = await this.packagesSevices.getPackagesList();
                const half_length = Math.ceil(packages.data.length / 2);
                this.scope.pagesPackageData = packages.data;
                this.scope.pagesPackageDataLeft = packages.data.slice(0, half_length);
                this.scope.pagesPackageDataRight = packages.data.slice(half_length, packages.data.length);

                let duplicatePackageArray = [];
                packages.data.map((pack) => {
                    pack.dependencies.map((dep) => {
                        duplicatePackageArray.push({ packageName: dep });
                    })
                });

                const results = _(duplicatePackageArray)
                    .groupBy('packageName')
                    .map((items, packageName) => ({ packageName, count: items.length }))
                    .value();
                const packagesListName = [];
                const packagesListSize = [];
                const packagesColorSet = [];
                results.map((result) => {
                    packagesListName.push(result.packageName);
                    packagesListSize.push(result.count);
                    packagesColorSet.push(this.chartService.getRandomColor())
                });
                console.log(results, 'results');
                this.scope.adjustPackageResult = results;

                const chartOptions = {
                    maintainAspectRatio: false,
                };
                const ctx = document.getElementById('packages-bar-chart').getContext('2d');
                let myChart = new Chart(ctx, this.chartService.returnChartObject(packagesListName, packagesListSize, 'horizontalBar', packagesColorSet, chartOptions));

                this.scope.$apply();
            }
    }]
};

