<?php
include("../../config/db.php");

$id = $_POST['id'] ?? null;

if ($id) {
  // Optional: Add admin verification here later
  $stmt = $conn->prepare("DELETE FROM chat_messages WHERE id = ?");
  $stmt->bind_param("i", $id);
  $stmt->execute();
}
?>
