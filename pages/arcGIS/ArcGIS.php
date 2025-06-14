<?php include("../../config/db.php"); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>SAGIP Monitoring Map</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
  <link rel="stylesheet" href="/SAGIP-Dashboard/css/styles.css">

  <!-- ArcGIS CSS -->
  <link rel="stylesheet" href="https://js.arcgis.com/4.29/esri/themes/light/main.css" />
  <script src="https://js.arcgis.com/4.29/"></script>

</head>
<body>
    <h1 class="text-center mb-3">PUP Paranaque Campus</h1>
    <div id="container" class="container-fluid px-3 py-3">
    <div class="row g-4 align-items-start ">
        <div id="filterPanel" class="col-12 col-lg-3">
            <div class="p-3 bg-light border rounded shadow-sm h-100">
              <div class="your_location mb-3 fw-bold">
                   You're Here: <span class="dot"></span>
              </div>
                <h5 class="mb-3 fw-bold text-secondary">Map Filters</h5>

                <label for="stationFilter" class="form-label fw-bold">Filter Station:</label>
                <select id="stationFilter" class="form-select mb-4">
                    <option value="All">All Stations</option>
                    <option value="SAGIP Station">SAGIP Station</option>
                    <option value="Water Level Monitoring">Water Level Monitoring</option>
                    <option value="SAGIP Monitor">SAGIP Monitor</option>
                    <option value="Hide All">Hide All Markers</option>
                </select>

                <div class="mb-4">
                    <label class="form-label fw-bold">Heat Zone Overlays:</label>
                    <button class="btn btn-outline-danger w-100 animate-btn" id="toggleHeatZone">
                        <i class="fas fa-fire me-2"></i> Toggle Heat Zone
                    </button>
                </div>

                <div>
                    <label class="form-label fw-bold">Evacuation Zone Overlays:</label>
                    <button class="btn btn-outline-success w-100 animate-btn" id="toggleEvacuationZone">
                        <i class="fas fa-route me-2"></i> Toggle Evacuation Zone
                    </button>
                </div>
            </div>
        </div>

        <div id="viewDiv" class="col-12 col-lg-9 mt-2">
        </div>
        <div id="user-coordinates" class="text-center mt-3 text-muted small"></div>
    </div>
</div>



  <script src="/SAGIP-Dashboard/js/map.js"></script>
</body>
</html>
