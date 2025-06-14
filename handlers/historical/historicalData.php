<?php
include("../../config/historical_db.php");

$result = $conn->query("SELECT * FROM historical_data ORDER BY timestamp ASC");

if ($result->num_rows > 0) {
  while ($row = $result->fetch_assoc()) {
    echo "<tr>
            <td>{$row['timestamp']}</td>
            <td>{$row['temp']}</td>
            <td>{$row['hum']}</td>
            <td>{$row['pres']}</td>
            <td>{$row['alt']}</td>
            <td>{$row['hi']}</td>
            <td class='condition'></td>
          </tr>";
  }
} else {
  echo "<tr><td colspan='7' class='text-center'>No data available</td></tr>";
}
?>
