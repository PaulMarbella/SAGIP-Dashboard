  <?php include("../../config/historical_db.php"); ?>

  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Analytical-Mapping</title>
      <link rel="stylesheet" href="/SAGIP-Dashboard/css/weathercard.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

  </head>
  <body>


    <div id="weatherapi-weather-widget-3"></div>
    <script type='text/javascript' src='https://www.weatherapi.com/weather/widget.ashx?loc=1857963&wid=3&tu=2&div=weatherapi-weather-widget-3' async></script>
    <noscript>
      <a href="https://www.weatherapi.com/weather/q/paranaque-1857963">10 day hour by hour Paranaque weather</a>
    </noscript>

    <div class="container mt-5">
    <div class="row g-4">
      <!-- Sidebar -->
      <div class="col-lg-3 col-md-4">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Tools</h5>
          </div>
          <div class="card-body">
            <button class="btn btn-secondary d-flex gap-1 mb-3 w-100" id="refresh"><i class="bi bi-arrow-clockwise"></i>Refresh Data</button>
            <button class="btn btn-success d-flex gap-1 mb-3 w-100" id="download-csv"><i class="bi bi-download"></i>Download CSV</button>
            <button class="btn btn-danger d-flex gap-1 w-100" data-bs-toggle="modal" data-bs-target="#graphModal" onclick="generateChart()"><i class="bi bi-search"></i>Prediction Analysis</button>
          </div>
        </div>
      </div>

      <!-- Table Section -->
        <div class="col-lg-9 col-md-8">
          <div class="row mb-3 bg-light ">
          <label class="fw-bold h2">Filter Date</label>
            <div class="col-md-4">
              <label class="fw-bold">From</label>
              <input type="date" id="filter-from" class="form-control border border-success">
            </div>
            <div class="col-md-4">
              <label class="fw-bold">To</label>
              <input type="date" id="filter-to" class="form-control border border-success">
            </div>
            <div class="col-md-4">
              <label class="fw-bold">Search</label>
              <input type="text" id="search-table" class="form-control border border-primary" placeholder="Search table...">
            </div>
          </div>

          <div class="table-responsive">
            <table class="table table-hover align-middle" id="data-table">
              <thead class="table-primary">
                <tr>
                <th>Date</th>
                <th>Temperature (°C)</th>
                <th>Humidity (%)</th>
                <th>Pressure (hPa)</th>
                <th>Altitude (m)</th>
                <th>Heat Index (°C)</th>
                <th>Condition</th> 
                </tr>
              </thead>
              <tbody class="text-center">
              <?php
            $result = $conn->query("SELECT * FROM historical_data ORDER BY timestamp ASC");
            if ($result->num_rows > 0) {
              while($row = $result->fetch_assoc()) {
                echo "<tr>
                        <td>{$row['timestamp']}</td>
                        <td >{$row['temp']}</td>
                        <td>{$row['hum']}</td>
                        <td>{$row['pres']}</td>
                        <td>{$row['alt']}</td>
                        <td>{$row['hi']}</td>
                        <td class='condition'></td>
                      </tr>";
              }
            } else {
              echo "<tr><td colspan='7' class='text-center'>No data available</td></tr>";
            }
          ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  <div class="modal fade" id="graphModal" tabindex="-1" aria-labelledby="graphModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Annual Environmental Trend (2024 & 2025)</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-6 mb-3">
            <h6 class="text-center">2024 Trend</h6>
            <canvas id="lineChart2024" height="250"></canvas>
          </div>
          <div class="col-md-6 mb-3">
            <h6 class="text-center">2025 Trend</h6>
            <canvas id="lineChart2025" height="250"></canvas>
          </div>
        </div>
      </div>
      <div class="modal-footer">
      <button id="downloadChartBtn" class="btn btn-success">
        <i class="bi bi-download"></i> Download PDF Report
      </button>
      </div>
    </div>
  </div>
</div>



    </div>


  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <script type="module" src="/SAGIP-Dashboard/js/weather.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  </body>
  </html>