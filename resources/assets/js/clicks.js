/* ******************************* clicks.js ******************************** */
function ClickTracking() {
}

ClickTracking.init = function () {
    var clickCharts = $('#analytics-clickCharts');

    var clicks = clickCharts.find('#clicks');
    if (clicks.length > 0) {
        new Chart(clicks, {
            type: 'line',
            data: {
                datasets: [{
                    label: clicks.data('clicks-title'),
                    data: clicks.data('clicks'),
                    lineTension: 0.1,
                    fill: false,
                    backgroundColor: '#4BC0C0',
                    borderColor: '#4BC0C0'
                },
                    {
                        label: clicks.data('sum-title'),
                        data: clicks.data('sum'),
                        lineTension: 0.1,
                        fill: false,
                        backgroundColor: '#FF3300',
                        borderColor: '#FF3300'
                    },
                    {
                        label: clicks.data('avg-title'),
                        data: clicks.data('avg'),
                        lineTension: 0.1,
                        fill: false,
                        backgroundColor: '#00CC00',
                        borderColor: '#00CC00'
                    }]
            },
            options: {
                legend: {
                    position: 'bottom',
                    display: false
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'D. MMMM YYYY',
                            round: clicks.data('clicks').length <= 1 ? '' : 'day'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    var values = clickCharts.find('#values');
    if (values.length > 0) {
        new Chart(values, {
            type: 'bar',
            data: {
                labels: values.data('labels'),
                datasets: [{
                    data: values.data('data'),
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56",
                        "#c374ff",
                        "#79ff95",
                        "#ff131f",
                        "#ffa33a",
                        "#51fff7",
                        "#01ff00",
                        "#3f1dff",
                        "#ff4ef8",
                        "#ffed16",
                        "#ffb7cc",
                    ],
                }]
            },
            options: {
                legend: {
                    position: 'bottom',
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
};

$(document).ready(function () {
    ClickTracking.init();

    $('#analytics-clickCharts input[name="interval"], #analytics-clickCharts select').on('change', function () {
        $(this).closest('form').submit();
    });
});

