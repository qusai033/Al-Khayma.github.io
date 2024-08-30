let cart = [];

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

document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const zelleAgreement = document.getElementById('zelle-agreement').checked;

    if (zelleAgreement) {
        const orderDetails = cart.map(item => `${item.name} - $${item.price} x ${item.quantity}`).join('\n');
        const total = document.getElementById('total').textContent;

        const emailBody = `
            Name: ${name}
            Phone: ${phone}
            Address: ${address}
            Order Details:
            ${orderDetails}
            Total: $${total}
        `;

        window.location.href = `mailto:qusai4business@gmail.com?subject=New Order&body=${encodeURIComponent(emailBody)}`;
    } else {
        alert('You must agree to the Zelle payment terms to place an order.');
    }
});
