
<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $address = filter_input(INPUT_POST, 'address', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $date = filter_input(INPUT_POST, 'date', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $orderSummary = filter_input(INPUT_POST, 'order-summary', FILTER_SANITIZE_FULL_SPECIAL_CHARS);

    $to = "qusai4business@gmail.com"; // Ensure this is your correct email
    $subject = "New Order from $name";
    $message = "Name: $name\nEmail: $email\nPhone: $phone\nAddress: $address\nDelivery Date: $date\n\nOrder Summary:\n$orderSummary";
    
    $headers = "From: no-reply@Al-Khayma.github.io\r\n"; 
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        if (mail($to, $subject, $message, $headers)) {
            echo "Thank you for your order. We will contact you shortly.";
        } else {
            echo "There was an error processing your request. Please try again.";
        }
    } else {
        echo "POST method not handled.";
    }
?>
