
document.addEventListener("DOMContentLoaded", function() {
    const minusBtns = document.querySelectorAll('.minus-btn');
    const plusBtns = document.querySelectorAll('.plus-btn');
    const inputs = document.querySelectorAll('.quantity-selector input[type="number"]');
    const peopleSelects = document.querySelectorAll('.people-select');

    minusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            let value = parseInt(input.value, 10);
            if (value > 1) {
                value--;
                input.value = value;
                input.dispatchEvent(new Event('input')); // Trigger input event
            }
        });
    });

    plusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            let value = parseInt(input.value, 10);
            value++;
            input.value = value;
            input.dispatchEvent(new Event('input')); // Trigger input event
        });
    });

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            // Add any additional functionality needed when input changes
            console.log(`Quantity updated to: ${this.value}`);
        });
    });


    peopleSelects.forEach(select => {
        select.addEventListener('change', function() {
            const productCard = this.closest('.product-card');
            const selectedPrice = parseFloat(this.selectedOptions[0].dataset.price);
            productCard.querySelector('.price').textContent = selectedPrice.toFixed(2);
        });
    });

    
    const updatePrice = function(productCard) {
        const peopleSelect = productCard.querySelector('.people-select');
        const quantityInput = productCard.querySelector('.quantity-input');
        
        const basePrice = parseFloat(peopleSelect.selectedOptions[0].dataset.price);
        const quantity = parseInt(quantityInput.value, 10);
        
        const totalPrice = basePrice * quantity;
        productCard.querySelector('.price').textContent = totalPrice.toFixed(2);
    };

    // Update price when the number of people changes
    document.querySelectorAll('.people-select').forEach(select => {
        select.addEventListener('change', function() {
            const productCard = this.closest('.product-card');
            updatePrice(productCard);
        });
    });

    // Update price when the quantity changes
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('input', function() {
            const productCard = this.closest('.product-card');
            updatePrice(productCard);
        });
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const quantity = productCard.querySelector('.quantity-input').value;
            const people = productCard.querySelector('.people-select').value;
            const separatePlates = productCard.querySelector('#separate-plates').checked;
            const price = productCard.querySelector('.price').textContent;

            // Handle the cart addition logic here
            console.log(`Added ${quantity} items for ${people} people at $${price} total to the cart.`);
            if (separatePlates) {
                console.log('Serve in separate plates: Yes');
            }
        });
    });
});
