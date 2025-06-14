<?php
$host = '192.168.100.107';     
$user = 'sagip';       
$pass = 'superchong21';    
$db   = 'historical_db';       

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
