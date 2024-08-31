document.addEventListener("DOMContentLoaded", function() {
    const minusBtns = document.querySelectorAll('.minus-btn');
    const plusBtns = document.querySelectorAll('.plus-btn');
    
    minusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            let value = parseInt(input.value, 10);
            if (value > 1) {
                value--;
                input.value = value;
            }
        });
    });

    plusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            let value = parseInt(input.value, 10);
            value++;
            input.value = value;
        });
    });
});

