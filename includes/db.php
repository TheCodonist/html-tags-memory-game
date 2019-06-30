<?php
require_once __DIR__ . '/connect.php';

if(isset($_REQUEST) && $_REQUEST['action'] == 'get'){
    $sql_query = "SELECT * FROM `html-tagers` ORDER BY `no_of_tags` DESC LIMIT 5";
    $result = mysqli_query($cont,$sql_query);
    if(mysqli_num_rows($result) > 0){
        die(json_encode(mysqli_fetch_all($result,MYSQLI_ASSOC)));
    }else{
        die(json_encode(array()));
    }
}

if(isset($_REQUEST) && $_REQUEST['action'] == 'insert'){
    $name = $_REQUEST['name'];
    $no_of_tags = $_REQUEST['no_of_tags'];
    $sql_query = "INSERT INTO `html-tagers` (`name`,`no_of_tags`) VALUES ('" . $name . "'," . $no_of_tags . ")";
    if(mysqli_query($cont,$sql_query)){
        echo "Data Successfully Inserted";
    }else{
        echo "Error While Inserting Data";
    }
}
