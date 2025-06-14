<?php
include("../../config/db.php");
header('Content-Type: application/json');

$result = $conn->query("
  SELECT id, username, message, created_at
  FROM chat_messages
  ORDER BY created_at ASC
");

if (!$result) {
  http_response_code(500);
  echo json_encode([
    "error" => "Failed to fetch messages",
    "sql_error" => $conn->error
  ]);
  exit;
}

$messages = [];
while ($row = $result->fetch_assoc()) {
  $createdAt = strtotime($row['created_at']);
  $row['date_pretty'] = date("F j, Y", $createdAt);
  $row['time_pretty'] = date("g:i A", $createdAt);

  // ✅ Inject role manually based on username
  $row['role'] = ($row['username'] === 'Jericho') ? 'admin' : 'user';

  $messages[] = $row;
}

echo json_encode($messages);
?>
