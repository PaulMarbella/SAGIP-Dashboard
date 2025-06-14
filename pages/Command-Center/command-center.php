<?php include("../../config/db.php"); ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Simple Local Chat</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="/SAGIP-Dashboard/css/chat.css">
</head>
<body class="p-4">

<div class="container">
  <h3 class="mb-4">Message</h3>

  <!-- Optional hidden input to store username -->
  <input type="hidden" id="currentUsername">

  <div id="messageList" class="border border-3 p-3 mb-3 bg-light rounded" style="height: 300px; overflow-y: auto;">
    <!-- Messages will appear here -->
  </div>

  <div class="input-group">
    <input type="text" id="messageInput" class="form-control" placeholder="Type your message" autocomplete="off">
    <button id="sendMessage" class="btn btn-danger">Send</button>
  </div>
</div>


 <div class="container mt-5">
    <h2 class="mb-4 text-dark">📞 Emergency Contact Directory</h2>

    <div class="table-responsive">
      <table class="table table-bordered table-striped align-middle">
        <thead class="table-primary">
          <tr>
            <th>Barangay</th>
            <th>Contact Person</th>
            <th>Role</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Baclaran</td>
            <td>Juan Dela Cruz</td>
            <td>Brgy. Captain</td>
            <td>0917-123-4567</td>
            <td>
              <a href="tel:09171234567" class="btn btn-success btn-sm me-1">Call</a>
              <a href="sms:09171234567" class="btn btn-outline-primary btn-sm">Message</a>
            </td>
          </tr>
          <tr>
            <td>Don Galo</td>
            <td>Maria Santos</td>
            <td>Rescue Head</td>
            <td>0998-234-5678</td>
            <td>
              <a href="tel:09982345678" class="btn btn-success btn-sm me-1">Call</a>
              <a href="sms:09982345678" class="btn btn-outline-primary btn-sm">Message</a>
            </td>
          </tr>
          <tr>
            <td>LGU Hotline</td>
            <td>Central Office</td>
            <td>Emergency Center</td>
            <td>(02) 8888-8888</td>
            <td>
              <a href="tel:0288888888" class="btn btn-success btn-sm me-1">Call</a>
              <a href="sms:0288888888" class="btn btn-outline-primary btn-sm">Message</a>
            </td>
          </tr>
          <tr>
            <td>Sto. Niño Fire and Rescue </td>
            <td>Local FB Unit</td>
            <td>Emergency Center</td>
            <td>8826‑9131 (BFP)</td>
            <td>
              <a href="tel:0288269131" class="btn btn-success btn-sm me-1">Call</a>
              <a href="sms:0288269131" class="btn btn-outline-primary btn-sm">Message</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>


  <script src="/SAGIP-Dashboard/js/message.js"></script>
</body>
</html>
