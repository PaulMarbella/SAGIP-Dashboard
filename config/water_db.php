<?php
$host = '192.168.100.102';     
$user = 'sagip';       
$pass = 'superchong21';    
$db   = 'water_level';       

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>

