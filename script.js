// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.getElementById('cart-button').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent default link behavior
    localStorage.setItem('currentPage', 'cart');
    document.getElementById('menu').classList.add('hidden'); // Hide the menu
    document.getElementById('cart').classList.remove('hidden'); // Show the cart
});

document.getElementById('continue-shopping').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    localStorage.setItem('currentPage', 'menu');
    document.getElementById('cart').classList.add('hidden'); // Hide the cart
    document.getElementById('menu').classList.remove('hidden'); // Show the menu
});

document.getElementById('menu-button').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    localStorage.setItem('currentPage', 'menu');
    document.getElementById('cart').classList.add('hidden'); // Hide the cart
    document.getElementById('menu').classList.remove('hidden'); // Show the menu
});

document.getElementById('logo').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default link behavior
    localStorage.setItem('currentPage', 'menu');
    document.getElementById('cart').classList.add('hidden'); // Hide the cart
    document.getElementById('menu').classList.remove('hidden'); // Show the menu
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
// Handle quantity buttons
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

// Add item to cart when the "Add to Cart" button is clicked
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(event) {
        const productCard = event.target.closest('.product-card');
        const itemName = productCard.querySelector('h3').textContent;
        const price = parseFloat(productCard.querySelector('p').textContent.replace('$', ''));
        const quantity = parseInt(productCard.querySelector('input').value);
        const image = productCard.querySelector('img').src;

        addToCart(itemName, price, quantity, image); // This will add the item to the cart with the specified quantity
    });
});
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
