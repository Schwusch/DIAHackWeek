$(document).ready(function(){
    navigator.geolocation.getCurrentPosition(showPosition,
      errorCallback,
    {
        maximumAge: Infinity,
        timeout:0
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
  mapboxgl.accessToken = token;
  var map = new mapboxgl.Map({
      container: 'mapid', // container id
      style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
      //center: [12.99, 55.61], // starting position
      center: [x, y], // starting position
      zoom: 13.5 // starting zoom
  });
  getPlaces(function(results){
    L.mapbox.accessToken = token;
    L.mapbox.map('mapid', 'mapbox.streets')
    .featureLayer.setGeoJSON(results);
  });
};

function getPlaces(done){
  $.ajax({
          type: "GET",
          url: "http://build.dia.mah.se/pois?latitude=12.99&longitude=55.61"
        })
          .done(function( jsonResult ) {
            console.log(jsonResult);
            done(jsonResult.results);
});
}
