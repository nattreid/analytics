/* ******************************* visits.js ******************************** */
function VisitsCharts() {
}

VisitsCharts.init = function () {
    var visitsCharts = $('#analytics-visitsCharts');

    var visitsByDay = visitsCharts.find('#visitsByDay');
    if (visitsByDay.length > 0) {
        new Chart(visitsByDay, {
            type: 'line',
            data: {
                datasets: [{
                    label: visitsByDay.data('title'),
                    data: visitsByDay.data('data'),
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBackgroundColor: 'rgba(255,255,255,1)',
                    pointHoverBorderColor: 'rgba(75,192,192,1)',
                    pointHoverBorderWidth: 1,
                    pointRadius: 4
                }]
            },
            options: {
                legend: {
                    position: 'bottom'
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day',
                            tooltipFormat: 'D. MMMM YYYY',
                            round: visitsByDay.data('data').length <= 1 ? '' : 'day'
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

    var visitsByHour = visitsCharts.find('#visitsByHour');
    if (visitsByHour.length > 0) {
        var labels = [];
        for (var i = 0; i < 24; i++) {
            labels.push(i);
        }

        new Chart(visitsByHour, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: visitsByHour.data('title'),
                    data: visitsByHour.data('data'),
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBackgroundColor: 'rgba(255,255,255,1)'
                }]
            },
            options: {
                legend: {
                    position: 'bottom'
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
    VisitsCharts.init();

    $('#analytics-visitsCharts').find('input[name="interval"]').on('change', function () {
        $(this).closest('form').submit();
    });
});


