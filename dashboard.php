<?php
session_start();
require_once 'db_connect.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
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
            padding: 2rem;
        }
        .dashboard-container {
            max-width: 1200px;
            margin: 0 auto;
            background: var(--white);
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            padding: 2rem;
        }
        .dashboard-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid var(--light-blue);
        }
        .welcome-message {
            color: var(--primary-blue);
            font-size: 1.5rem;
        }
        .logout-btn {
            background-color: var(--accent-yellow);
            color: var(--dark-gray);
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 600;
            text-decoration: none;
            transition: background-color 0.3s;
        }
        .logout-btn:hover {
            background-color: #ffc400;
        }
        .dashboard-content {
            padding: 1rem 0;
        }
    </style>
</head>
<body>
    <div class="dashboard-container">
        <div class="dashboard-header">
            <div class="welcome-message">
                Welcome, <?php echo htmlspecialchars($_SESSION['user_name']); ?>!
            </div>
            <a href="logout.php" class="logout-btn">Logout</a>
        </div>
        <div class="dashboard-content">
            <p>You are now logged in to your secure dashboard.</p>
        </div>
    </div>
</body>
</html>