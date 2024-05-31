document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxElement = document.getElementById('tax');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const clearCartButton = document.getElementById('clear-cart');
    const cartCountElement = document.getElementById('cart-count');

    updateCartCount();
    updateCartDisplay();

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let subtotal = 0;

        cart.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.classList.add('cart-item');
            productElement.innerHTML = `
                <img src="images/STRIDE_STYLE1.png" alt="${product.name}">
                <p>${product.name}</p>
                <p>${product.price.toFixed(2)} € x ${product.quantity}</p>
                <input type="number" value="${product.quantity}" min="1" data-index="${index}">
                <button class="remove-item" data-index="${index}">🗑️</button>
            `;
            cartItemsContainer.appendChild(productElement);

            subtotal += product.price * product.quantity;
        });

        const tax = subtotal * 0.20;
        const shipping = 5.00;  // Fixed shipping rate for simplicity
        const total = subtotal + tax + shipping;

        subtotalElement.textContent = subtotal.toFixed(2) + ' €';
        taxElement.textContent = tax.toFixed(2) + ' €';
        shippingElement.textContent = shipping.toFixed(2) + ' €';
        totalElement.textContent = total.toFixed(2) + ' €';
    }

    clearCartButton.addEventListener('click', () => {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
        updateCartCount();
    });

    cartItemsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
        }
    });

    cartItemsContainer.addEventListener('input', (event) => {
        if (event.target.type === 'number') {
            const index = event.target.dataset.index;
            const newQuantity = event.target.value;
            if (newQuantity < 1) {
                cart.splice(index, 1);
            } else {
                cart[index].quantity = newQuantity;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
            updateCartCount();
        }
    });

    function updateCartCount() {
        cartCountElement.textContent = cart.length;
    }
});

