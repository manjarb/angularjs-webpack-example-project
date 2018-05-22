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

                this.scope.initComparePackagesChart = this.initComparePackagesChart.bind(this);
                this.myChart = null;
                this.pieChart = null;
            }

            $onInit() {
                this.getDataPackageList();
            }

            async getDataPackageList() {
                const packages = await this.packagesSevices.getPackagesList();
                const pagesName = await this.packagesSevices.getPagesName();
                let convertPagesKey = [];
                _.each(pagesName.data.pages.page, (value, key) => {
                    convertPagesKey.push({
                        ...value,
                        page: value['name']
                    });
                });
                this.scope.mergedPagesDetails = _.map(packages.data, (obj) => {
                    return _.assign(obj, _.find(convertPagesKey, {page: obj.page}));
                });

                this.scope.pagesPackageData = this.scope.mergedPagesDetails;

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
                this.scope.adjustPackageResult = results;

                const chartOptions = {
                    maintainAspectRatio: false,
                };
                // const ctx = document.getElementById('packages-bar-chart').getContext('2d');
                // let myChart = new Chart(ctx, this.chartService.returnChartObject(packagesListName, packagesListSize, 'horizontalBar', packagesColorSet, chartOptions));

                this.scope.$apply();
            }

            initComparePackagesChart(pages) {
                const comparePackages = pages.comparePackages;
                const duplicateComparePackagesList = this.packagesSevices.returnDuplicatePackagesList(comparePackages);
                const packagesCountList = this.packagesSevices.returnPackagesCountList(duplicateComparePackagesList);

                const packagesListName = [];
                const packagesListSize = [];
                const packagesColorSet = [];
                packagesCountList.map((result) => {
                    packagesListName.push(result.packageName);
                    packagesListSize.push(result.count);
                    packagesColorSet.push(this.chartService.getRandomColor())
                });

                const chartOptions = {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            barThickness : 30
                        }]
                    },
                    maintainAspectRatio: false
                };

                let chartCanvas = document.getElementById('packages-compare-bar-chart');
                const ctx = chartCanvas.getContext('2d');
                const ctxBox = document.getElementById('packages-compare-chart-box');
                ctxBox.style.width = packagesListSize.length * 45 + "px";
                if(this.myChart) {
                    this.myChart.destroy();
                }

                this.myChart = new Chart(ctx, this.chartService.returnChartObject(packagesListName, packagesListSize, 'bar', packagesColorSet, chartOptions));
                const ctxContainer = document.getElementById('package-compare-chart-section');
                window.scroll(0, this.chartService.findElementPosition(ctxContainer) + (-60));

                document.getElementById('packages-compare-bar-chart').onclick = (evt) =>{
                    const activePoints = this.myChart.getElementsAtEvent(evt);
                    const firstPoint = activePoints[0];
                    const label = this.myChart.data.labels[firstPoint._index];
                    const value = this.myChart.data.datasets[firstPoint._datasetIndex].data[firstPoint._index];
                    // alert(label + ": " + value);
                    // 
                    this.updateSelectPackagePieChart(label, value);
                };
            }

            updateSelectPackagePieChart(label, value) {
                const ctx = document.getElementById('package-pie-chart').getContext('2d');

                if(this.pieChart) {
                    this.pieChart.destroy();
                }
                this.pieChart = new Chart(ctx, this.chartService.returnChartObject(packagesListName, packagesListSize, 'pie', bgColor));

            }
    }]
};

