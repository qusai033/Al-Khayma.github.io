// This function updates the cart count from localStorage
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCount = 0;
    cart.forEach(item => {
        totalCount += item.quantity;
    });
    //console.log("Cart loaded from localStorage:", cart);  // Debugging info
    //console.log("Total count calculated:", totalCount);  // Debugging info
    document.getElementById('cart-count').textContent = totalCount;
}

document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();  // Update cart count as soon as the page loads

    var form = document.getElementById('order-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            // Extract and process cart items to prepare submission data
            var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
            var orderSummary = "";
            var orderTotal = 0;

            cartItems.forEach(item => {
                var itemTotal = item.quantity * item.price;
                orderTotal += itemTotal;
                orderSummary += `${item.quantity}x ${item.productName} for ${item.people} people - $${itemTotal.toFixed(2)} each; Separate Plates: ${item.separatePlates ? 'Yes' : 'No'}\n`;
            });

            var depositAmount = orderTotal * 0.30;  // Calculate 30% deposit

            // Set values in hidden inputs
            document.getElementById('order-summary').value = orderSummary;
            document.getElementById('order-total').value = `$${orderTotal.toFixed(2)}`;
            document.getElementById('deposit-amount').value = `$${depositAmount.toFixed(2)}`;

            // Optionally, log the form submission event
            //console.log("Form submission processed, proceeding to submit.");

            // To actually submit the form, comment out or remove the next line:
            // event.preventDefault(); // Uncomment this line if you are testing and do not want to submit the form.
        });
    } else {
        //console.error("Order form not found on this page.");
    }
});
