<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $phone = htmlspecialchars($_POST['phone']);
    $address = htmlspecialchars($_POST['address']);
    $date = htmlspecialchars($_POST['date']);
    $orderSummary = htmlspecialchars($_POST['order-summary']);

    $to = "qusai4business@gmail.com"; // Replace with your email
    $subject = "New Order from $name";
    $message = "Name: $name\nEmail: $email\nPhone: $phone\nAddress: $address\nDelivery Date: $date\n\nOrder Summary:\n$orderSummary";
    $headers = "From: no-reply@Al-Khayma.com";

    if (mail($to, $subject, $message, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>
