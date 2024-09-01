document.addEventListener("DOMContentLoaded", function() {
    
    // Handle minus and plus buttons for quantity adjustments
    document.querySelectorAll('.minus-btn, .plus-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = btn.classList.contains('minus-btn') ? btn.nextElementSibling : btn.previousElementSibling;
            let value = parseInt(input.value, 10);
            if (btn.classList.contains('minus-btn') && value > 1) {
                value--;
            } else if (btn.classList.contains('plus-btn')) {
                value++;
            }
            input.value = value;
            updatePrice(input.closest('.product-card'));
        });
    });

    // Handle changes in the number of people, if applicable
    document.querySelectorAll('.people-select').forEach(select => {
        select.addEventListener('change', function() {
            updatePrice(this.closest('.product-card'));
        });
    });

    // Function to update price based on quantity and number of people or base price
    function updatePrice(productCard) {
        const peopleSelect = productCard.querySelector('.people-select');
        const quantityInput = productCard.querySelector('.quantity-input');
        let basePrice;

        if (peopleSelect) {
            basePrice = parseFloat(peopleSelect.selectedOptions[0].dataset.price);
        } else {
            basePrice = parseFloat(productCard.querySelector('.price').dataset.priceBase);
        }

        const quantity = parseInt(quantityInput.value, 10);
        const totalPrice = basePrice * quantity;
        productCard.querySelector('.price').textContent = totalPrice.toFixed(2);
    }

    // Handle adding items to the cart
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const quantity = productCard.querySelector('.quantity-input').value;
            const people = productCard.querySelector('.people-select') ? productCard.querySelector('.people-select').value : 'N/A';
            const separatePlates = productCard.querySelector('#separate-plates') ? productCard.querySelector('#separate-plates').checked : false;
            const price = productCard.querySelector('.price').textContent;
    
            console.log(`Attempting to add ${quantity} items for ${people} people at $${price} total to the cart.`);
            console.log(`Separate plates: ${separatePlates}`);
    
            // Simulate adding to cart
            addToCart(productCard, quantity, people, price, separatePlates);
        });
    });
    
    function addToCart(productCard, quantity, people, price, separatePlates) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let item = {
            productName: productCard.querySelector('h3').textContent,
            quantity: parseInt(quantity),
            people: parseInt(people),
            price: parseFloat(price),
            separatePlates: separatePlates
        };
    
        // Check if the item already exists in the cart
        const existingItem = cart.find(x => x.productName === item.productName && x.people === item.people && x.separatePlates === item.separatePlates);
        if (existingItem) {
            existingItem.quantity += item.quantity;  // Increment the quantity
        } else {
            cart.push(item);  // Add new item to cart
        }
    
        localStorage.setItem('cart', JSON.stringify(cart));
        alert("Item added to cart!");
    }





    function changeQuantity(index, delta) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (cart[index].quantity + delta > 0) {
            cart[index].quantity += delta;
        } else {
            // Optionally remove the item if quantity goes to zero
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        refreshCart();  // Reload cart display
    }
    
    function removeItem(index) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.splice(index, 1);  // Remove the item at the specified index
        localStorage.setItem('cart', JSON.stringify(cart));
        refreshCart();  // Reload cart display
    }
    
    function refreshCart() {
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = ''; // Clear current contents
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        if (cartItems.length === 0) {
            cartContainer.textContent = 'Your cart is empty.';
        } else {
            cartItems.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.productName}" style="width: 50px; height: 50px;">
                    <span>${item.quantity}x ${item.productName} for ${item.people} people - $${item.price.toFixed(2)} each</span>
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    <button onclick="removeItem(${index})">Remove</button>
                    ${item.separatePlates ? ' (Separate Plates)' : ''}
                `;
                cartContainer.appendChild(itemElement);
            });
        }
    }
});
