<?php
include("../../config/db.php");

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if ($username && $password) {
  $stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $stmt->store_result();

  if ($stmt->num_rows > 0) {
    $stmt->bind_result($hashedPassword);
    $stmt->fetch();

    if (password_verify($password, $hashedPassword)) {
      echo "success";
    } else {
      echo "❌ Incorrect password.";
    }
  } else {
    echo "❌ Account not found.";
  }
  $stmt->close();
} else {
  echo "❌ Missing input.";
}
?>
