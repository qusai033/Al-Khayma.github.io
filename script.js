// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', function() {
    updateCart(); // Ensure the cart is updated when the page loads

    // Set minimum date for the delivery date input
    const dateInput = document.getElementById('date');
    const today = new Date();
    const minDate = new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0];
    dateInput.setAttribute('min', minDate);
});

// Add item to cart
function addToCart(itemName, price, quantity, image) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: itemName, price, quantity, image });
    }
    updateCart();
    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
}

// Update the cart display and quantities
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

    localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
}

// Remove item from cart
function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCart();
}

// Handle quantity buttons
document.querySelectorAll('.plus-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        const input = event.target.parentElement.querySelector('input');
        const productCard = event.target.closest('.product-card');
        const itemName = productCard.querySelector('h3').textContent;
        const price = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));
        const image = productCard.querySelector('img').src;

        addToCart(itemName, price, 1, image); // Increase quantity by 1
        input.value = parseInt(input.value) + 1;
    });
});

document.querySelectorAll('.minus-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        const input = event.target.parentElement.querySelector('input');
        if (input.value > 1) {
            input.value = parseInt(input.value) - 1;
            const productCard = event.target.closest('.product-card');
            const itemName = productCard.querySelector('h3').textContent;
            const price = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));
            const image = productCard.querySelector('img').src;

            addToCart(itemName, price, -1, image); // Decrease quantity by 1
        }
    });
});

// Handle Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(event) {
        const productCard = event.target.closest('.product-card');
        const itemName = productCard.querySelector('h3').textContent;
        const price = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));
        const quantity = parseInt(productCard.querySelector('input').value);
        const image = productCard.querySelector('img').src;

        addToCart(itemName, price, quantity, image);
    });
});
document.getElementById('menu-button').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('currentPage', 'menu');
    document.getElementById('cart').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
});

document.getElementById('continue-shopping').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('currentPage', 'menu');
    document.getElementById('cart').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
});

document.getElementById('cart-button').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('currentPage', 'cart');
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('cart').classList.remove('hidden');
});

// Check page state on load and navigate to the correct page
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = localStorage.getItem('currentPage') || 'menu';
    if (currentPage === 'cart') {
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('cart').classList.remove('hidden');
    } else {
        document.getElementById('menu').classList.remove('hidden');
        document.getElementById('cart').classList.add('hidden');
    }
    updateCart(); // Ensure the cart is updated when the page loads
});
document.getElementById('logo').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('currentPage', 'menu');
    document.getElementById('cart').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
});
