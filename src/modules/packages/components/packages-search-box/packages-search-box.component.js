import angular from 'angular';
import Chart from 'chart.js';

export const PackagesSearchBoxComponent = {
    scope: {},
    bindings: {
        pagesData: '<'
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
                this.scope.isChartTrigger = false;
                this.scope.renderPieChart = this.renderPieChart.bind(this);
            }
            $onInit() {
                /// console.log(this.$ctrl, '$ctrl');
                // console.log(this.$ctrl['pagesData'], 'pagesData');
            }
            renderPieChart(pack) {
                this.scope.package.packageName = pack.packageName;
                this.scope.isChartTrigger = true;

                const ctx = document.getElementById('package-pie-chart').getContext('2d');
                const packagesListName = [
                    `${this.$ctrl.pagesData.length} Pages`,
                    `${pack.packageName} used ${pack.count} times`
                ];
                const packagesListSize = [
                    this.$ctrl.pagesData.length,
                    pack.count
                ];
                const bgColor = [
                    "#3e95cd",
                    "#c45850"
                ];
                let myChart = new Chart(ctx, this.chartService.returnChartObject(packagesListName, packagesListSize, 'pie', bgColor));
                this.scope.$apply();
            }
    }]
};

export default angular.module('packagesSearchBox', [])
    .component('packagesSearchBox', PackagesSearchBoxComponent);