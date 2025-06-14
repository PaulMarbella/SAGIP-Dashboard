<?php
include("../../config/db.php");
error_reporting(E_ALL);
ini_set("display_errors", 1);

$username = trim($_POST['username'] ?? '');
$message = trim($_POST['message'] ?? '');


$recipient = isset($_POST['recipient']) && trim($_POST['recipient']) !== '' ? trim($_POST['recipient']) : null;

if (!empty($username) && !empty($message)) {
  $stmt = $conn->prepare("INSERT INTO chat_messages (username, message, recipient) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $username, $message, $recipient);

  if ($stmt->execute()) {
    echo "OK";
  } else {
    echo "DB insert failed: " . $stmt->error;
  }

  $stmt->close();
} else {
  http_response_code(400);
  echo "Missing username or message";
}
?>
