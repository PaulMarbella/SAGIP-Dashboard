<?php
include("../../config/db.php");

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';



if ($username && $password) {
  $stmt = $conn->prepare("SELECT password, role FROM users WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $stmt->store_result();

  if ($stmt->num_rows > 0) {
    $stmt->bind_result($hashedPassword, $role);
    $stmt->fetch();

    if (password_verify($password, $hashedPassword)) {
      echo json_encode([
        "status" => "success",
        "username" => $username,
        "role" => $role
      ]);
    } else {
      echo json_encode(["status" => "error", "message" => "❌ Incorrect password."]);
    }
  } else {
    echo json_encode(["status" => "error", "message" => "❌ Account not found."]);
  }

  $stmt->close();
} else {
  echo json_encode(["status" => "error", "message" => "❌ Missing input."]);
}
?>
