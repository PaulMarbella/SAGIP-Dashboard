<?php
include("../../config/db.php");
error_reporting(E_ALL);
ini_set("display_errors", 1);

$username = trim($_POST['username'] ?? '');
$message = trim($_POST['message'] ?? '');

if (!empty($username) && !empty($message)) {
  $stmt = $conn->prepare("INSERT INTO chat_messages (username, message) VALUES (?, ?)");
  $stmt->bind_param("ss", $username, $message);

  if ($stmt->execute()) {
    http_response_code(200);
    echo "OK";
  } else {
    http_response_code(500);
    echo "DB insert failed: " . $stmt->error;
  }

  $stmt->close();
} else {
  http_response_code(400);
  echo "Missing username or message";
}
?>
