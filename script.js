document.addEventListener("DOMContentLoaded", function() {
    // Logo Click Event
    const logo = document.querySelector(".logo");
    if (logo) {
        logo.addEventListener("click", function(event) {
            window.location.href = "index.html"; // Navigate back to the menu page
        });
    }

    // Menu Button Click Event
    const menuButton = document.getElementById("menu-button");
    if (menuButton) {
        menuButton.addEventListener("click", function(event) {
            window.location.href = "index.html"; // Navigate back to the menu page
        });
    }
});
