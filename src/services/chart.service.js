export default class ChartService {
    constructor() {
    }

    returnBubbleChartObject(labels, data, type = 'bar') {
        const chartObject = {
            // The type of chart we want to create
            type: type,

            // The data for our dataset
            data: {
                labels,
                datasets: [{
                    label: "Usage",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    data,
                }]
            },

            // Configuration options go here
            options: {
            }
        };

        return chartObject;
    }


}
