document.addEventListener("DOMContentLoaded", function() {
    // Menu Button Click Event
    const menuButton = document.getElementById("menu-button");
    menuButton.addEventListener("click", function() {
        document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    });

    // Logo Click Event
    const logo = document.querySelector(".logo");
    logo.addEventListener("click", function() {
        document.getElementById("menu").scrollIntoView({ behavior: "smooth" });
    });

    // Cart Button Click Event
    const cartButton = document.getElementById("cart-button");
    cartButton.addEventListener("click", function() {
        document.getElementById("cart").scrollIntoView({ behavior: "smooth" });
    });
});
