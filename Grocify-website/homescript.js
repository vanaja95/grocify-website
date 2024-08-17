// JavaScript code to handle menu toggle and header scroll effects

// Select elements from the DOM
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header-2');

// Add click event listener to the menu icon
menu.addEventListener('click', () => {
    // Toggle 'fa-times' class to change the menu icon
    menu.classList.toggle('fa-times');
    // Toggle 'active' class to show/hide the navbar
    navbar.classList.toggle('active');
});

// Add scroll event listener to the window
window.onscroll = () => {
    // Remove classes when scrolling to close the menu and hide the navbar
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    // Add 'active' class to the header when scrolled past 150px
    if (window.scrollY > 150) {
        header.classList.add('active');
    } else {
        header.classList.remove('active');
    }
};







var swiper = new Swiper(".home-slider", {
  spaceBetween: 30,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  loop:true,
});



//account page login and register page js start

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});







//account page login and register page js end


//cart js

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


document.querySelector('.btn').addEventListener('click', function() {
    alert('Thank you for your purchase!');
});



 document.querySelectorAll(".cart-quantity").forEach(input => {
        input.addEventListener("change", quantityChanged);
    });


function quantityChanged(event) {
        const input = event.target;
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1;
        }
        updateCartTotal();
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
