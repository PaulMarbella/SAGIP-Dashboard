<?php include("../../config/db.php"); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAGIP | Camera</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
    <link rel="stylesheet" href="/SAGIP-Dashboard/css/camera.css">
</head>
<body>
<div class="container py-1">
    <h1 class="text-center mb-3 text-dark fw-bold">Live Camera Feed</h1>

    <div class="row justify-content-center g-4">
        <div class="col-lg-3 col-md-4 d-flex align-items-stretch">
            <div class="card bg-light border-0 shadow-sm rounded-3 w-100 prediction-card">
                <div class="card-body d-flex flex-column justify-content-between align-items-center p-4">
                    <h5 class="card-title text-secondary mb-4 text-center">Insightful Data</h5>
                    <p class="text-muted small text-center mb-4">Click below to view advanced prediction analysis based on camera feeds and sensor data.</p>
                    <button class="btn btn-danger btn-lg w-100 animate-btn" id="waterLevelChart" data-bs-toggle="modal" data-bs-target="#waterLevelModal">
                        <i class="fas fa-chart-line me-2"></i> Prediction Analysis
                    </button>

                </div>
            </div>
        </div>

        <div class="col-lg-9 col-md-8">
            <div class="card shadow-lg border-0 rounded-3 camera-card">
                <div class="card-body p-0 position-relative d-flex justify-content-center align-items-center">
                    <div class="red-dot live-indicator position-absolute top-0 start-0 m-3 pulse"></div>
                    <video
                    src="http://192.168.1.81:8080/SAGIP-Dashboard/assets/opencv.mp4"
                    autoplay
                    muted
                    loop
                    playsinline
                    class="camera-iframe rounded-3 w-100 h-100"
                    style="min-height: 250px; border: none; background-color: black; width: 100%;">
                    Your browser does not support the video tag.
                    </video>
                </div>
                <div class="card-footer bg-white text-center py-3">
                    <p class="mb-0 text-muted small">Real-time surveillance from SAGIP Station.</p>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- Water Level Chart Modal -->
<div class="modal fade" id="waterLevelModal" tabindex="-1" aria-labelledby="waterLevelModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title fw-bold" id="waterLevelModalLabel">Water Level Prediction Analysis</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div id="chartContainer">
          <canvas id="waterLevelLineChart" style="max-height: 400px;"></canvas>
        </div>
      </div>
      <div class="modal-footer">
        <button id="downloadChartPDF" class="btn btn-success">
          <i class="fas fa-download me-2"></i> Download as PDF
        </button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/SAGIP-Dashboard/js/camera.js"></script>
</body>
</html>