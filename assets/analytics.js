/* ******************************* clicks.js ******************************** */
function ClickTracking() {}

ClickTracking.init = function () {
    var canvas = $('#analytics-clickCharts #clicks');
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

    $('#analytics-clickCharts input[name="interval"], #analytics-clickCharts select').on('change', function (ev, picker) {
        $(this).closest('form').submit();
    });
});


/* **************************** pageVisits.js ******************************* */

$(document).ready(function () {
    $('#analytics-pageVisits input[name="interval"]').on('change', function (ev, picker) {
        $(this).closest('form').submit();
    });
});


/* ******************************* visits.js ******************************** */
function VisitsCharts() {}

VisitsCharts.init = function () {
    var visitsByDay = $('#analytics-visitsCharts #visitsByDay');
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

    var visitsByHour = $('#analytics-visitsCharts #visitsByHour');
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

    $('#analytics-visitsCharts input[name="interval"]').on('change', function (ev, picker) {
        $(this).closest('form').submit();
    });
});


