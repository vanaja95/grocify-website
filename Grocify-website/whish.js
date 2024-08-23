// Wishlist Data
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Function to load and display wishlist items
function loadWishlist() {
    let wishlistContainer = document.querySelector('.wishlist-items');
    
    // If wishlistContainer doesn't exist, return
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
                    <div class="wishlist-actions">
                        <button class="add-to-cart-button" data-index="${index}">Add to Cart</button>
                        <i class="fa fa-trash wishlist-remove" data-index="${index}"></i>
                    </div>
                </div>
            `;
        });
    }

    attachWishlistEventListeners(); // Attach event listeners to wishlist items
}

// Function to remove item from wishlist
function removeItemFromWishlist(index) {
    wishlist.splice(index, 1);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadWishlist();
}

// Function to add product to wishlist
function addToWishlist(productId) {
    let product = document.getElementById(productId);
    if (!product) {
        console.error('Product not found: ' + productId);
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

// Function to display a notification when an item is added to the wishlist
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

// Attach event listeners to wishlist items
function attachWishlistEventListeners() {
    let removeButtons = document.querySelectorAll('.wishlist-remove');
    let addToCartButtons = document.querySelectorAll('.add-to-cart-button');
    
    if (removeButtons.length) {
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                let index = button.getAttribute('data-index');
                removeItemFromWishlist(index);
            });
        });
    } else {
        console.warn("No '.wishlist-remove' elements found.");
    }
    
    if (addToCartButtons.length) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                let index = button.getAttribute('data-index');
                addToCartFromWishlist(index);
            });
        });
    } else {
        console.warn("No '.add-to-cart-button' elements found.");
    }
}

// Function to add item to cart from wishlist
function addToCartFromWishlist(index) {
    let item = wishlist[index];
    if (!item) {
        console.error("Item not found in wishlist.");
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if item already exists in the cart
    let existingProductIndex = cart.findIndex(cartItem => cartItem.title === item.title);
    if (existingProductIndex !== -1) {
        // Update quantity if product exists
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add new item to the cart
        item.quantity = 1;  // Initialize quantity
        cart.push(item);
    }

    // Save updated cart to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count
    updateCartCount();

    // Optionally remove item from wishlist
    removeItemFromWishlist(index);

    console.log("Item added to cart:", item);
}

// Ensure wishlist count is updated on page load
document.addEventListener('DOMContentLoaded', () => {
    updateWishlistCount();
    loadWishlist();  // Load wishlist items if there's a wishlist page
});

// Attach event listeners to "Add to Wishlist" buttons (heart icons)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.fa-heart').forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            let productId = button.closest('.box').id;
            addToWishlist(productId);
        });
    });
});
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0); // Summing up quantities

    let cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        cartCountElement.innerText = cartCount;
    } else {
        console.error("Cart count element not found");
    }
}