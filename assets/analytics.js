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


/* **************************** pageVisits.js ******************************* */

$(document).ready(function () {
    $('#analytics-pageVisits').find('input[name="interval"]').on('change', function () {
        $(this).closest('form').submit();
    });
});


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


