<?php
include("../../config/weather_db.php");

header('Content-Type: application/json');

$query = "SELECT hum, temp, hi, pres, alt,  timestamp FROM readings ORDER BY timestamp DESC LIMIT 1";
$result = $conn->query($query);

if ($result && $row = $result->fetch_assoc()) {
    echo json_encode([
        "humidity" => $row['hum'],
        "temperature" => $row['temp'],
        "heatIndex" => $row['hi'],
        "pressure"=> $row['pres'],
        "altitude" => $row['alt'],
        "updated_at" => date("F j, Y g:i A", strtotime($row['timestamp']))
    ]);
} else {
    echo json_encode(["error" => "No data found"]);
}
?>
