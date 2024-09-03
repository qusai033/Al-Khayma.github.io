
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



// This event listener ensures the cart count is updated and the form is properly handled on page load
document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();  // Update cart count as soon as the page loads

    // Check if the form exists and add a submit event listener
    var form = document.getElementById('order-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();  // Prevent the default form submission
            var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            var orderSummary = "";
            var orderTotal = 0;
        
            cartItems.forEach(item => {
                var itemTotal = item.quantity * item.price;
                orderTotal += itemTotal;
                orderSummary += `${item.quantity}x ${item.productName} for ${item.people} people - $${itemTotal.toFixed(2)} each; Separate Plates: ${item.separatePlates ? 'Yes' : 'No'}\n`;
            });
        
            var depositAmount = orderTotal * 0.30; // Calculate 30% deposit
        
            document.getElementById('order-summary').value = orderSummary;
            document.getElementById('order-total').value = `$${orderTotal.toFixed(2)}`;
            document.getElementById('deposit-amount').value = `$${depositAmount.toFixed(2)}`; // Set deposit amount in hidden input
            // For example, collecting form data, validating it, and then maybe sending via AJAX
            console.log("Form submitted!");
        });
    } else {
        console.error("Order form not found on this page.");
    }
    // Any other initialization code can go here
});
