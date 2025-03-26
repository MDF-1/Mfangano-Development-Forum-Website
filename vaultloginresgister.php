<?php
session_start();
require_once 'db_connect.php';

$error_message = $_SESSION['error'] ?? '';
$success_message = $_SESSION['success'] ?? '';
unset($_SESSION['error'], $_SESSION['success']);

if (empty($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

$active_form = isset($_GET['form']) && $_GET['form'] === 'register' ? 'register' : 'login';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login & Register</title>
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
            color: var(--dark-gray);
            line-height: 1.6;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .form-wrapper {
            width: 100%;
            max-width: 800px;
            background: var(--white);
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            overflow: hidden;
            display: flex;
        }
        .form-container {
            padding: 2.5rem;
            width: 100%;
        }
        .form-header {
            text-align: center;
            margin-bottom: 2rem;
        }
        .form-header h2 {
            color: var(--primary-blue);
            margin-bottom: 0.5rem;
        }
        .form-header p {
            color: var(--dark-gray);
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
        input[type="text"],
        input[type="email"],
        input[type="tel"],
        input[type="password"] {
            width: 100%;
            padding: 12px 15px;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            transition: border-color 0.3s;
        }
        input:focus {
            border-color: var(--primary-blue);
            outline: none;
        }
        button[type="submit"] {
            background-color: var(--primary-blue);
            color: var(--white);
            padding: 12px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
            font-size: 1rem;
            font-weight: 600;
            transition: background-color 0.3s;
            margin-top: 1rem;
        }
        button[type="submit"]:hover {
            background-color: #0d47a1;
        }
        .form-footer {
            text-align: center;
            margin-top: 1.5rem;
        }
        .form-footer a {
            color: var(--primary-blue);
            text-decoration: none;
            font-weight: 600;
        }
        .form-footer a:hover {
            text-decoration: underline;
        }
        .hidden {
            display: none;
        }
        .password-strength {
            margin-top: 0.5rem;
        }
        progress {
            width: 100%;
            height: 8px;
            border-radius: 4px;
            margin-top: 0.5rem;
        }
        progress::-webkit-progress-bar {
            background-color: #eee;
            border-radius: 4px;
        }
        progress::-webkit-progress-value {
            background-color: var(--accent-yellow);
            border-radius: 4px;
        }
        .error-message {
            background-color: #ffebee;
            color: #c62828;
            padding: 1rem;
            margin-bottom: 1.5rem;
            border-radius: 5px;
            border-left: 4px solid #c62828;
        }
        .success-message {
            background-color: #e8f5e9;
            color: #2e7d32;
            padding: 1rem;
            margin-bottom: 1.5rem;
            border-radius: 5px;
            border-left: 4px solid #2e7d32;
        }
        .toggle-link {
            color: var(--primary-blue);
            cursor: pointer;
            font-weight: 600;
            text-decoration: none;
        }
        .toggle-link:hover {
            text-decoration: underline;
        }
        .password-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        @media (max-width: 768px) {
            .password-container {
                grid-template-columns: 1fr;
            }
            .form-wrapper {
                flex-direction: column;
            }
            .form-container {
                padding: 1.5rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="form-wrapper">
            <div class="form-container">
                <?php if (!empty($error_message)): ?>
                    <div class="error-message"><?= htmlspecialchars($error_message) ?></div>
                <?php endif; ?>
                <?php if (!empty($success_message)): ?>
                    <div class="success-message"><?= htmlspecialchars($success_message) ?></div>
                <?php endif; ?>
                
                <div id="loginForm" class="<?= $active_form === 'login' ? '' : 'hidden' ?>">
                    <div class="form-header">
                        <h2>Welcome Member!</h2>
                        <p>Login to access Member Center</p>
                        <p>If you are not a member consider Paying the membership fee under membership Page</p>
                    </div>
                    <form method="POST" action="login.php">
                        <div class="input-group">
                            <label for="loginEmail">Email</label>
                            <input type="email" id="loginEmail" name="email" placeholder="Enter your email" required>
                        </div>
                        <div class="input-group">
                            <label for="loginPassword">Password</label>
                            <input type="password" id="loginPassword" name="password" placeholder="Enter your password" required>
                        </div>
                        <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token'] ?>">
                        <button type="submit">Login</button>
                        <div class="form-footer">
                            <p>Don't have an account? <a href="?form=register" class="toggle-link">Register here</a></p>
                            <p><a href="forgot_password.php">Forgot password?</a> <a href="index.html">Home</a></p>
                        </div>
                    </form>
                </div>
                
                <div id="registerForm" class="<?= $active_form === 'register' ? '' : 'hidden' ?>">
                    <div class="form-header">
                        <h2>Create Account</h2>
                        <p>Join us today</p>
                    </div>
                    <form method="POST" action="register.php" onsubmit="return validatePasswords()">
                        <div class="input-group">
                            <label for="firstName">First Name</label>
                            <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" required>
                        </div>
                        <div class="input-group">
                            <label for="lastName">Last Name</label>
                            <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" required>
                        </div>
                        <div class="input-group">
                            <label for="registerEmail">Email</label>
                            <input type="email" id="registerEmail" name="email" placeholder="Enter your email" required>
                        </div>
                        <div class="input-group">
                            <label for="phoneNumber">Phone Number</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="Enter your phone number" required>
                        </div>
                        <div class="password-container">
                            <div class="input-group">
                                <label for="password">Password</label>
                                <input type="password" id="password" name="password" placeholder="Create a password" required onkeyup="checkPasswordStrength()">
                            </div>
                            <div class="input-group">
                                <label for="confirmPassword">Confirm Password</label>
                                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Re-enter password" required>
                            </div>
                        </div>
                        <div class="password-strength">
                            <p id="passwordInstructions">Password strength:</p>
                            <progress id="passwordStrength" value="0" max="100"></progress>
                        </div>
                        <p id="passwordError" class="hidden" style="color: #c62828; margin-top: 0.5rem;">Passwords do not match!</p>
                        <input type="hidden" name="csrf_token" value="<?= $_SESSION['csrf_token'] ?>">
                        <button type="submit" style="background-color: var(--accent-yellow); color: var(--dark-gray);">Register Now</button>
                        <div class="form-footer">
                            <p>Already have an account? <a href="?form=login" class="toggle-link">Login here</a> <a href="index.html">Home</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script>
        function validatePasswords() {
            const password = document.getElementById("password").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const errorText = document.getElementById("passwordError");
            
            if (password !== confirmPassword) {
                errorText.classList.remove("hidden");
                return false;
            }
            errorText.classList.add("hidden");
            return true;
        }

        function checkPasswordStrength() {
            const password = document.getElementById("password").value;
            const strengthBar = document.getElementById("passwordStrength");
            let strength = 0;
            
            if (password.length >= 8) strength += 25;
            if (/[A-Z]/.test(password)) strength += 25;
            if (/[a-z]/.test(password)) strength += 25;
            if (/[0-9]/.test(password)) strength += 12.5;
            if (/[^A-Za-z0-9]/.test(password)) strength += 12.5;
            
            strengthBar.value = strength;
        }
    </script>
</body>
</html>