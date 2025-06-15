

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Admin Chat Panel</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="/SAGIP-Dashboard/css/chat.css">
</head>
<body class="p-4">
<div class="container-fluid">
  <div class="row">
    <!-- Sidebar: List of users who messaged admin -->
    <div class="col-md-3 border-end">
      <h5 class="text-primary">🧾 Private Messages</h5>
      <ul id="userList" class="list-group mb-3"></ul>
    </div>

    <!-- Chat Area -->
    <div class="col-md-9">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h4 id="chatTitle">💬 Global Chat</h4>
        <button id="backToGlobalBtn" class="btn btn-sm btn-secondary d-none">← Back</button>
      </div>

      <div id="messageList" class="border border-3 p-3 mb-3 bg-light rounded" style="height: 300px; overflow-y: auto;"></div>

      <div class="input-group">
        <input type="text" id="messageInput" class="form-control" placeholder="Type your message">
        <button id="sendMessage" class="btn btn-danger">Send</button>
      </div>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
<script src="/SAGIP-Dashboard/js/admin-msg.js"></script>
</body>
</html>
