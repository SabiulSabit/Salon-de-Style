$(document).ready(function () {
    $('#maparea').locationpicker({
        inputBinding: {
            latitudeInput: $('#us2-lat'),
            longitudeInput: $('#us2-lon'),
            locationNameInput: $('#us2-address')
        },
        enableAutocomplete: true,

        onchanged: function (currentLocation) {
            var placeType = ["atm", "pharmacy"];
            var sep = ',';
            var request = [],
                lat = currentLocation.latitude,
                lan = currentLocation.longitude;
            for (var i = 0; i < placeType.length; i++) {
                request = {
                    location: new google.maps.LatLng(lat, lan),
                    types: [placeType[i]],
                    rankBy: google.maps.places.RankBy.DISTANCE
                };
                var container = document.getElementById("'" + placeType[i] + "'");
                var service = new google.maps.places.PlacesService(container);
                service.nearbySearch(request, callback);

                function callback(results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        for (var j = 0; j < 3; j++) {
                            var input = document.getElementById("'" + placeType[i] + "'");
                            var resultset = results[j].name + sep + results[j].vicinity + '.';


                        }

                    }
                }
            }
        }

    });
});

function readFile(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var htmlPreview =
                '<img width="200" src="' + e.target.result + '" />' +
                '<p>' + input.files[0].name + '</p>';
            var wrapperZone = $(input).parent();
            var previewZone = $(input).parent().parent().find('.preview-zone');
            var boxZone = $(input).parent().parent().find('.preview-zone').find('.box').find('.box-body');

            wrapperZone.removeClass('dragover');
            previewZone.removeClass('hidden');
            boxZone.empty();
            boxZone.append(htmlPreview);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function reset(e) {
    e.wrap('<form>').closest('form').get(0).reset();
    e.unwrap();
}

$(".dropzone").change(function () {
    readFile(this);
});

$('.dropzone-wrapper').on('dragover', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass('dragover');
});

$('.dropzone-wrapper').on('dragleave', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).removeClass('dragover');
});

$('.remove-preview').on('click', function () {
    var boxZone = $(this).parents('.preview-zone').find('.box-body');
    var previewZone = $(this).parents('.preview-zone');
    var dropzone = $(this).parents('.form-group').find('.dropzone');
    boxZone.empty();
    previewZone.addClass('hidden');
    reset(dropzone);
});