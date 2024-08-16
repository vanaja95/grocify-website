/* script.js */

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add product to cart
function addToCart(productId) {
    let product = document.getElementById(productId);
    if (!product) {
        console.log('Product not found: ' + productId);
        return;
    }
    
    let title = product.querySelector('h3').innerText;
    let price = product.querySelector('.price').innerText;
    let quantity = product.querySelector('.quantity input').value;
    let imgSrc = product.querySelector('img').src;

    let productObj = {
        title: title,
        price: price,
        quantity: parseInt(quantity),
        imgSrc: imgSrc
    };

    // Check if product already exists in the cart
    let existingProductIndex = cart.findIndex(item => item.title === productObj.title);
    if (existingProductIndex !== -1) {
        // Update quantity if product exists
        cart[existingProductIndex].quantity += productObj.quantity;
    } else {
        // Add new product if it doesn't exist in the cart
        cart.push(productObj);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();
    loadCart(); // Optional: If you want to update the cart page immediately
}

// Function to update cart count
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').innerText = cartCount;
}

// Attach event listeners to "Add to Cart" buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        let productId = button.closest('.box').id;
        addToCart(productId);
    });
});

// Function to load and display cart items on the cart page
function loadCart() {
    let cartContainer = document.querySelector('.cart-contant');
    cartContainer.innerHTML = '';

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            cartContainer.innerHTML += `
                <div class="cart-box">
                    <img src="${item.imgSrc}" alt="${item.title}" class="product-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${item.title}</div>
                        <div class="cart-price">${item.price}</div>
                        <input type="number" value="${item.quantity}" class="cart-quantity" disabled>
                    </div>
                    <i class="fa fa-trash cart-remove" data-index="${index}"></i>
                </div>
            `;
        });
    }

    updateTotal();
}

// Function to update total price
function updateTotal() {
    let total = cart.reduce((sum, item) => {
        let price = parseFloat(item.price.replace('₹', ''));
        return sum + (price * item.quantity);
    }, 0);
    
    document.querySelector('.total-price').innerText = `Total: ₹${total.toFixed(2)}`;
}

// Function to remove item from cart
function removeItemFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

// Load cart items when the cart page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCart();

    document.querySelector('.cart-contant').addEventListener('click', (event) => {
        if (event.target.classList.contains('cart-remove')) {
            let index = event.target.getAttribute('data-index');
            removeItemFromCart(index);
        }
    });
});
