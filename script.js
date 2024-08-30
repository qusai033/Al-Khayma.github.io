document.addEventListener('DOMContentLoaded', function() {
    // Ensure the cart is updated when the page loads
    updateCart(); 

    // Event listeners for navigation
    document.getElementById('cart-button').addEventListener('click', function() {
        navigateToSection('cart');
    });

    document.getElementById('continue-shopping').addEventListener('click', function() {
        navigateToSection('menu');
    });

    document.getElementById('menu-button').addEventListener('click', function() {
        navigateToSection('menu');
    });

    document.getElementById('logo').addEventListener('click', function() {
        navigateToSection('menu');
    });

    // Handle "Add to Cart" button clicks
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

    // Restore previous page state
    const currentPage = localStorage.getItem('currentPage') || 'menu';
    navigateToSection(currentPage);
});

function navigateToSection(section) {
    localStorage.setItem('currentPage', section);
    if (section === 'cart') {
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('cart').classList.remove('hidden');
    } else {
        document.getElementById('cart').classList.add('hidden');
        document.getElementById('menu').classList.remove('hidden');
    }
}

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
