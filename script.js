
document.addEventListener("DOMContentLoaded", function() {
    const minusBtns = document.querySelectorAll('.minus-btn');
    const plusBtns = document.querySelectorAll('.plus-btn');
    const inputs = document.querySelectorAll('.quantity-selector input[type="number"]');

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
});
