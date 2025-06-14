<?php
include("../../config/water_db.php"); 

$query = "SELECT water_mm, alert_level, timestamp FROM water_logs ORDER BY id DESC LIMIT 1";
$result = $conn->query($query);

if ($result && $row = $result->fetch_assoc()) {
    echo json_encode([
        "water_mm" => $row['water_mm'],
        "alert_level" => $row['alert_level'],
        "timestamp" => $row['timestamp']
    ]);
} else {
    echo json_encode(["error" => "No data found"]);
}
?>
