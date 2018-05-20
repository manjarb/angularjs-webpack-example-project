export default class ChartService {
    constructor() {
    }

    returnChartObject(labels, data, type = 'bar', bgColor = 'rgb(255, 99, 132)', options = {}) {
        const chartObject = {
            // The type of chart we want to create
            type: type,

            // The data for our dataset
            data: {
                labels,
                datasets: [{
                    label: "Usage",
                    backgroundColor: bgColor,
                    borderColor: '#fff',
                    data,
                }]
            },

            // Configuration options go here
            options
        };

        return chartObject;
    }


}
