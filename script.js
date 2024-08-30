// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Event listeners for cart visibility and navigation
document.getElementById('cart-button').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('currentPage', 'cart');
    document.getElementById('menu').classList.add('hidden');
    document.getElementById('cart').classList.remove('hidden');
});

document.getElementById('continue-shopping').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('currentPage', 'menu');
    document.getElementById('cart').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
});

document.getElementById('menu-button').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('currentPage', 'menu');
    document.getElementById('cart').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
});

document.getElementById('logo').addEventListener('click', function(event) {
    event.preventDefault();
    localStorage.setItem('currentPage', 'menu');
    document.getElementById('cart').classList.add('hidden');
    document.getElementById('menu').classList.remove('hidden');
});

// Set the minimum date for the delivery date input
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date();
    const minDate = new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0];
    dateInput.setAttribute('min', minDate);

    // Check page state on load and navigate to the correct page
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

// Add item to cart
function addToCart(itemName, price, quantity, image) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += quantity; // Increase quantity if item already in cart
    } else {
        cart.push({ name: itemName, price, quantity, image }); // Add new item to cart
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

// Handle quantity buttons on the menu without affecting the cart
document.querySelectorAll('.plus-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        const input = event.target.parentElement.querySelector('input');
        input.value = parseInt(input.value) + 1;
    });
});

document.querySelectorAll('.minus-btn').forEach(button => {
    button.addEventListener('click', function(event) {
        const input = event.target.parentElement.querySelector('input');
        if (input.value > 1) {
            input.value = parseInt(input.value) - 1;
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
