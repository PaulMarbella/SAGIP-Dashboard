<?php
$host = '192.168.1.75';         
$user = 'sagip';       
$pass = 'superchong21';    
$db   = 'historical_db';       

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
