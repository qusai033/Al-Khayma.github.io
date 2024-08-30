let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Ensure the cart is updated when the page loads
document.addEventListener('DOMContentLoaded', function() {
    updateCart(); // Display the existing cart items

    // Event listeners for navigation
    document.getElementById('cart-button').addEventListener('click', function() {
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('cart').classList.remove('hidden');
    });

    document.getElementById('continue-shopping').addEventListener('click', function() {
        document.getElementById('cart').classList.add('hidden');
        document.getElementById('menu').classList.remove('hidden');
    });

    document.getElementById('menu-button').addEventListener('click', function() {
        document.getElementById('cart').classList.add('hidden');
        document.getElementById('menu').classList.remove('hidden');
    });

    document.getElementById('logo').addEventListener('click', function() {
        document.getElementById('cart').classList.add('hidden');
        document.getElementById('menu').classList.remove('hidden');
    });

    // Attach event listeners to quantity buttons and add to cart buttons
    document.querySelectorAll('.plus-btn').forEach(button => {
        button.addEventListener('click', event => {
            const input = event.target.parentElement.querySelector('input');
            input.value = parseInt(input.value) + 1;
        });
    });

    document.querySelectorAll('.minus-btn').forEach(button => {
        button.addEventListener('click', event => {
            const input = event.target.parentElement.querySelector('input');
            if (input.value > 1) {
                input.value = parseInt(input.value) - 1;
            }
        });
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const productCard = event.target.closest('.product-card');
            const itemName = productCard.querySelector('h3').textContent;
            const price = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));
            const quantity = parseInt(productCard.querySelector('input').value);
            const image = productCard.querySelector('img').src;

            addToCart(itemName, price, quantity, image);
        });
    });

    // Restore previous page state
    const currentPage = localStorage.getItem('currentPage') || 'menu';
    if (currentPage === 'cart') {
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('cart').classList.remove('hidden');
    } else {
        document.getElementById('menu').classList.remove('hidden');
        document.getElementById('cart').classList.add('hidden');
    }
});

function addToCart(itemName, price, quantity, image) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: itemName, price, quantity, image });
    }
    updateCart();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const cartCountElement = document.getElementById('cart-count');

    cartItemsContainer.innerHTML = '';
    let subtotal = 0;
    let totalItems = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        totalItems += item.quantity;

        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <p>${item.name} - $${item.price} x ${item.quantity}</p>
                <button onclick="removeFromCart('${item.name}')">Remove</button>
            </div>
        `;
    });

    subtotalElement.textContent = subtotal.toFixed(2);
    totalElement.textContent = subtotal.toFixed(2);
    cartCountElement.textContent = totalItems;

    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCart();
}
