<?php
include("../../config/db.php");

header('Content-Type: application/json');

$result = $conn->query("SELECT id, username, message, DATE_FORMAT(created_at, '%h:%i %p') AS created_at FROM chat_messages ORDER BY created_at ASC");



if (!$result) {
  http_response_code(500);
  echo json_encode(["error" => "Failed to fetch messages"]);
  exit;
}

$messages = [];
while ($row = $result->fetch_assoc()) {
  $messages[] = $row;
}

echo json_encode($messages);
?>
