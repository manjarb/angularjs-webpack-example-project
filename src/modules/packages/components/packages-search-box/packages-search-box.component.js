import angular from 'angular';
import Chart from 'chart.js';
import './packages-search-box.component.scss';

export const PackagesSearchBoxComponent = {
    scope: {},
    bindings: {
        pagesData: '<',
        packagesData: '<'
    },
    template: require('./packages-search-box.component.html'),
    controller: [
        'ChartService',
        '$scope',
        class PackagesSearchBoxController {
            constructor(ChartService, $scope) {
                this.scope = $scope;
                this.$ctrl = $scope.$ctrl;
                this.chartService = ChartService;
                this.$ctrl.selectedPackageName = '';
                this.scope.renderPieChart = this.renderPieChart.bind(this);
            }
            
            $onInit() {
            }

            renderPieChart(pack) {
                this.scope.package.packageName = '';
                this.$ctrl.selectedPackageName = pack.packageName;
                const ctx = document.getElementById('package-pie-chart').getContext('2d');
                const packagesListName = [
                    `${this.$ctrl.pagesData.length} Pages`,
                    `${pack.packageName} used ${pack.count} times`
                ];
                const packagePercentageUse = this.chartService.calculatePercentage(this.$ctrl.pagesData.length, pack.count);
                const packagesListSize = [
                    100 - packagePercentageUse,
                    packagePercentageUse
                ];
                const bgColor = [
                    "#3e95cd",
                    "#c45850"
                ];
                let myChart = new Chart(ctx, this.chartService.returnChartObject(packagesListName, packagesListSize, 'pie', bgColor));
            }
    }]
};

export default angular.module('packagesSearchBox', [])
    .component('packagesSearchBox', PackagesSearchBoxComponent);