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
                    label: "Packages Dataset",
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

    getRandomColor() {
        const letters = '0123456789ABCDEF'.split('');
        let color = '#';
        for (let i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    calculatePercentage(amount, value) {
        return (value * 100) / amount;
    }

    findElementPosition(obj) {
        let curtop = 0;
        if (obj && obj.offsetParent) {
            do {
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
            return curtop;
        }
    }

}
