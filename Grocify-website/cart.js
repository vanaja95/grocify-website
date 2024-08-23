

let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let header = document.querySelector('.header-2');

// Add click event listener to the menu icon
menu.addEventListener('click', () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
});

// Optional: Close the menu when clicking outside
document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !navbar.contains(event.target)) {
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
    }
});



//searchbar js  
document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById("search-box");

    searchBox.addEventListener("input", () => {
        const searchQuery = searchBox.value.toLowerCase();
        const productBoxes = document.querySelectorAll(".box");

        productBoxes.forEach(box => {
            const productName = box.querySelector("h3").textContent.toLowerCase();
            
            if (productName.includes(searchQuery)) {
                box.style.display = "block"; // Show product
            } else {
                box.style.display = "none"; // Hide product
            }
        });
    });
});






// cart page

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
    let quantity = product.querySelector('.cart-quantity').value;
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

    updateCartCount();  // Update cart count after adding product
    showNotification(); // Show notification after adding product
}

// Function to display a notification
function showNotification() {
    alert("Your product has been added to the cart!");

    var notification = document.getElementById("cart-notification");
    if (notification) {
        notification.className = "notification show";

        // Hide the notification after 3 seconds
        setTimeout(function(){
            notification.className = notification.className.replace("show", ""); 
        }, 3000);
    }
}

// Function to update cart count
function updateCartCount() {
    // Reload cart from localStorage to ensure it's up-to-date
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    let cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cartCount;
    } else {
        console.error("Cart count element not found");
    }
}

// Ensure cart count is updated on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount(); // Make sure to call this on all pages where cart count needs to be displayed
    loadCart();
});

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
    if (!cartContainer) return;  // Return if the cart container is not present

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
                        <input type="number" value="${item.quantity}" class="cart-quantity" data-index="${index}">
                    </div>
                    <i class="fa fa-trash cart-remove" data-index="${index}"></i>
                </div>
            `;
        });
    }

    updateTotal();
    attachCartEventListeners(); // Attach event listeners to cart items
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

// Function to handle quantity changes in the cart
function quantityChanged(event) {
    const input = event.target;
    const index = input.getAttribute('data-index');
    let newQuantity = parseInt(input.value);

    if (isNaN(newQuantity) || newQuantity <= 0) {
        newQuantity = 1;
        input.value = 1;
    }

    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateTotal();
    updateCartCount(); // Update cart count after quantity change
}

// Attach event listeners to cart items
function attachCartEventListeners() {
    document.querySelectorAll('.cart-remove').forEach(button => {
        button.addEventListener('click', (event) => {
            let index = button.getAttribute('data-index');
            removeItemFromCart(index);
        });
    });

    document.querySelectorAll('.cart-quantity').forEach(input => {
        input.addEventListener('change', quantityChanged);
    });
}

// Trigger a thank you message after a purchase
document.querySelector('.btn-purchase').addEventListener('click', function() {
    alert('Thank you for your purchase!');
    // Additional purchase logic here
});


document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();  // Ensure cart count is updated on page load
});

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    let cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.innerText = cartCount;
    } else {
        console.error("Cart count element not found");
    }
}


//edit js 

document.getElementById('edit-profile-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;

    // You can save the data to a database here or use localStorage for a simple demo
    localStorage.setItem('profileName', name);
    localStorage.setItem('profileEmail', email);
    localStorage.setItem('profilePhone', phone);
    localStorage.setItem('profileLocation', location);

    // Redirect back to profile page
    window.location.href = 'profile.html';
});




// profile  js code


document.addEventListener('DOMContentLoaded', () => {
    fetchOrders();
});
function logout() {
    alert('Logged out successfully!');
    window.location.href = 'login.html'; // Redirect to login page
}





//review js code

// Function to rotate testimonials
function rotateTestimonials() {
    const boxes = document.querySelectorAll('.testimonial-box');
    let index = 0;

    // Hide all testimonials
    function hideAll() {
        boxes.forEach(box => {
            box.style.display = 'none';
        });
    }

    // Show the current testimonial
    function showCurrent() {
        hideAll();
        boxes[index].style.display = 'block';
    }

    // Start rotating
    showCurrent();
    setInterval(() => {
        index = (index + 1) % boxes.length; // Move to the next testimonial
        showCurrent();
    }, 5000); // Change every 5 seconds
}

// Initialize testimonials rotation on page load
document.addEventListener('DOMContentLoaded', rotateTestimonials);

// Handle review form submission
document.getElementById('review-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('review-name').value;
    const text = document.getElementById('review-text').value;

    // Log the data (for demonstration purposes)
    console.log('Review submitted:', { name, text });

    // You would typically send this data to a server here

    // Optionally, clear the form fields
    document.getElementById('review-form').reset();
});



// category slider js code
document.addEventListener("DOMContentLoaded", function () {
    const carouselWrapper = document.querySelector(".carousel-wrapper");
    const prevBtn = document.querySelector(".carousel-control.prev");
    const nextBtn = document.querySelector(".carousel-control.next");
    
    let currentIndex = 0;
    const carouselBoxes = document.querySelectorAll(".category-box");
    const visibleBoxes = Math.floor(carouselWrapper.offsetWidth / carouselBoxes[0].offsetWidth);
    
    function updateCarousel() {
        const boxWidth = carouselBoxes[0].offsetWidth;
        carouselWrapper.style.transform = `translateX(-${currentIndex * boxWidth}px)`;
    }

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < carouselBoxes.length - visibleBoxes) {
            currentIndex++;
            updateCarousel();
        }
    });

    window.addEventListener("resize", updateCarousel);
});





// whishlist js code


// Wishlist Data
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Function to load and display wishlist items
function loadWishlist() {
    let wishlistContainer = document.querySelector('.wishlist-items');
    
    // Ensure wishlistContainer exists
    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = '';

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
    } else {
        wishlist.forEach((item, index) => {
            wishlistContainer.innerHTML += `
                <div class="wishlist-box">
                    <img src="${item.imgSrc}" alt="${item.title}" class="product-img">
                    <div class="detail-box">
                        <div class="wishlist-product-title">${item.title}</div>
                        <div class="wishlist-price">${item.price}</div>
                    </div>
                    <i class="fa fa-trash wishlist-remove" data-index="${index}"></i>
                </div>
            `;
        });
    }

    attachWishlistEventListeners(); // Attach event listeners to wishlist items
}

// Function to add product to wishlist
function addToWishlist(productId) {
    let product = document.getElementById(productId);
    if (!product) {
        console.log('Product not found: ' + productId);
        return;
    }

    let title = product.querySelector('h3').innerText;
    let price = product.querySelector('.price').innerText;
    let imgSrc = product.querySelector('img').src;

    let productObj = {
        title: title,
        price: price,
        imgSrc: imgSrc
    };

    // Check if product already exists in the wishlist
    let existingProductIndex = wishlist.findIndex(item => item.title === productObj.title);
    if (existingProductIndex === -1) {
        wishlist.push(productObj);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();  // Update wishlist count after adding product
        showWishlistNotification(); // Show notification after adding product
    } else {
        alert("This item is already in your wishlist.");
    }
}

// Function to remove item from wishlist
function removeItemFromWishlist(index) {
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlist();
}

// Attach event listeners to wishlist items
function attachWishlistEventListeners() {
    document.querySelectorAll('.wishlist-remove').forEach(button => {
        button.addEventListener('click', (event) => {
            let index = button.getAttribute('data-index');
            removeItemFromWishlist(index);
        });
    });
}

// Function to update wishlist count
function updateWishlistCount() {
    let wishlistCount = wishlist.length;

    let wishlistCountElement = document.getElementById('wishlist-count');
    if (wishlistCountElement) {
        wishlistCountElement.innerText = wishlistCount;
    } else {
        console.error("Wishlist count element not found");
    }
}

// Function to display a notification when item is added to wishlist
function showWishlistNotification() {
    var notification = document.getElementById("wishlist-notification");
    if (notification) {
        notification.classList.add("show");

        // Hide the notification after 3 seconds
        setTimeout(function(){
            notification.classList.remove("show");
        }, 3000);
    }
}

// Attach event listeners to "Add to Wishlist" buttons (heart icons)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fa-heart').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            let productId = button.closest('.box').id;
            addToWishlist(productId);
        });
    });

    updateWishlistCount(); // Ensure wishlist count is updated on page load
    loadWishlist();       // Load wishlist items if there's a wishlist page
});
