<?php
/**
 * Created by PhpStorm.
 * User: hamayun
 * Date: 9/13/2018
 * Time: 3:02 AM
 */

$server_name = "localhost";
$database = "kmprqiev_codonist";
$username = "kmprqiev_aitch";
$password = "aitch2392";

$cont = mysqli_connect($server_name,$username,$password,$database);

if(!$cont){
    die('Connection Faild : ' . mysqli_connect_error());
}

$lala = "testing";