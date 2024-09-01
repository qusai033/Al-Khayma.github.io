
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
            const basePrice = parseFloat(productCard.querySelector('.price').dataset.priceBase);
            const multiplier = parseFloat(this.selectedOptions[0].dataset.priceMultiplier);
            const newPrice = basePrice * multiplier;

            productCard.querySelector('.price').textContent = newPrice.toFixed(2);
        });
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const quantity = productCard.querySelector('input[type="number"]').value;
            const people = productCard.querySelector('#people').value;
            const separatePlates = productCard.querySelector('#separate-plates').checked;
            const price = productCard.querySelector('.price').textContent;

            // Handle the cart addition logic here
            console.log(`Added ${quantity} items for ${people} people at $${price} each to the cart.`);
            if (separatePlates) {
                console.log('Serve in separate plates: Yes');
            }
        });
    });
});
