<?php
session_start();
require_once 'db_connect.php';

$token = $_GET['token'] ?? '';

try {
    $stmt = $pdo->prepare("SELECT id FROM users WHERE reset_token = ? AND reset_expiry > NOW()");
    $stmt->execute([$token]);
    $user = $stmt->fetch();

    if (!$user) {
        $_SESSION['error'] = "Invalid or expired token";
        header("Location: forgot_password.php");
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
            $_SESSION['error'] = "Security token invalid";
            header("Location: reset_password.php?token=$token");
            exit();
        }

        $password = $_POST['password'];
        $confirmPassword = $_POST['confirmPassword'];

        if ($password !== $confirmPassword) {
            $_SESSION['error'] = "Passwords do not match";
            header("Location: reset_password.php?token=$token");
            exit();
        }

        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare("UPDATE users SET password_hash = ?, reset_token = NULL, reset_expiry = NULL WHERE id = ?");
        $stmt->execute([$passwordHash, $user['id']]);
        
        $_SESSION['success'] = "Password updated successfully! Please login";
        header("Location: vaultloginresgister.php");
        exit();
    }
} catch (PDOException $e) {
    $_SESSION['error'] = "Error processing request";
    header("Location: forgot_password.php");
    exit();
}

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Set New Password</title>
    <style>
        :root {
            --primary-blue: #1a237e;
            --light-blue: #e8eaf6;
            --accent-yellow: #ffd600;
            --white: #ffffff;
            --dark-gray: #333333;
        }
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        body {
            background-color: var(--light-blue);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            padding: 2rem;
        }
        .reset-container {
            background: var(--white);
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            padding: 2rem;
            width: 100%;
            max-width: 500px;
        }
        .input-group {
            margin-bottom: 1.5rem;
        }
        label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--primary-blue);
            font-weight: 600;
        }
        input {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
        }
        button[type="submit"] {
            background-color: var(--accent-yellow);
            color: var(--dark-gray);
            padding: 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
            font-weight: 600;
        }
        .error-message {
            background-color: #ffebee;
            color: #c62828;
            padding: 1rem;
            margin-bottom: 1.5rem;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="reset-container">
        <h2 style="color: var(--primary-blue); text-align: center; margin-bottom: 1rem;">Set New Password</h2>
        
        <?php if (isset($_SESSION['error'])): ?>
            <div class="error-message"><?= $_SESSION['error'] ?></div>
            <?php unset($_SESSION['error']); ?>
        <?php endif; ?>
        
        <form method="POST">
            <div class="input-group">
                <label for="password">New Password</label>
                <input type="password" id="password" name="password" required>
            </div>
            <div class="input-group">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
            </div>
            <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token'] ?>">
            <button type="submit">Update Password</button>
        </form>
    </div>
</body>
</html>