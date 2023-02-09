const cartButton = document.querySelector('header .cart');
const cartBackground = document.querySelector('.cart-background');
const closeCartButton = cartBackground.querySelector('.checkout .close-btn');
const removeAll = cartBackground.querySelector('.remove-all');
const checkout = document.getElementById('checkout');

checkout.addEventListener('click', onCheckout);
removeAll.addEventListener('click', onRemoveAll)
cartButton.addEventListener('click', onCartClick);
closeCartButton.addEventListener('click', cartModalToggle);

function onRemoveAll() {
    const token = localStorage.getItem('token');
    const headers = {
        authorization: `Bearer ${token}`
    };

    fetch(`/api/product/cart`, { method: 'delete', headers }).then(response => {
        fetchCart();
        counterValue();
    });
}

function onCheckout(event) {
    const token = localStorage.getItem('token');
    const headers = {
        authorization: `Bearer ${token}`
    };

    fetch(`/api/product/cart/checkout`, { method: 'POST', headers }).then(response => {
        fetchCart();
        counterValue();
    })
}

function addEventHandler() {
    const addToBag = document.querySelectorAll('.product .card .footer .bag-button');
    addToBag.forEach(eachBagBtn => eachBagBtn.addEventListener('click', eachBagBtnClick));
}

function cartModalToggle() {
    cartBackground.classList.toggle('d-none');
}

async function onCartClick(event) {
    await fetchCart();

    addRemoveEventHandler();
    cartModalToggle();
}

async function fetchCart() {
    const cartBody = document.querySelector('.cart-container .cart-body');
    const token = localStorage.getItem('token');
    const headers = {
        authorization: `Bearer ${token}`
    };

    const response = await fetch(`/api/product/cart`, { headers });
    const products = await response.json();

    let body = "";
    const allProduct = Array.from(products);
    if (allProduct.length > 0)
        allProduct.forEach(product => body += renderCart(product));
    else
        body = `<div class="no-cart"><h3>No item Added</h3><div>`;
    cartBody.innerHTML = body;

    const total = allProduct.reduce((prevProductValue, nextProductValue) => {
        const previousValue = prevProductValue.productPrice ? prevProductValue.productPrice : 0;
        return prevProductValue + nextProductValue.productPrice
    }, 0)

    setTotalItem(allProduct.length)
    setTotalAmount(total);
}

function eachBagBtnClick(event) {
    const currentCard = event.target.parentElement.parentElement.parentElement;
    let allCatagory = currentCard.querySelectorAll('.color-box .color');
    const activeIndex = Array.from(allCatagory).findIndex(catagory => catagory.classList.contains('active'))

    let productId = event.target.dataset.productid;
    let productPrice = +event.target.dataset.price;
    let productCatagory = allCatagory[activeIndex].dataset.catagory;

    const selectedProduct = { productId, productCatagory, productPrice };
    sendToBackend(selectedProduct);
}

function sendToBackend(product) {
    const token = localStorage.getItem('token');
    const headers = {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`
    };

    fetch("/api/product/cart", {
        method: 'POST',
        headers,
        body: JSON.stringify(product)
    }).then(response => {
        if (+response.status !== 201)
            return Promise.reject(response);
        counterValue();
        alert('Product added');
    }).catch(response => {
        if ((+response.status) === 403) {
            alert('Product already exists')
        }
    })
}

async function counterValue(reset) {
    if (reset != 0) {
        const token = localStorage.getItem('token');
        const headers = {
            authorization: `Bearer ${token}`
        };

        const response = await fetch(`/api/product/cart/count`, { headers });
        const countValue = await response.json();

        cartButton.dataset.counter = countValue.countCartProduct;
    } else {
        cartButton.dataset.counter = reset;
    }


}

function setTotalAmount(total) {
    const totalAmount = cartBackground.querySelector('.total-amount');
    totalAmount.innerHTML = total;
}

function setTotalItem(total) {
    const totalItem = cartBackground.querySelector('.total-items');
    totalItem.innerHTML = total;
}

function addRemoveEventHandler() {
    const allRemoveText = cartBackground.querySelectorAll('.product-remove');
    allRemoveText.forEach(removeText => {
        return removeText.addEventListener('click', onCartRemove);
    })

    const allPlusMinusCounter = cartBackground.querySelectorAll(".plus-counter, .minus-counter");
    allPlusMinusCounter.forEach(plusMinusCounter => plusMinusCounter.addEventListener('click', counterChange));
}

function onCartRemove(event) {
    const cartId = event.target.dataset.cartid;
    const token = localStorage.getItem('token');
    const headers = {
        authorization: `Bearer ${token}`
    };

    fetch(`/api/product/cart/${cartId}`, { method: "delete", headers }).then(
        (response) => { fetchCart(); counterValue() })
}

function renderCart(products) {
    const findProduct = allProduct.find(product => products.productId === product._id);
    const findProductCatagory = findProduct.category.find(
        category => category.name === products.productCatagory);

    return `
    <div class="each-item">
        <div class="cart-img">
            <img src="${findProductCatagory.thumbnail}"
                alt="img" class="cart-pic">
        </div>

        <div class="cart-details">
            <h3 class="title">${findProduct.title}</h3>
            <p class="description">${findProduct.description.split("|")[0]}</p>
        </div>

        <div class="cart-price">
            <h3>&#8377; ${products.productPrice}</h3>
            <p class="product-remove" data-cartid=${products._id}>Remove</p>
        </div>
    </div>`;

}