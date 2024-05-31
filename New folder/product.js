document.addEventListener('DOMContentLoaded', () => {
    let slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    document.querySelector('.prev').addEventListener('click', () => plusSlides(-1));
    document.querySelector('.next').addEventListener('click', () => plusSlides(1));
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => currentSlide(index + 1));
    });

    const sizes = document.querySelectorAll('.size-option');
    const colors = document.querySelectorAll('.color-option');
    let selectedSize = '';
    let selectedColor = '';

    sizes.forEach(size => {
        size.addEventListener('click', () => {
            sizes.forEach(s => s.classList.remove('selected'));
            size.classList.add('selected');
            selectedSize = size.dataset.size;
        });
    });

    colors.forEach(color => {
        color.addEventListener('click', () => {
            colors.forEach(c => c.classList.remove('selected'));
            color.classList.add('selected');
            selectedColor = color.dataset.color;
        });
    });

    document.getElementById('add-to-cart').addEventListener('click', () => {
        if (!selectedSize || !selectedColor) {
            alert('Please select size and color');
            return;
        }
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const product = {
            name: 'Product Name',
            size: selectedSize,
            color: selectedColor,
            quantity: 1,
            price: 100.00
        };
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert('Product added to cart');
    });

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        document.getElementById('cart-count').textContent = cart.length;
    }

    updateCartCount();

    const feedbackSection = document.querySelector('.feedback-section');
    const feedbackTextarea = document.getElementById('feedback');
    const feedbackList = document.getElementById('feedback-list');
    const feedbackStars = document.querySelectorAll('.star');
    let selectedRating = 0;

    feedbackStars.forEach(star => {
        star.addEventListener('click', () => {
            feedbackStars.forEach(s => s.classList.remove('selected'));
            star.classList.add('selected');
            selectedRating = star.dataset.rating;
        });
    });

    document.getElementById('submit-feedback').addEventListener('click', () => {
        const feedbackText = feedbackTextarea.value;
        if (!feedbackText || !selectedRating) {
            alert('Please provide feedback and select a rating');
            return;
        }
        const feedback = {
            text: feedbackText,
            rating: selectedRating
        };
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        feedbacks.push(feedback);
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
        feedbackTextarea.value = '';
        feedbackStars.forEach(s => s.classList.remove('selected'));
        selectedRating = 0;
        displayFeedbacks();
    });

    function displayFeedbacks() {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        feedbackList.innerHTML = feedbacks.map(fb => `
            <div class="feedback-item">
                <p>${fb.text}</p>
                <div>${'★'.repeat(fb.rating)}</div>
            </div>
        `).join('');
    }

    displayFeedbacks();
});
