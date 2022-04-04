if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    //Add items to shopping cart
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
    //Shopping Cart -- Input quantity
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
    //Shopping Cart -- Remove button
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    //Shopping Cart -- Purchase button
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

/**
 * Quantity input box in the shopping cart
 * @param {*} event 
 */
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

/**
 * Remove button in the shopping cart
 * @param {*} event 
 */
function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

/**
 * Purchase button in the shopping cart
 */
function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('form-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

/**
 * Add items to shopping cart
 * @param {*} event 
 */
function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('form-row')
    var cartItems = document.getElementsByClassName('form-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('form-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            //alert('This item is already added to the cart')
            var currentQuantity = parseInt(document.getElementsByClassName('cart-quantity-input')[i].value)
            document.getElementsByClassName('cart-quantity-input')[i].value = currentQuantity + 1
            return
        }
    }
    var cartRowContents = `
        <div class="form-item form-colum">
            <img class="form-item-image" src="${imageSrc}" width="100" height="100">
            <span class="form-item-title">${title}</span>
        </div>
        <span class="cart-price form-colum">${price}</span>
        <div class="cart-quantity form-colum">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

/**
 * Update the total in the shopping cart
 */
function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('form-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('form-row')
    var total = 0
    //total = Number(total).toFixed(2)
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}