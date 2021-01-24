jQuery(document).ready(function ($) {
    "use strict";
    $('#customers-testimonials').owlCarousel({
        loop: true,
        center: true,
        items: 3,
        margin: 30,
        autoplay: true,
        dots: true,
        autoplayTimeout: 1000,
        smartSpeed: 10,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1170: {
                items: 3
            }
        }
    });

});


$(".time-slot").each(function () {
    var timeSlot = $(this);
    $(this).find('input').on('change', function () {
        var timeSlotVal = timeSlot.find('strong').text();

        $('.panel-dropdown.time-slots-dropdown a').html(timeSlotVal);
        $('.panel-dropdown').removeClass('active');
    });
});

$(".save-health").click(function () {
    $("#healthModalLong").modal('hide');
});
$(".save-report").click(function () {
    $("#reportModalLong").modal('hide');
});


$(".orderBtn").click(function () {
    $("#exampleModal").modal('hide');
    $("#exampleModal2").modal('show');
});

$(".orderNowBtn").click(function () {
    $("#exampleModal2").modal('hide');
});


$(".lastOrder").click(function () {
    $("#exampleModal3").modal('hide');
    $("#orderModal").modal('show');
});

$(".firstBack").click(function () {
    $("#exampleModal2").modal('hide');
    $("#exampleModal").modal('show');
});
$(".backFirst").click(function () {
    $("#giftShowModal").style.display('hide');
    $("#giftModal").style.display('show');
});
function friendFunction(a) {
    var x = document.getElementById(a);
    //console.log(x)
    if (x.style.display === "block") {
        x.style.display = "none";
        console.log("asd")
    } else {
        x.style.display = "block";
    }
}


let lat, lon;
function setMap() {
    let preLoader = document.getElementById('loader');
    preLoader.style.display = 'none';

    lat = document.getElementById('lat').value;
    lon = document.getElementById('lon').value;
    let address = document.getElementById('address').value;


    //console.log(lat,lon);

    document.getElementById('us2-lat').value = lat;
    document.getElementById('us2-lon').value = lon;
    document.getElementById('us2-address').value = address;

}

$(document).ready(function () {

    // lat = document.getElementById('lat').value;
    // lon = document.getElementById('lon').value;
    $('#maparea').locationpicker({
        inputBinding: {
            latitudeInput: $('#us2-lat'),
            longitudeInput: $('#us2-lon'),
            locationNameInput: $('#us2-address')
        },
        enableAutocomplete: false,

        onchanged: function (currentLocation) {
            console.log(currentLocation)
            var placeType = ["atm", "pharmacy"];
            var sep = ',';
            var request = [], resultset,
                lat = currentLocation.latitude,
                lan = currentLocation.longitude;
            for (var i = 0; i < placeType.length; i++) {
                request = {
                    location: new google.maps.LatLng(lat, lon),
                    types: [placeType[i]],
                    rankBy: google.maps.places.RankBy.DISTANCE

                };
                var container = document.getElementById(placeType[i]);
                //console.log(container);
                var service = new google.maps.places.PlacesService(container);
                service.nearbySearch(request, callback);
                //console.log(placeType[i]);
                function callback(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var j = 0; j < 3; j++) {
                            resultset += results[j].name + sep + results[j].vicinity + '.<br>'

                        }

                    }
                }

            }
        }


    });

});

function submitForm(id) {
    document.getElementById(id).submit();
}
function giftShow(giftValue) {
    console.log('sdsd');
    let a = document.getElementById(giftValue);
    document.getElementById('giftShowModal') = "";
    document.getElementById('giftShowModal') = a;
}