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

document.addEventListener("DOMContentLoaded", function() {
    console.log("Document loaded.");
    updateCartCount();
    var form = document.getElementById('order-form');
    if (form) {
        console.log("Form found, attaching submit event listener.");
        form.addEventListener('submit', function(event) {
            console.log("Form submission triggered.");
            event.preventDefault();
            
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
            document.getElementById('deposit-amount').value = `$${depositAmount.toFixed(2)}`;
        });
    } else {
        console.error("Order form not found on this page.");
    }
});
