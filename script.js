document.addEventListener("DOMContentLoaded", function() {
    // Handle minus and plus buttons for quantity adjustments
    document.querySelectorAll('.minus-btn, .plus-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = btn.classList.contains('minus-btn') ? btn.nextElementSibling : btn.previousElementSibling;
            let value = parseInt(input.value, 10);
            if (btn.classList.contains('minus-btn') && value > 1) {
                value--;
            } else if (btn.classList.contains('plus-btn')) {
                value++;
            }
            input.value = value;
            updatePrice(input.closest('.product-card'));
        });
    });

    // Handle changes in the number of people
    document.querySelectorAll('.people-select').forEach(select => {
        select.addEventListener('change', function() {
            updatePrice(this.closest('.product-card'));
        });
    });

    // Function to update price based on quantity and number of people
    function updatePrice(productCard) {
        const peopleSelect = productCard.querySelector('.people-select');
        const quantityInput = productCard.querySelector('.quantity-input');
        const basePrice = parseFloat(peopleSelect.selectedOptions[0].dataset.price);
        const quantity = parseInt(quantityInput.value, 10);
        const totalPrice = basePrice * quantity;
        productCard.querySelector('.price').textContent = totalPrice.toFixed(2);
    }

    // Handle adding items to the cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const quantity = productCard.querySelector('.quantity-input').value;
            const people = productCard.querySelector('.people-select').value;
            const separatePlates = productCard.querySelector('#separate-plates').checked;
            const price = productCard.querySelector('.price').textContent;

            console.log(`Added ${quantity} items for ${people} people at $${price} total to the cart.`);
            if (separatePlates) {
                console.log('Serve in separate plates: Yes');
            }
        });
    });
});
