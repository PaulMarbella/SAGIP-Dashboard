<?php
include("../../config/water_db.php"); 

header('Content-Type: application/json');

$query = "SELECT water_mm, alert_level, timestamp FROM water_logs ORDER BY timestamp ASC";
$result = $conn->query($query);

$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = [
            "water_mm" => (int)$row['water_mm'],
            "alert_level" => $row['alert_level'],
            "timestamp" => $row['timestamp']
        ];
    }
    echo json_encode($data);
} else {
    echo json_encode(["error" => "No data found"]);
}
?>
