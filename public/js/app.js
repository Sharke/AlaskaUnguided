

    $(document).foundation();

    $('#dr1').fdatepicker({
        format: 'M d yyyy',
        leftArrow: '<',
        rightArrow: '>'
    });
    $('#dr2').fdatepicker({
        format: 'M d yyyy',
        leftArrow: '<',
        rightArrow: '>'

    });
    // implementation of disabled form fields
var nowTemp = new Date();
var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
var checkin = $('#dr1').fdatepicker({
    onRender: function (date) {
        return date.valueOf() < now.valueOf() ? 'disabled' : '';
    }
}).on('changeDate', function (ev) {
    if (ev.date.valueOf() > checkout.date.valueOf()) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate() + 1);
        checkout.update(newDate);
    }

    checkin.hide();
    $('#dr2')[0].focus();
}).data('datepicker');
var checkout = $('#dr2').fdatepicker({
    onRender: function (date) {
        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
    }
}).on('changeDate', function (ev) {

    checkout.hide();
}).data('datepicker');



