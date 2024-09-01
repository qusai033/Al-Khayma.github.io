

document.addEventListener("DOMContentLoaded", function() {
    function updatePrice(productCard) {
        const peopleSelect = productCard.querySelector('.people-select');
        const quantityInput = productCard.querySelector('.quantity-input');
        let basePrice = parseFloat((peopleSelect ? peopleSelect.selectedOptions[0].dataset.price : productCard.querySelector('.price').dataset.priceBase));
        const totalPrice = basePrice * parseInt(quantityInput.value, 10);
        productCard.querySelector('.price').textContent = totalPrice.toFixed(2);
    }

    function addToCart(productCard, quantity, people, price, separatePlates) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let item = {
            productName: productCard.querySelector('h3').textContent,
            quantity: parseInt(quantity),
            people: parseInt(people),
            price: parseFloat(price),
            separatePlates: separatePlates,
            imageUrl: productCard.querySelector('img').src
        };

        const existingItem = cart.find(x => x.productName === item.productName && x.people === item.people && x.separatePlates === item.separatePlates);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cart.push(item);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Item added to cart!");
    }

    function refreshCart() {
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = '';  // Clear existing cart display
    
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log('Loaded cart:', cart);
    
        if (cart.length === 0) {
            cartContainer.textContent = 'Your cart is empty.';
        } else {
            cart.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item'); // Add a class for potential CSS styling
                itemElement.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.productName}" style="width: 50px; height: 50px;">
                    <span>${item.quantity}x ${item.productName} for ${item.people} people - $${(item.price * item.quantity).toFixed(2)} total</span>
                    ${item.separatePlates ? ' (Separate Plates)' : ''}
                    <div class="quantity-controls">
                        <button class="btn-decrease">-</button>
                        <input type="text" value="${item.quantity}" readonly>
                        <button class="btn-increase">+</button>
                    </div>
                    <button class="btn-remove">Remove</button>
                `;
                cartContainer.appendChild(itemElement);
    
                itemElement.querySelector('.btn-decrease').addEventListener('click', () => changeQuantity(index, -1));
                itemElement.querySelector('.btn-increase').addEventListener('click', () => changeQuantity(index, 1));
                itemElement.querySelector('.btn-remove').addEventListener('click', () => removeItem(index));
            });
        }
    }



    function changeQuantity(index, delta) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart[index].quantity + delta > 0) {
            cart[index].quantity += delta;
            cart[index].totalPrice = cart[index].price * cart[index].quantity;  // Recalculate total price
        } else {
            cart.splice(index, 1);  // Remove the item if quantity goes to zero
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        refreshCart();  // Reload cart display
    }


    function removeItem(index) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        refreshCart();
    }

    document.querySelectorAll('.minus-btn, .plus-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = btn.classList.contains('minus-btn') ? btn.nextElementSibling : btn.previousElementSibling;
            input.value = parseInt(input.value, 10) + (btn.classList.contains('minus-btn') ? -1 : 1);
            updatePrice(btn.closest('.product-card'));
        });
    });

    document.querySelectorAll('.people-select').forEach(select => {
        select.addEventListener('change', function() {
            updatePrice(this.closest('.product-card'));
        });
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            addToCart(
                productCard,
                productCard.querySelector('.quantity-input').value,
                productCard.querySelector('.people-select') ? productCard.querySelector('.people-select').value : 'N/A',
                productCard.querySelector('.price').textContent,
                productCard.querySelector('#separate-plates') ? productCard.querySelector('#separate-plates').checked : false
            );
        });
    });

    refreshCart();
});
