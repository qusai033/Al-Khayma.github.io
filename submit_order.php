<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $address = htmlspecialchars($_POST['address']);
    $date = htmlspecialchars($_POST['date']);
    $orderSummary = htmlspecialchars($_POST['order-summary']);

    $to = "qusai4business@gmail.com.com"; // Replace with your email
    $subject = "New Order from $name";
    $message = "Name: $name\nEmail: $email\nPhone: $phone\nAddress: $address\nDelivery Date: $date\n\nOrder Summary:\n$orderSummary";
    
    $headers = "From: no-reply@Al-Khayma.github.io\r\n"; // Use your domain email
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
