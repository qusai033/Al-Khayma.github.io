document.addEventListener("DOMContentLoaded", function() {
    function updatePrice(productCard) {
        const peopleSelect = productCard.querySelector('.people-select');
        const quantityInput = productCard.querySelector('.quantity-input');
        
        // Get base price from the selected number of people, or fall back to base price
        let basePrice = parseFloat(
            (peopleSelect && peopleSelect.selectedOptions[0]) 
            ? peopleSelect.selectedOptions[0].dataset.price 
            : productCard.querySelector('.price').dataset.priceBase
        );
        
        // Calculate the total price based on the selected quantity and base price
        const totalPrice = basePrice * parseInt(quantityInput.value, 10);
        
        // Update the price display
        productCard.querySelector('.price').textContent = totalPrice.toFixed(2);
    }



    // Initialize price when page loads
    function initializePrice(productCard) {
        const quantityInput = productCard.querySelector('.quantity-input');
        let basePrice = parseFloat(productCard.querySelector('.price').dataset.priceBase);
        const initialQuantity = parseInt(quantityInput.value, 10);
        const initialPrice = basePrice * initialQuantity;
        productCard.querySelector('.price').textContent = initialPrice.toFixed(2);
    }



    function addToCart(productCard, quantity, people, price, separatePlates) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        // Debugging: Check if the correct price is being passed
        console.log('Adding item to cart with price:', price); 
    
        let item = {
            productName: productCard.querySelector('h3').textContent,
            quantity: parseInt(quantity),
            people: parseInt(people),
            price: parseFloat(price), // Store the correct price
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
        updateCartCount();  // Update cart count after adding item
        refreshCart(); // Refresh cart to show updated items
    }
    
    // Update cart rendering logic
    function refreshCart() {
        const cartContainer = document.getElementById('cart-items');
        cartContainer.innerHTML = '';  // Clear existing cart display
    
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        let subtotal = 0;
    
        if (cart.length === 0) {
            cartContainer.textContent = 'Your cart is empty.';
        } else {
            cart.forEach((item, index) => {
                const itemPrice = parseFloat(item.price); // Use the price stored in the cart item
                const totalItemPrice = itemPrice * item.quantity;
                subtotal += totalItemPrice;  // Keep track of the subtotal
    
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <div class="item-info">
                        <img src="${item.imageUrl}" alt="${item.productName}" style="width: 50px; height: 50px;">
                        <div class="item-text">
                            ${item.quantity}x ${item.productName} for ${item.people} people - $${totalItemPrice.toFixed(2)} total
                            ${item.separatePlates ? ' (Separate Plates)' : ''}
                        </div>
                    </div>
                    <div class="item-controls">
                        <div class="quantity-controls">
                            <button class="btn-decrease">-</button>
                            <input type="text" value="${item.quantity}" readonly>
                            <button class="btn-increase">+</button>
                        </div>
                        <button class="btn-remove">Remove</button>
                    </div>
                `;
                cartContainer.appendChild(itemElement);
    
                // Event listeners for quantity changes and item removal
                itemElement.querySelector('.btn-decrease').addEventListener('click', () => changeQuantity(index, -1));
                itemElement.querySelector('.btn-increase').addEventListener('click', () => changeQuantity(index, 1));
                itemElement.querySelector('.btn-remove').addEventListener('click', () => removeItem(index));
            });
        }
    
        // Calculate taxes and total
        const delivery = 15;
        const taxes = subtotal * 0.3;
        const total = subtotal + delivery;
    
        // Update the subtotal, taxes, and total display
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('taxes').textContent = `$${taxes.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }



    // Initialize all prices on page load
    document.querySelectorAll('.product-card').forEach(productCard => {
        initializePrice(productCard);
    });


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
        updateCartCount();  // Update cart count after changing quantity
    }


    function removeItem(index) {
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        refreshCart();
        updateCartCount();  // Update cart count after changing quantity
    }


    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let totalCount = 0;
        cart.forEach(item => {
            totalCount += item.quantity;
        });
        document.getElementById('cart-count').textContent = totalCount;
    }

    
    
    document.querySelectorAll('.plus-btn, .minus-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.closest('.quantity-selector').querySelector('.quantity-input');
            let currentValue = parseInt(input.value, 10);
    
            if (btn.classList.contains('minus-btn')) {
                if (input.classList.contains('sandwich-quantity') && currentValue > 10) {
                    input.value = currentValue - 1;
                } else if (!input.classList.contains('sandwich-quantity') && currentValue > 1) {
                    input.value = currentValue - 1;
                }
            } else {
                input.value = currentValue + 1;
            }
    
            updatePrice(this.closest('.product-card'));
        });
    });

    document.querySelectorAll('.sandwich-quantity').forEach(input => {
        input.addEventListener('input', function() {
            if (parseInt(this.value, 10) < 10) {
                this.value = 10; // Enforce minimum of 10 sandwiches
            }
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
            
            let price;
            const peopleSelect = productCard.querySelector('.people-select');
    
            // Check if there's a people select dropdown (indicating it's a dish with people-based pricing)
            if (peopleSelect) {
                // For dishes, grab the updated price based on selected people
                price = parseFloat(productCard.querySelector('.price').textContent);
            } else {
                // For other items like sandwiches or appetizers, use the base price
                price = parseFloat(productCard.querySelector('.price').dataset.priceBase);
            }
    
            // Get the Separate Plates checkbox status
            const separatePlates = productCard.querySelector('.separate-plates') ? productCard.querySelector('.separate-plates').checked : false;
    
            console.log('Selected Price for Cart:', price);  // Debugging
    
            // Add the item to the cart with the correct price
            addToCart(
                productCard,
                productCard.querySelector('.quantity-input').value,
                peopleSelect ? peopleSelect.value : 'N/A',  // Get the number of people if applicable
                price,  // Pass the dynamically updated price for dishes, or base price for others
                separatePlates  // Pass the checkbox status
            );
        });
    });




    refreshCart();
    updateCartCount();  // Update cart count after changing quantity
});
