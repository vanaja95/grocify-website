

//cart js section starts

if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded",ready);
    }else{
      ready();
  }
  
  //making functions
  
  function ready(){
    var removeCartButtons=document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons);
    for(var i=0;i<removeCartButtons.length;i++){
      var button=removeCartButtons[i];
      button.addEventListener("click",removeCartItem);
    }
    //quantity changes

    var quantityInputs =document.getElementsByClassName('cart-quantity');
    for(var i = 0; i < quantityInputs.length; i++){
        var input = quantityInputs[i];
        input.addEventListener('change',quantityChanged);
    }
    //add to cart button
    var addCart = document.getElementsByClassName("add-cart");
    for(var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click",addCartClicked);
    }
  }
  //remove items from cart
  function removeCartItem(event){
    var buttonClicked=event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
  }
   //quantity changes
   function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;

    }
    updatetotal();
   }

   //add to cart function
 
   function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName("cart-product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("cart-price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].innerText;
    addProductToCart(title ,price, productImg);
    updatetotal();
   }





  //update total

  function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-contant")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        var cartBox=cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total = total + price *quantity;

        //if price contain same cents value

        total =Math.round(total * 100)/100;

        document.getElementsByClassName('total-price')[0].innerText ="$" +total;
    }
  }

    
