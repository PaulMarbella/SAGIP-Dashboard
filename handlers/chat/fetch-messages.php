<?php
include("../../config/db.php");
header('Content-Type: application/json');

// Get username and recipient from query
$recipient = $_GET['recipient'] ?? null;
$username = $_GET['username'] ?? null;

if (!$username) {
  http_response_code(400);
  echo json_encode(["error" => "Missing username"]);
  exit;
}

if ($recipient === "" || $recipient === null) {
  // GLOBAL CHAT
  $result = $conn->query("SELECT * FROM chat_messages WHERE recipient IS NULL ORDER BY created_at ASC");
} else {
  // PRIVATE CHAT
  $stmt = $conn->prepare("
    SELECT * FROM chat_messages
    WHERE (recipient = ? AND username = ?) 
       OR (recipient = ? AND username = ?)
    ORDER BY created_at ASC
  ");
  $stmt->bind_param("ssss", $username, $recipient, $recipient, $username);
  $stmt->execute();
  $result = $stmt->get_result();
}

if (!$result) {
  http_response_code(500);
  echo json_encode(["error" => "Failed to fetch messages", "sql_error" => $conn->error]);
  exit;
}

$messages = [];
while ($row = $result->fetch_assoc()) {
  $createdAt = strtotime($row['created_at']);
  $row['date_pretty'] = date("F j, Y", $createdAt);
  $row['time_pretty'] = date("g:i A", $createdAt);

  // Fix: role = admin if sender is in your admins list
  $adminList = ['admin', '09171234567', '09982345678', '0288888888', '0288269131'];
  $row['role'] = in_array($row['username'], $adminList) ? 'admin' : 'user';

  $messages[] = $row;
}

echo json_encode($messages);
?>
