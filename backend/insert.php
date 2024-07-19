<?php
require 'vendor/autoload.php';
include 'php';

//CREATE AND INSERTING NEW USER TO THE DATABASE
function createUser($conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $email = $data['email'];
    $password = $data['password'];
    $query = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";
    $result = $conn->query($query);

    if ($result) {
        echo json_encode(array('message' => 'User created successfully'));
    } else {
        echo json_encode(array('message' => 'Error creating user'));
    }
}

?>