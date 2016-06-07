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
    <script src='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js'></script>
    <link href='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.css' rel='stylesheet' />

    <!-- Vår css dokument -->
    <link href="css/diacss.css" rel="stylesheet">
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
              <a class="navbar-brand" href="">Visit Malmö</a>
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
        <div class="col-md-9">
          <div id="mapid"></div>
        </div>
        <div class="col-md-3">
          <div class="panel panel-default">
            <div class="panel-heading">Skånetrafiken</div>
            <div class="panel-body">
              <p>test</p>
            </div>
          </div>
          <iframe src="https://www.skanetrafiken.se/sok-resa/" width="100%" height="625px">

          </iframe>
        </div>
      </div>

    </div>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/projectjs.js"></script>
  </body>
</html>
