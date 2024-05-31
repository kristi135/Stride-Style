document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Checkout complete!');
    localStorage.removeItem('cart');
    window.location.href = 'confirmatio.html';
});
