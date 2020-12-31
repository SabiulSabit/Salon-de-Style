$(function () {
    $('#date-picker').daterangepicker({
        "opens": "left",
        singleDatePicker: true,

        // Disabling Date Ranges
        isInvalidDate: function (date) {
            // Disabling Date Range
            var disabled_start = moment('09/02/2018', 'MM/DD/YYYY');
            var disabled_end = moment('09/06/2018', 'MM/DD/YYYY');
            return date.isAfter(disabled_start) && date.isBefore(disabled_end);
        }
    });
});

// Calendar animation
$('#date-picker').on('showCalendar.daterangepicker', function (ev, picker) {
    $('.daterangepicker').addClass('calendar-animated');
});
$('#date-picker').on('show.daterangepicker', function (ev, picker) {
    $('.daterangepicker').addClass('calendar-visible');
    $('.daterangepicker').removeClass('calendar-hidden');
});
$('#date-picker').on('hide.daterangepicker', function (ev, picker) {
    $('.daterangepicker').removeClass('calendar-visible');
    $('.daterangepicker').addClass('calendar-hidden');
});

$(".time-slot").each(function () {
    var timeSlot = $(this);
    $(this).find('input').on('change', function () {
        var timeSlotVal = timeSlot.find('strong').text();

        $('.panel-dropdown.time-slots-dropdown a').html(timeSlotVal);
        $('.panel-dropdown').removeClass('active');
    });
});

function dateInfo() {
    //console.log("ajksdf");
    let temp = '<%- JSON.stringify(time) %>';
    let time = JSON.parse(temp);
    //console.log(time);

    let selectedDate = document.getElementById('date-picker').value;
    let dayName = getDayName(selectedDate, "en-US")
    dayName = dayName.toLowerCase().slice(0, 3);
    let slot = 0

    for (i = 0; i < time.length; i++) {
        if (time[i].dayName == dayName) {
            slot = parseInt(time[i].close) - parseInt(time[i].open)

            let a = makeTimeIntervals(time[i].open, time[i].close, 30);

            document.getElementById('showSlot').innerHTML = "";
            document.getElementById('slot').innerHTML = "Select Time";
            document.getElementById('showSlotDropDown').style.display = "block";
            for (let j = 0; j < a.length; j++) {
                document.getElementById('showSlot').innerHTML += `<div class="time-slot">
                                                                <input type="radio"   name="timeSlot" value="${a[j]}" id="time-slot-${j}">
                                                                <label onclick="boxOff('time-slot-${j}')" for="time-slot-${j}">
                                                                <strong>${a[j]}</strong>
                                                                </label>
                                                            </div>`;
            }
            //console.log(a);
        }
    }

    if (slot == 0) {
        document.getElementById('slot').innerHTML = "";
        document.getElementById('slot').innerHTML = "Closed";
        document.getElementById('showSlotDropDown').style.display = "none";

        return;
    }

}

function getDayName(dateStr, locale) {
    var date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: 'long' });
}

var makeTimeIntervals = function (startTime, endTime, increment) {
    startTime = startTime.toString().split(':');
    endTime = endTime.toString().split(':');
    increment = parseInt(increment, 10);

    var pad = function (n) { return (n < 10) ? '0' + n.toString() : n; },
        startHr = parseInt(startTime[0], 10),
        startMin = parseInt(startTime[1], 10),
        endHr = parseInt(endTime[0], 10),
        endMin = parseInt(endTime[1], 10),
        currentHr = startHr,
        currentMin = startMin,
        previous = currentHr + ':' + pad(currentMin),
        current = '',
        r = [];

    do {
        currentMin += increment;
        if ((currentMin % 60) === 0 || currentMin > 60) {
            currentMin = (currentMin === 60) ? 0 : currentMin - 60;
            currentHr += 1;
        }
        current = currentHr + ':' + pad(currentMin);
        r.push(previous + ' - ' + current);
        previous = current;
    } while (currentHr !== endHr);

    return r;
};

function boxOff(id) {
    var xyz = document.getElementById("showSlotDropDown");
    let a = document.getElementById(id).value;
    //console.log(a);
    document.getElementById('slot').innerHTML = a;

    if (xyz.style.display === "none") {
        xyz.style.display = "block";
    } else {
        xyz.style.display = "none";
    }
}


function submitForm(){
      
    let date = document.getElementById("date-picker").value; 
    let slot = document.getElementById("showSlot");
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
 
    
   // console.log(slot)
    let err =0;
    if(!date){
       
       alert("Please Fill The Date")
       err=1;
    }
    // if(!slot){
    //    alert("Please Fill The Slot")
    //    err=1;
    // }
    if(!name){
        alert("Please Fill The Name")
        err=1;
    }
    if(!email){
        alert("Please Fill The Email")
        err=1;
    }
    if(!phone){
       alert("Please Fill The Phone")
       err=1;
    }
    if(!address){
        alert("Please Fill The Address")
        err=1;
    }
    if(err == 1){
        location.reload();
    }
    else{
        document.getElementById('mainForm').submit();
    }
    
}
