// This function updates the cart count from localStorage
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCount = 0;
    cart.forEach(item => {
        totalCount += item.quantity;
    });
    console.log("Cart loaded from localStorage:", cart);  // Debugging info
    console.log("Total count calculated:", totalCount);  // Debugging info
    document.getElementById('cart-count').textContent = totalCount;
}

// This event listener ensures the cart count is updated on page load
document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();  // Update cart count as soon as the page loads
    // Any other initialization code can go here
});
