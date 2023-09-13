/* First thing we will do is add function to the remove button. Essentially, the remove button will remove the item from the cart.

1. Select the remove button
2. Add event to remove on selection
*/

// document // everything in the html 

if (document.readyState == 'loading') {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
} // Causes JS to wait for page to load


function ready() {
    updateCartTotal()


    var removeCartItemButtons = document.getElementsByClassName('btn-danger') // select all btn-danger class

    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i] // button is the ith elements of removeCartItemButtons
        button.addEventListener("click", remove) // event listener returns an event) // listen for a click on the button and performn remove function
    } // Iterate from i = 0 and increase i by 1 while i is less then 

    quantityButton = document.getElementsByClassName("cart-quantity-input")
    for (var i = 0; i < quantityButton.length; i++) {
        var button = quantityButton[i] // button is the ith elements of removeCartItemButtons
        button.addEventListener("input", updateCartTotal) // event listener returns an event) // listen for a click on the button and performn remove function
    }


    addToCartButtons = document.getElementsByClassName("shop-item-button")
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i] // button is the ith elements of removeCartItemButtons
        button.addEventListener("click", addToCartClicked) // event listener returns an event) // listen for a click on the button and performn remove function
    }

}

document.getElementsByClassName("btn-purchase")[0].addEventListener('click', purchasedClicked)

function purchasedClicked(event) {
    alert("Thank you for your Purchase")
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChlid)
    }
    updateCartTotal()
}

function remove(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopitem = button.parentElement.parentElement
    var title = shopitem.getElementsByClassName("shop-item-title")[0].innerText
    var image = shopitem.getElementsByClassName("shop-item-image")[0].src
    var price = shopitem.getElementsByClassName("shop-item-price")[0].innerText
    addToCart(title, image, price)
}

function addToCart(title, image, price) {
    var cartRow = document.createElement('div')
    cartRow.classList.add("cart-row") // Formats according to cart-row
    var cartItems = document.getElementsByClassName("cart-items")[0]
    
    var cartItemsNames = cartItems.getElementsByClassName("cart-item-title")

    for (i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title)
        {
            alert("Already in Cart")
            return
        }
    }

    var cartRowContents = `
        <div class="cart-column cart-item">
            <img class = "cart-item-image" src="${image}" width="100" height="100"> <!-- We can specific height and width here, however if we only specify one it will maintain the aspect ratio-->
            <span class = "cart-item-title"> ${title}</span>
        </div>
        <span class="cart-column cart-price"> ${price}</span>
        <div class="cart-column cart-quantity">
            <input class="cart-column cart-quantity-input" type="number" value="1"> <!-- Creates a box for entering inputs, you can restrict the type value is default value-->
            <button class = "btn btn-danger cart-quantity-button" type="button"> Remove </button>
        </div>
    `
    console.log(cartRowContents)
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    ready()
}

function updateCartTotal() {
    var cartPrices = document.getElementsByClassName('cart-price')
    var cartQuantitys = document.getElementsByClassName('cart-quantity-input')

    var total = 0

    for (var i = 1; i < cartPrices.length; i++) {
        priceElement = cartPrices[i]
        quantityElement = cartQuantitys[i - 1]
        
        var price = parseFloat(priceElement.innerText.replace("$"," "))
        var quantity = quantityElement.value
        total = total + quantity*price
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = "$" + String(total.toFixed(2))
}
