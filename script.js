document.addEventListener("DOMContentLoaded", function() {
    // Menu Button Click Event
    const menuButton = document.getElementById("menu-button");
    if (menuButton) {
        menuButton.addEventListener("click", function(event) {
            event.preventDefault();  // Prevent default action
            const menuSection = document.getElementById("menu");
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // Logo Click Event
    const logo = document.querySelector(".logo");
    if (logo) {
        logo.addEventListener("click", function(event) {
            event.preventDefault();  // Prevent default action
            const menuSection = document.getElementById("menu");
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }

    // Cart Button Click Event
    const cartButton = document.getElementById("cart-button");
    if (cartButton) {
        cartButton.addEventListener("click", function(event) {
            event.preventDefault();  // Prevent default action
            const cartSection = document.getElementById("cart");
            if (cartSection) {
                cartSection.classList.remove("hidden");  // Ensure the cart section is visible
                cartSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }
});
