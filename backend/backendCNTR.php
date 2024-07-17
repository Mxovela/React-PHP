<?php
// Configuration
$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'mydatabase';

// Connect to database
$conn = new mysqli($db_host, $db_username, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// API endpoints
$app->post('/users', 'createUser');
$app->get('/users', 'getUsers');
$app->get('/users/:id', 'getUser');
$app->put('/users/:id', 'updateUser');
$app->delete('/users/:id', 'deleteUser');

// Functions
function createUser() {
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

function getUsers() {
    $query = "SELECT * FROM users";
    $result = $conn->query($query);

    $users = array();
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }

    echo json_encode($users);
}

function getUser($id) {
    $query = "SELECT * FROM users WHERE id = '$id'";
    $result = $conn->query($query);

    $user = $result->fetch_assoc();
    echo json_encode($user);
}

function updateUser($id) {
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

function deleteUser($id) {
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