<?php
include("../../config/db.php");

$adminUsername = $_GET['admin'] ?? null;

if (!$adminUsername) {
  echo json_encode([]);
  exit;
}

$stmt = $conn->prepare("SELECT DISTINCT username FROM chat_messages WHERE recipient = ?");
$stmt->bind_param("s", $adminUsername);
$stmt->execute();
$result = $stmt->get_result();

$users = [];
while ($row = $result->fetch_assoc()) {
  $users[] = $row['username']; // will include 'asd'
}

echo json_encode($users);
?>
