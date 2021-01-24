
    let lat, lon;
    function setMap() {

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
        enableAutocomplete: true,
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