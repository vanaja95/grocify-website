// cart js section starts

// Ensure the DOM is fully loaded before executing scripts
if (document.readyState == 'loading') {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// Function to set up initial event listeners
function ready() {
  // Remove items from cart
  var removeCartButtons = document.getElementsByClassName("cart-remove");
  for (var i = 0; i < removeCartButtons.length; i++) {
      var button = removeCartButtons[i];
      button.addEventListener("click", removeCartItem);
  }

  // Quantity changes
  var quantityInputs = document.getElementsByClassName('cart-quantity');
  for (var i = 0; i < quantityInputs.length; i++) {
      var input = quantityInputs[i];
      input.addEventListener('change', quantityChanged);
  }

  // Add to cart
  var addCart = document.getElementsByClassName("add-cart");
  for (var i = 0; i < addCart.length; i++) {
      var button = addCart[i];
      button.addEventListener("click", addCartClicked);
  }
}

// Remove items from cart
function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

// Quantity changes
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
  }
  updateTotal();
}

// Add to cart function
function addCartClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
  var price = shopProducts.getElementsByClassName("price")[0].innerText;
  var productImg = shopProducts.getElementsByClassName("product-image")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");

  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemsName = cartItems.getElementsByClassName("cart-product-title");

  for (var i = 0; i < cartItemsName.length; i++) {
      if (cartItemsName[i].innerText === title) {
          alert("You have already added this item to the cart");
          return;
      }
  }

  var cartBoxContent = `
      <img src="${productImg}" alt="" class="product-img">
      <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
          <input type="number" value="1" class="cart-quantity">
      </div>
      <i class="fa fa-trash cart-remove"></i>
  `;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);

  cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
  cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}

// Update total function
function updateTotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
  var total = 0;
  for (var i = 0; i < cartBoxes.length; i++) {
      var cartBox = cartBoxes[i];
      var priceElement = cartBox.getElementsByClassName("cart-price")[0];
      var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
      var price = parseFloat(priceElement.innerText.replace("$", ""));
      var quantity = quantityElement.value;
      total = total + price * quantity;
  }

  // If the price contains the same cents value, ensure the total is rounded
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName('total-price')[0].innerText = "$" + total;
}








