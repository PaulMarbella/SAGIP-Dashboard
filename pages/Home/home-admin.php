<?php include("../../config/db.php"); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sagip | Dashboard</title>

  <!-- Bootstrap CSS (CDN version) -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

  <!-- Custom CSS -->
  <link rel="stylesheet" href="../../css/styles.css" />
</head>
<body>


  <div class="container-fluid px-0" id="app">
    <!-- Top bar for mobile -->
    <div class="d-md-none mobile-sidebar py-2 px-3 shadow-sm d-flex justify-content-between align-items-center">
      <button class="btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileSidebar">
        <i class="bi bi-list fs-3"></i>
      </button>
      <a class="nav-link p-0" href="/pages/Home/home.html">
        <img src="../../assets/images/Logo.png" alt="SagipResearch Logo" style="max-height: 50px;" />
      </a>
    </div>

    <!-- Mobile Offcanvas Sidebar -->
    <div class="offcanvas mobile-sidebar offcanvas-start d-md-none" id="mobileSidebar">
      <div class="offcanvas-header">
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body d-flex flex-column justify-content-between min-vh-100 px-3 pt-2 pb-4">
        <nav>
          <ul class="nav gap-4">
            <li><a class="nav-page d-flex align-items-center gap-2 text-decoration-none " href="../../pages/Home/home-admin.php"><i class="bi bi-thermometer-half"></i> Basic Tracking</a></li>
            <li><a class="nav-page d-flex align-items-center gap-2 text-decoration-none close-on-click " onclick="loadPage('adminMsg')"><i class="bi bi-display"></i> Command Center</a></li>
            <li><a class="nav-page d-flex align-items-center gap-2 text-decoration-none close-on-click " onclick="loadPage('analyticalMapping')"><i class="bi bi-clipboard2-data"></i> Analytical Mapping</a></li>
            <li><a class="nav-page d-flex align-items-center gap-2 text-decoration-none close-on-click" onclick="loadPage('arcGIS')"><i class="bi bi-map"></i>ArcGIS preview</a></li>
            <li><a class="nav-page d-flex align-items-center gap-2 text-decoration-none close-on-click" onclick="loadPage('deviceManager')"><i class="bi bi-globe-central-south-asia"></i> Device Manager</a></li>
          </ul>

        </nav>
        <div class="text-center mt-5 mb-5 border-top pt-3">
          <div class="time d-flex justify-content-center align-items-center gap-3">
            <div id="userGreeting1">
              <h4 class="text-dark">
                Hi there, <span id="displayName2" class="fw-bold text-danger-emphasis">Admin</span>!
              </h4>
            </div>              
            <a class="btn btn-danger" id="logoutBtn" href="../../index.php">Log out<i class="bi bi-box-arrow-in-right"></i></a>
          </div>
        </div>
      </div>
    </div>

    
      <!-- Desktop Sidebar -->
      <div class="d-none col d-md-flex flex-column">
      <aside class=" sidebar shadow justify-content-between align-items-center">
          <a href="../../pages/Home/home-admin.php">
            <img src="../../assets/images/Logo.png" class="logo-img"  />
          </a>
        <div class="time d-flex justify-content-center align-items-center gap-3">
          <div id="userGreeting2">
            <h4 class="text-dark">
              Hi there, <span id="displayName1" class="fw-bold text-danger-emphasis">Admin</span>!
            </h4>
          </div>    
          <div class="vr"></div>              
          <a class="btn btn-danger d-flex gap-2 justify-content-center align-items-center" id="logoutBtn" href="../../index.php">Log out<i class="bi bi-box-arrow-right"></i></a>
        </div>
      </aside>

      <!-- Navigation Bar -->
    <nav class="nav-bar">
      <ul class="nav gap-4">
        <li><a class="nav-page d-flex align-items-center gap-2 text-decoration-none " href="../../pages/Home/home-admin.php"><i class="bi bi-thermometer-half"></i> Basic Tracking</a></li>
        <li><a class="nav-page d-flex align-items-center gap-2 text-decoration-none " onclick="loadPage('adminMsg')"><i class="bi bi-display"></i> Command Center</a></li>
        <li><a class="nav-page d-flex align-items-center gap-2 text-decoration-none " onclick="loadPage('analyticalMapping')"><i class="bi bi-clipboard2-data"></i> Analytical Mapping</a></li>
        <li><a class="nav-page d-flex align-items-center gap-2 text-decoration-none " onclick="loadPage('arcGIS')"><i class="bi bi-map"></i>ArcGIS preview</a></li>
        <li><a class="nav-page d-flex align-items-center gap-2 text-decoration-none " onclick="loadPage('deviceManager')"><i class="bi bi-globe-central-south-asia"></i> Device Manager</a></li>
      </ul>
    </nav>

  </div>
      <!-- Main Content -->
      <main class="col p-4 main-content" id="main-content">

        <!-- Main Page/ Home Page content  -->
        <div class="py-3">
    <h2 class="text-center text-dark">SAGIP DASHBOARD</h2>


    <div class="row g-4 mb-5">
            <div class="col-lg-4 col-md-6">
                <div class="card h-100 shadow-sm border-secondary rounded-3 animated-card">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title text-success fw-normal mb-3 d-flex align-items-center">
                            <i class="fas fa-water me-2 fa-lg"></i> Humidity
                        </h5>
                        <div class="text-center">
                            <h1 id="humidityDisplay" class="display-3 fw-bold text-dark">
                            --%
                            </h1>
                            <p id="humUpdatedAt" class="card-text text-muted small">
                            Last updated: --
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-6">
                <div class="card h-100 shadow-sm border-secondary rounded-3 animated-card">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title text-primary fw-normal mb-3 d-flex align-items-center">
                            <i class="fas fa-faucet-drip me-2 fa-lg"></i> Water Level
                        </h5>
                        <div class="text-center">
                            <h1 id="waterDisplay" class="display-3 fw-bold text-dark">
                            --m<span id="waterAlertLevel" class ="text-success h1"></span>
                            </h1>
                            <p id="waterUpdatedAt" class="card-text text-muted small">
                            Last updated: --
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-12">
                <div class="card h-100 shadow-sm border-secondary rounded-3 animated-card">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title text-danger fw-normal mb-3 d-flex align-items-center">
                            <i class="bi bi-temperature-full me-2 fa-lg"></i> Heat Index Temperature
                        </h5>
                        <div class="text-center d-flex flex-column justify-content-center align-items-center">
                            <h1 id="heatDisplay" class="display-3 fw-bold text-dark">
                            --°C
                            </h1>
                            <p id="heatUpdatedAt" class="card-text text-muted small">
                            Last updated: --
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-12">
                <div class="card h-100 shadow-sm border-secondary rounded-3 animated-card">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title text-warning fw-normal mb-3 d-flex align-items-center">
                            <i class="bi bi-temperature-full me-2 fa-lg"></i> Temperature
                        </h5>
                        <div class="text-center d-flex flex-column justify-content-center align-items-center">
                            <h1 id="temperatureDisplay" class="display-3 fw-bold text-dark">
                            --°C
                            </h1>
                            <p id="tempUpdatedAt" class="card-text text-muted small">
                            Last updated: --
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-12">
                <div class="card h-100 shadow-sm border-secondary rounded-3 animated-card">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title text-info fw-normal mb-3 d-flex align-items-center">
                            <i class="bi bi-temperature-full me-2 fa-lg"></i> Pressure
                        </h5>
                        <div class="text-center d-flex flex-column justify-content-center align-items-center">
                            <h1 id="pressureDisplay" class="display-3 fw-bold text-dark">
                            --mb
                            </h1>
                            <p id="pressureUpdatedAt" class="card-text text-muted small">
                            Last updated: --
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-lg-4 col-md-12">
                <div class="card h-100 shadow-sm border-secondary rounded-3 animated-card">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title text-dark fw-normal mb-3 d-flex align-items-center">
                            <i class="bi bi-temperature-full me-2 fa-lg"></i> Altitude
                        </h5>
                        <div class="text-center d-flex flex-column justify-content-center align-items-center">
                            <h1 id="altitudeDisplay" class="display-3 fw-bold text-dark">
                            --°m
                            </h1>
                            <p id="altitudeUpdatedAt" class="card-text text-muted small">
                            Last updated: --
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

  
<div class="weather-widget-container">
    <div id="weatherapi-weather-widget-3">
  </div>
  <script type='text/javascript' src='https://www.weatherapi.com/weather/widget.ashx?loc=1857963&wid=3&tu=2&div=weatherapi-weather-widget-3' async>
  </script>
  <noscript>
      <a href="https://www.weatherapi.com/weather/q/paranaque-1857963" alt="Hour by hour Paranaque weather">10 day hour by hour Paranaque weather</a>
  </noscript>
</div>

      </main>

  </div>
  
  <footer class="footer py-5 bg-light">
  <div class="container">
    <div class="row gy-4 justify-content-between align-items-start">
      <!-- Logo and Description -->
      <div class="col-lg-5 col-md-6">
        <div class="d-flex flex-column flex-sm-row align-items-start align-items-sm-center gap-3">
          <img src="../../assets/images/Logo.png" alt="Company Logo" class="logo-img" style="max-width: 70px;" />
          <div>
            <h5 class="text-secondary fw-bold mb-1">Self-sustained Automated Gateway and Information Platform</h5>
            <p class="text-muted small mb-0">
              Your Emergency Partner<br>
              Col. E.L. De Leon, Parañaque, Kalakhang Maynila
            </p>
          </div>
        </div>
      </div>

      <!-- Links Section -->
      <div class="col-lg-6 col-md-6">
        <div class="row">
          <div class="col-sm-6 mb-3">
            <h6 class="text-dark fw-bold mb-3">Links</h6>
            <ul class="list-unstyled">
              <li class="mb-2"><a class="text-decoration-none text-dark" href="/pages/Home/home.html">Home</a></li>
              <li class="mb-2"><a class="text-decoration-none text-dark" onclick="loadPage('aboutUs')" href="#main-content">About Us</a></li>
              <li class="mb-2"><a class="text-decoration-none text-dark" onclick="loadPage('contactUs')" href="#main-content">Contact Us</a></li>
            </ul>
          </div>
          <div class="col-sm-6">
            <h6 class="text-dark fw-bold mb-3">Legal</h6>
            <ul class="list-unstyled">
              <li class="mb-2"><a class="text-decoration-none text-dark" onclick="loadPage('privacyPolicy')" href="#main-content">Privacy Policy</a></li>
              <li class="mb-2"><a class="text-decoration-none text-dark" onclick="loadPage('termsOfUse')" href="#main-content">Terms of Use</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <hr class="my-4 border-secondary opacity-25">
    <div class="text-center text-muted small">
      © 2025 SAGIP. All rights reserved.
    </div>
  </div>
</footer>

  <!-- Scripts -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
  <script src="/SAGIP-Dashboard/js/script.js"></script>
</body>
</html>
