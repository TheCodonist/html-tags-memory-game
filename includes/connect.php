<?php
if (strpos($_SERVER['HTTP_HOST'], ".") > 0) {
    $server_name = "localhost";
    $database = "kmprqiev_codonist";
    $username = "kmprqiev_aitch";
    $password = "aitch2392";
} else {
    $server_name = "localhost";
    $database = "codonist";
    $username = "root";
    $password = "";
}

$cont = mysqli_connect($server_name,$username,$password,$database);

if(!$cont){
    die('Connection Failed: ' . mysqli_connect_error());
}