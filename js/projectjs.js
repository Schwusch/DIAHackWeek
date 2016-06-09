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
      .addTo(map).setFilter(filterCondition1("category", null, "accomodations"));
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
  };

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
          title: geo.name

        }
        console.log(geo);

      }
      whenDone(geos);
    });
  }
