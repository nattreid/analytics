/* ******************************* clicks.js ******************************** */
function ClickTracking() {
}

ClickTracking.init = function () {
    var canvas = $('#analytics-clickCharts').find('#clicks');
    if (canvas.length > 0) {
        new Chart(canvas, {
            type: 'line',
            data: {
                datasets: [{
                    label: canvas.data('clicks-title'),
                    data: canvas.data('clicks'),
                    lineTension: 0.1,
                    fill: false,
                    backgroundColor: '#4BC0C0',
                    borderColor: '#4BC0C0'
                },
                    {
                        label: canvas.data('sum-title'),
                        data: canvas.data('sum'),
                        lineTension: 0.1,
                        fill: false,
                        backgroundColor: '#FF3300',
                        borderColor: '#FF3300'
                    },
                    {
                        label: canvas.data('avg-title'),
                        data: canvas.data('avg'),
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
                            round: canvas.data('clicks').length <= 1 ? '' : 'day'
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
};

$(document).ready(function () {
    ClickTracking.init();

    $('#analytics-clickCharts input[name="interval"], #analytics-clickCharts select').on('change', function () {
        $(this).closest('form').submit();
    });
});

