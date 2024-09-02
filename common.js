function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCount = 0;
    cart.forEach(item => {
        totalCount += item.quantity;
    });
    console.log("Updating cart count:", totalCount); // Check output
    document.getElementById('cart-count').textContent = totalCount;
}
