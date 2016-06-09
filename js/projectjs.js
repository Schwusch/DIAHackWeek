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

  URLFilter(x, y, map);
};

function URLFilter(x, y, map)
{
  var url = QueryString;

  if(url["to"])
  {
    console.log("To");

  }
  else if(url["type"])
  {
    console.log("Type");

  }
  else
  {
    someData(x, y, map);
  }

  console.log(url);
}

function isEmpty(obj)
{
  for(var prop in obj)
  {
    if(obj.hasOwnProperty(prop))
      return false;
  }

  return false;
}

function someData(x, y, map)
{
  getPlaces(x, y, "places", function(results){
    L.mapbox.featureLayer(results)
    .addTo(map).setFilter(filterCondition2("id", "016135"));
  });

  getPlaces(x, y, "pois", function(results){
    L.mapbox.featureLayer(results)
    .addTo(map).setFilter(filterCondition1("category", null, "accomodations"));
  });

  getPlaces(x, y, "paths", function(results){
    L.mapbox.featureLayer(results)
    .addTo(map).setFilter(filterCondition2("id", "00d50"));
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
    whenDone(jsonResult.results);
  });
}
