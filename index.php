<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Malmö Turist</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Mapbox -->
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v0.19.1/mapbox-gl.js'></script>
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v0.19.1/mapbox-gl.css' rel='stylesheet' />

    <!-- Vår css dokument -->
    <link href="diacss.css" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <!-- Navbar -->
      <div class="row">
        <nav class="navbar navbar-default">
          <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <a class="navbar-brand" href="">Brand</a>
            </div>

          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Hem</a></li>
              <li><a href="#">Sevärdigheter</a></li>
              <li><a href="#">Resturang</a></li>
            </ul>
          </div>
          </div>
        </nav>
      </div>

      <div class="row">
        <h1 id="minidtagg">My Container</h1>
        <div id="mapid"></div>
        <script>
          mapboxgl.accessToken = 'pk.eyJ1Ijoic2Nod3VzY2giLCJhIjoiY2lwNWY5MnR2MDAxZncwbTI1NXI3aDY1cyJ9.X3yn1wtjHQ3Q5uDN_WVFKg';
          var map = new mapboxgl.Map({
              container: 'mapid', // container id
              style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location
              center: [-74.50, 40], // starting position
              zoom: 9 // starting zoom
          });

        </script>
      </div>

    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>


  </body>
</html>
