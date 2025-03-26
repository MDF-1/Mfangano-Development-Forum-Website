<?php
session_start();
require_once 'db_connect.php';

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        $_SESSION['error'] = "Security token invalid";
        header("Location: forgot_password.php");
        exit();
    }

    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    
    try {
        $stmt = $pdo->prepare("SELECT id, first_name FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if ($user) {
            $token = bin2hex(random_bytes(32));
            $expiry = date('Y-m-d H:i:s', strtotime('+1 hour'));
            
            $stmt = $pdo->prepare("UPDATE users SET reset_token = ?, reset_expiry = ? WHERE id = ?");
            $stmt->execute([$token, $expiry, $user['id']]);
            
            // Send email with reset link
            $resetLink = "http://yourdomain.com/reset_password.php?token=$token";
            $subject = "Password Reset Request";
            $message = "Hello {$user['first_name']},\n\n";
            $message .= "You requested a password reset. Click the link below to reset your password:\n";
            $message .= "$resetLink\n\n";
            $message .= "This link will expire in 1 hour.\n";
            $message .= "If you didn't request this, please ignore this email.\n";
            
            $headers = "From: no-reply@yourdomain.com\r\n";
            $headers .= "Reply-To: no-reply@yourdomain.com\r\n";
            $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
            
            if (mail($email, $subject, $message, $headers)) {
                $_SESSION['success'] = "Password reset link sent to your email";
            } else {
                $_SESSION['error'] = "Failed to send email. Please try again.";
            }
        } else {
            $_SESSION['error'] = "If this email exists in our system, you'll receive a reset link";
            // Don't reveal if email exists for security
        }
    } catch (PDOException $e) {
        $_SESSION['error'] = "Error processing request";
    }
    
    header("Location: forgot_password.php");
    exit();
}
?>