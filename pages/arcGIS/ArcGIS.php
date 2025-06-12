<?php include("../../config/db.php"); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>SAGIP Monitoring Map</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
  <link rel="stylesheet" href="/css/styles.css">

  <!-- ArcGIS CSS -->
  <link rel="stylesheet" href="https://js.arcgis.com/4.29/esri/themes/light/main.css" />
  <script src="https://js.arcgis.com/4.29/"></script>

</head>
<body>
    <h1 class="text-center">PUP Paranaque Campus</h1>
  <div id="container" class="container-ArcGIS">
    <div id="filterPanel">
      <label for="stationFilter"><strong>Filter Station:</strong></label><br />
      <select id="stationFilter">
        <option value="All">All</option>
        <option value="SAGIP Station">SAGIP Station</option>
        <option value="Water Level Monitoring">Water Level Monitoring</option>
        <option value="SAGIP Monitor">SAGIP Monitor</option>
        <option value="Hide All">Hide All</option>
      </select>
      <div>
        <label class="mt-4 d-flex flex-column"><strong>Heat Zone</strong></label>
        <button class="btn btn-outline-danger" id="toggleHeatZone">Toggle Heat Zone</button>
      </div>
      <div>
        <label class="mt-4 d-flex flex-column"><strong>Evacuation Zone</strong></label>
        <button class="btn btn-outline-success" id="toggleEvacuationZone">Toggle Evacuation Zone</button>
      </div>
    </div>
    

    <div id="viewDiv"></div>
  </div>

  <script src="../../js/map.js"></script>
</body>
</html>
