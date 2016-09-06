/* **************************** pageVisits.js ******************************* */

$(document).ready(function () {
    $('#analytics-pageVisits').find('input[name="interval"]').on('change', function () {
        $(this).closest('form').submit();
    });
});

