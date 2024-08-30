let cart = [];

// Load cart from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart(); // Update the cart display with loaded items
    }

    // Set minimum date for the delivery date input
    const dateInput = document.getElementById('date');
    const today = new Date();
    const minDate = new Date(today.setDate(today.getDate() + 2)).toISOString().split('T')[0];
    dateInput.setAttribute('min', minDate);
});

function addToCart(itemName, price, quantity, image) {
    const existingItem = cart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name: itemName, price, quantity, image });
    }
    updateCart();
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

    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(itemName) {
    cart = cart.filter(item => item.name !== itemName);
    updateCart();
}

// Handle quantity buttons
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

// Handle Add to Cart buttons
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
