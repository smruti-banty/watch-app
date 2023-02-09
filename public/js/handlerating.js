function addReviewEvent() {
    const allReviewStar = document.querySelectorAll('.product .card-container .card-2 .footer .form-group .rate-star p');
    allReviewStar.forEach(star => star.addEventListener('click', onRating));

    const allSubmitBtn = document.querySelectorAll('.product .card-container .card-2 .footer .submit-btn button');
    allSubmitBtn.forEach(button => button.addEventListener('click', onSubmitReview));

    const allRatings = document.querySelectorAll('.product .card-container .card-1 .rating');
    allRatings.forEach(rating => rating.addEventListener('click', onRatingClick));

    const rotateCrosses = document.querySelectorAll('.product .card-container .card-2 .cross');
    rotateCrosses.forEach(rotateCross =>
        rotateCross.addEventListener('click', event => {
            const cards = event.target.closest('.cards');
            rotateCard(cards)
        }));
}

function rotateCard(currentCards) {
    currentCards.classList.toggle('rotate-card');
}

function onSubmitReview(event) {
    const cards = event.target.closest('.cards');
    const description = event.target.parentElement.parentElement.querySelector('textarea');
    const data = event.target.dataset;
    const productReview = {
        productId: data.productid,
        rating: +data.value,
        category: data.category,
        description: description.value
    }

    const token = localStorage.getItem('token');
    const headers = {
        'Content-type': 'application/json',
        authorization: `Bearer ${token}`
    }

    fetch(`/api/product/rating`, { method: 'POST', headers, body: JSON.stringify(productReview) })
        .then((response) => response.json())
        .then((review) => {
            fetchRatings(review.productId, review.category, cards);
            alert('Review added')
        }).catch(error => console.error(error))
}

async function onRatingClick(event) {
    const cards = event.target.closest('.cards');
    rotateCard(cards);
    const submitBtn = cards.querySelector('.card-2 .submit-btn button');
    const { productid, category } = submitBtn.dataset;

    fetchRatings(productid, category, cards);
}

async function fetchRatings(productId, category, currentCards) {
    const response = await fetch(`/api/product/rating/${productId}/${category}`).catch(err => console.error(err));
    const card2Body = currentCards.querySelector('.card-2 .body');
    const reviews = Array.from(await response.json());
    card2Body.innerHTML = '';
    reviews.forEach(review => {
        card2Body.innerHTML += renderReview(review);
    });

    if (reviews.length == 0) {
        card2Body.innerHTML = `<div><h2>No reviews yet</h2></div>`;
    }

}

function onRating(event) {
    const { value } = event.target.dataset;
    const allReviewStar = event.target.parentElement.querySelectorAll('p');

    for (let i = 0; i < 5; i++) {
        if (i < +value) {
            allReviewStar[i].innerHTML = "&#9733";
        } else {
            allReviewStar[i].innerHTML = "&#9734";
        }
    }

    const reviewSubmitBtn = event.target.parentElement.parentElement.parentElement.querySelector('button');
    reviewSubmitBtn.dataset.value = value;
}

function renderReview(review) {
    let star = '';
    for (let i = 0; i < 5; i++) {
        if (i < review.rating) {
            star += ' &#9733;';
        } else {
            star += ' &#9734;'
        }
    }

    return `
    <div class="review">
        <div class="name-review">
            <h4>${review.userName.split(" ")[0]}</h4>
            <p class="star">
                ${star}
            </p>
        </div>
        <div class="description">
            <p>${review.description}</p>
        </div>
    </div>`;
}