$(window).load(function(){
  navigator.geolocation.getCurrentPosition(showPosition,
    errorCallback,
    {
      maximumAge: Infinity,
      timeout:10000
    });
  });

  function errorCallback(error) {
    if (error.code == error.PERMISSION_DENIED) {
      createMap(12.99, 55.61);
    }
  };

  function showPosition(position) {
    createMap(position.coords.longitude, position.coords.latitude);
  };

  function createMap(x, y)
  {
    var token = 'pk.eyJ1Ijoic2Nod3VzY2giLCJhIjoiY2lwNWY5MnR2MDAxZncwbTI1NXI3aDY1cyJ9.X3yn1wtjHQ3Q5uDN_WVFKg'
    L.mapbox.accessToken = token;
    var map = L.mapbox.map('mapid', 'mapbox.streets')
    .setView([y, x], 14);
    map.featureLayer

    getPlaces(x, y, "places", function(results){
      L.mapbox.featureLayer(results)
      .addTo(map);
    });

    getPlaces(x, y, "pois", function(results){
      L.mapbox.featureLayer(results)
      .addTo(map).setFilter(filterCondition("main", "facilities"));
    });

    getPlaces(x, y, "paths", function(results){
      L.mapbox.featureLayer(results)
      .addTo(map);
    });

    function filterCondition(key, value) {
      return function(feature) {
        return (feature.category[key] === value);
      };
    }


  };

  function getPlaces(x, y, contentType, whenDone){
    $.ajax({
      type: "GET",
      url: "http://build.dia.mah.se/" + contentType + "?latitude="+ y +"&longitude=" + x + "&within=2000"
    })
    .done(function(jsonResult) {
      console.log(jsonResult);
      whenDone(jsonResult.results);
    });
  }
