const productSection = document.querySelector('.product');
window.addEventListener('load', onload);

const allProduct = [];

async function onload(event) {
    const response = await fetch(`/api/product`).catch(err => console.error(err));
    const products = await response.json();
    allProduct.push(...Array.from(products));
    checkToken();
    renderProduct(allProduct);
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

            const card = catagory.closest('.cards');
            const thumbnail = card.querySelector('.thumbnail');
            thumbnail.src = catagory.dataset.thumbnail;

            card.querySelectorAll(".color-box .color").forEach(catagory => catagory.classList.remove('active'));
            catagory.classList.add('active');

            const reviewSubmitBtn = document.querySelector('.product .card-container .card-2 .footer .submit-btn button')

            reviewSubmitBtn.dataset.catagory = catagory.catagory;
        })
    })

    addEventHandler(); // method define in handlercart.js
    addReviewEvent(); // method define in handlerating.js
}

function cardCreation(product) {

    return `<div class="card-container">
    <div class="cards">
        <div class="card card-1">
            <div class="rating"><p>&#9733;</p></div>
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
        </div>    
        <div class="card card-2">
            <div class="cross"><span>X<span></div>
            <div class="header">
                <h2>Rating &amp; Reviews</h2>
            </div>
            
            <div class="body"></div>
            
            <div class="footer">
                <h3>Add Review</h3>
                <div>
                    <div class="review">
                        <div class="form-group">
                            <label>Rating</label>
                            <div class="rate-star">
                                <p data-value="1">&#9734;</p>
                                <p data-value="2">&#9734;</p>
                                <p data-value="3">&#9734;</p>
                                <p data-value="4">&#9734;</p>
                                <p data-value="5">&#9734;</p>
                            </div>
                        </div>
                        <div class="form-group"> 
                            <label>Review</label>
                            <textarea row="2"></textarea>
                        </div>
                        <div class="submit-btn">
                            <button type="button" data-value="0" data-productid="${product._id}" data-category="${product.category[0].name}">Submit</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</div>`;
}
