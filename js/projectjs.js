var geoJson = [];
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
    L.circle([y, x], 100).addTo(map);
    URLFilter(x, y, map);
  };

  function URLFilter(x, y, map)
  {
    var url = QueryString;

    if(url["type"])
    {
      if(url["type"] === "toilets")
      {
        console.log("Showing toilets");
        getPlaces(x, y, "pois", function(results){
          geoJson = results;
          var myLayer = L.mapbox.featureLayer(results)
          .addTo(map).setFilter(filterCondition1("category", "sub", "toilets"));
          myLayer.on('click', function(e){
            resetColors(myLayer);
            e.layer.feature.properties['old-color'] = e.layer.feature.properties['marker-color'];
            e.layer.feature.properties['marker-color'] = '#ff8888';
            myLayer.setGeoJSON(geoJson);

            var start = {lat: y, lng: x};
            var finish = e.layer.feature.geometry.coordinates;

            setupDirection(map, start, finish);
          });
          myLayer.on('mouseover', function(e){
            e.layer.openPopup();
          });
          myLayer.on('mouseout', function(e) {
            e.layer.closePopup();
          });
        });
      }
    }
    else
    {
      someData(x, y, map);
    }

    console.log(url);
  }

// Funkar inte att cleara (vet ej vad layer är för instans av)
function clearDirection(map)
{
  map.eachLayer(function(layer){
    if (layer instanceof L.Marker){
      map.removeLayer(layer);
    }
  });
}

function setupDirection(map, start, finish)
{
  clearDirection(map);
  var directions = L.mapbox.directions({
      profile: 'mapbox.walking'
  });

  var directionsInputControl = L.mapbox.directions.inputControl('inputs', directions)
    .addTo(map);

  var directionsLayer = L.mapbox.directions.layer(directions)
    .addTo(map);

  var directionsErrorsControl = L.mapbox.directions.errorsControl('errors', directions)
      .addTo(map);

  var directionsRoutesControl = L.mapbox.directions.routesControl('routes', directions)
      .addTo(map);

  var directionsInstructionsControl = L.mapbox.directions.instructionsControl('instructions', directions)
      .addTo(map);

  directions.setOrigin(L.latLng(start.lat, start.lng)).setDestination(L.latLng(finish[1], finish[0])).query();
}

  function resetColors(myLayer) {
    for (var i = 0; i < geoJson.length; i++) {
      geoJson[i].properties['marker-color'] = geoJson[i].properties['old-color'] ||
      geoJson[i].properties['marker-color'];
    }
    myLayer.setGeoJSON(geoJson);
  }

  function someData(x, y, map)
  {
    getPlaces(x, y, "places", function(results){
      var myLayer = L.mapbox.featureLayer(results)
      .addTo(map).setFilter(filterCondition2("id", "016135"));
      myLayer.on('mouseover', function(e){
        e.layer.openPopup();
      });
      myLayer.on('mouseout', function(e) {
        e.layer.closePopup();
      });
    });

    getPlaces(x, y, "pois", function(results){
      var myLayer = L.mapbox.featureLayer(results)
      .addTo(map).setFilter(filterCondition1("category", "sub", "toilets"));
      myLayer.on('mouseover', function(e){
        e.layer.openPopup();
      });
      myLayer.on('mouseout', function(e) {
        e.layer.closePopup();
      });
    });

    getPlaces(x, y, "paths", function(results){
      var myLayer = L.mapbox.featureLayer(results)
      .addTo(map).setFilter(filterCondition2("id", "00d50"));
      myLayer.on('mouseover', function(e){
        e.layer.openPopup();
      });
      myLayer.on('mouseout', function(e) {
        e.layer.closePopup();
      });
    });
  }

  function filterCondition1(type, key, value) {
    return function(feature) {
      return (feature!=undefined && feature[type][key]!=undefined) ? feature[type][key]===value : false;
    };
  }

  function filterCondition2(key, value) {
    return function(feature) {
      return (feature!=undefined && feature[key]!=undefined) ? feature[key]===value : false;
    };
  }

  function getPlaces(x, y, contentType, whenDone){
    $.ajax({
      type: "GET",
      url: "http://build.dia.mah.se/" + contentType + "?latitude="+ y +"&longitude=" + x + "&within=5000"
    })
    .done(function(jsonResult) {
      console.log(jsonResult);
      var geos = jsonResult.results;
      for (let geo of geos){
        geo.properties = {
          title: geo.name + " "+ geo.category.sub,
          'marker-color': '#bbb'
        }
      }
      whenDone(geos);
    });
  }
