<?php
session_start();
require_once 'db_connect.php';

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        $_SESSION['error'] = "Security token invalid. Please try again.";
        header("Location: vaultloginresgister.php?form=register");
        exit();
    }

    $firstName = filter_input(INPUT_POST, 'firstName', FILTER_SANITIZE_STRING);
    $lastName = filter_input(INPUT_POST, 'lastName', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phoneNumber', FILTER_SANITIZE_STRING);
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    if ($password !== $confirmPassword) {
        $_SESSION['error'] = "Passwords do not match!";
        header("Location: vaultloginresgister.php?form=register");
        exit();
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO users (first_name, last_name, email, phone_number, password_hash) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$firstName, $lastName, $email, $phone, $passwordHash]);
        $_SESSION['success'] = "Registration successful! Please login.";
        header("Location: vaultloginresgister.php");
        exit();
    } catch (PDOException $e) {
        $_SESSION['error'] = ($e->getCode() == 23000) ? "Email already exists!" : "Registration error. Please try again.";
        header("Location: vaultloginresgister.php?form=register");
        exit();
    }
}

header("Location: vaultloginresgister.php");
exit();
?>