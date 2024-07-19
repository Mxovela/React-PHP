<?php

// API endpoints
$app->post('/users', 'createUser');
$app->get('/users', 'getUsers');
$app->get('/users/:id', 'getUser');
$app->put('/users/:id', 'updateUser');
$app->delete('/users/:id', 'deleteUser');

// Functions

//GET USERS FUNCTION FROIM THE DATABASE
function getUsers($conn) {
    $query = "SELECT * FROM users";
    $result = $conn->query($query);

    $users = array();
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode($users);
}


// GET USER FUNCTION EITHER BY SEARCH FUNCTIONALITY
function getUser($id, $conn) {
    $query = "SELECT * FROM users WHERE id = '$id'";
    $result = $conn->query($query);

    $user = $result->fetch_assoc();
    echo json_encode($user);
}

function updateUser($id, $conn) {
    $data = json_decode(file_get_contents('php://input'), true);
    $name = $data['name'];
    $email = $data['email'];
    $password = $data['password'];
    $query = "UPDATE users SET name = '$name', email = '$email', password = '$password' WHERE id = '$id'";
    $result = $conn->query($query);

    if ($result) {
        echo json_encode(array('message' => 'User updated successfully'));
    } else {
        echo json_encode(array('message' => 'Error updating user'));
    }
}


//DELETE USER FROM THE DATABASE FUNCTIONALITY
function deleteUser($id, $conn) {
    $query = "DELETE FROM users WHERE id = '$id'";
    $result = $conn->query($query);

    if ($result) {
        echo json_encode(array('message' => 'User deleted successfully'));
    } else {
        echo json_encode(array('message' => 'Error deleting user'));
    }
}

// Close database connection
$conn->close();
?>