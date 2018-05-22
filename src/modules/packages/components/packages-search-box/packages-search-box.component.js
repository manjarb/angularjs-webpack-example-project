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

                this.myChart = null;
            }
            
            $onInit() {
            }

            renderPieChart(pack) {
                this.scope.package.packageName = '';
                this.$ctrl.selectedPackageName = pack.packageName;

                this.chartService.clearCanvas('package-pie-chart-box');
                this.chartService.addNewCanvas('package-pie-chart-box', 'package-pie-chart');

                const ctx = document.getElementById('package-pie-chart').getContext('2d');
                const pieChartData = this.chartService.returnPieChartData(this.$ctrl.pagesData, pack);
                if(this.myChart) {
                    this.myChart.destroy();
                }
                this.myChart = new Chart(ctx, this.chartService.returnChartObject(pieChartData.packagesListName, pieChartData.packagesListSize, 'pie', pieChartData.bgColor));
            }
    }]
};

export default angular.module('packagesSearchBox', [])
    .component('packagesSearchBox', PackagesSearchBoxComponent);