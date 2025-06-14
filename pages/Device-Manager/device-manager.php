<?php include("../../config/db.php"); ?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Device Manager - Weather Monitoring</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- Bootstrap 5 CDN -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>


  <!-- Main Content -->
  <div class="container my-4">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h2>Device Manager</h2>
      <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#deviceModal">Add Device</button>
    </div>

    <!-- Device Table -->
    <div class="table-responsive">
      <table class="table table-bordered table-hover align-middle">
        <thead class="table-primary">
          <tr>
            <th>Device Name</th>
            <th>Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Last Ping</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Esp32</td>
            <td>MicroController</td>
            <td>SAGIP Station</td>
            <td><span class="badge bg-success">Online</span></td>
            <td>2 mins ago</td>
            <td>
              <button class="btn btn-sm btn-warning">Edit</button>
              <button class="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Camera RSTP</td>
            <td>Water Level Monitoring</td>
            <td>ParSci</td>
            <td><span class="badge bg-success">Online</span></td>
            <td>1 mins ago</td>
            <td>
              <button class="btn btn-sm btn-warning">Edit</button>
              <button class="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Raspberry Pi</td>
            <td>single-board computer</td>
            <td>SAGIP Station</td>
            <td><span class="badge bg-success">Online</span></td>
            <td>2 mins ago</td>
            <td>
              <button class="btn btn-sm btn-warning">Edit</button>
              <button class="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- Add/Edit Device Modal -->
  <div class="modal fade" id="deviceModal" tabindex="-1" aria-labelledby="deviceModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <form>
          <div class="modal-header">
            <h5 class="modal-title" id="deviceModalLabel">Add Device</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="deviceName" class="form-label">Device Name</label>
              <input type="text" class="form-control" id="deviceName" required>
            </div>
            <div class="mb-3">
              <label for="deviceType" class="form-label">Device Type</label>
              <select class="form-select" id="deviceType">
                <option>Temperature</option>
                <option>Humidity</option>
                <option>Heat Index</option>
                <option>Water Level</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="deviceLocation" class="form-label">Location</label>
              <input type="text" class="form-control" id="deviceLocation" required>
            </div>
            <div class="mb-3">
              <label for="lastPing" class="form-label">Last Ping</label>
              <input type="datetime-local" class="form-control" id="lastPing">
            </div>
            <div class="mb-3">
              <label for="uptime" class="form-label">Uptime (%)</label>
              <input type="number" class="form-control" id="uptime" max="100" min="0" required>
            </div>
          </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">Save Device</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Bootstrap JS Bundle -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
