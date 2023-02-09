const productSection = document.querySelector('.product');
window.addEventListener('load', onload);

const allProduct = [];

async function onload(event) {
    const response = await fetch(`/api/product`).catch(err => console.error(err));
    const products = await response.json();
    allProduct.push(...Array.from(products));
    renderProduct(allProduct);
    counterValue(); // method define in handlercart.js   
}

function renderProduct(products) {
    productSection.innerHTML = "";
    
    products.forEach(product => {
        const card = cardCreation(product);
        productSection.innerHTML += card;
    });

    const allCatagory = document.querySelectorAll('.product .card .color-box .color');
    allCatagory.forEach(catagory => {
        catagory.addEventListener('click', () => {
            allCatagory.forEach(catagory => catagory.classList.remove('active'))
            catagory.classList.add('active');

            const card = catagory.parentElement.parentElement.parentElement;
            const thumbnail = card.querySelector('.thumbnail');
            thumbnail.src = catagory.dataset.thumbnail
        })
    })

    addEventHandler(); // method define in handlercart.js
}

function cardCreation(product) {

    return `<div class="card">
    <div class="rating"><p>5 &#9733;</p></div>
    <div class="header">
        <img class="thumbnail"
            src="${product.category[0].thumbnail}" alt="img">
    </div>

    <div class="body">
        <h2 class="title">${product.title}</h2>
        <p>${product.description}</p>
        <div class="color-box">
            ${Array.from(product.category).map((category, index) => {
        return `<div class="color ${index == 0 ? 'active' : ''}" style="background-color: ${category.name};" data-thumbnail = ${category.thumbnail} data-catagory= ${category.name}></div>`
    }).join("")}
        </div>
    </div>

    <div class="footer">
        <div class="left">
            <h3 class="price">&#8377; ${product.price.list_price}</h3>
            <h3 class="mrp">&#8377; ${product.price.mrp}</h3>
        </div>
        <div class="right">
            <button class="bag-button" data-productid=${product._id} data-price=${product.price.list_price}>Add to Bag</button>
        </div>
    </div>
</div>`;
}
