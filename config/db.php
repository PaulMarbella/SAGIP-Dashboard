<?php
$host = '192.168.100.52';     
$user = 'sagip';       
$pass = 'superchong21';    
$db   = 'sagip_db';       

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>


