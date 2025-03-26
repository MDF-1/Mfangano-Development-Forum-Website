<?php
session_start();
require_once 'db_connect.php';

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        $_SESSION['error'] = "Security token invalid. Please try again.";
        header("Location: vaultloginresgister.php");
        exit();
    }

    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $password = $_POST['password'];

    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_email'] = $user['email'];
            $_SESSION['user_name'] = $user['first_name'];
            header("Location: vault.html");
            exit();
        } else {
            $_SESSION['error'] = "Invalid email or password";
            header("Location: vaultloginresgister.php");
            exit();
        }
    } catch (PDOException $e) {
        $_SESSION['error'] = "Login error. Please try again.";
        header("Location: vaultloginresgister.php");
        exit();
    }
}

header("Location: vaultloginresgister.php");
exit();
?>