/* **************************** pageVisits.js ******************************* */

$(document).ready(function () {
    $('#analytics-pageVisits input[name="interval"]').on('change', function (ev, picker) {
        $(this).closest('form').submit();
    });
});

