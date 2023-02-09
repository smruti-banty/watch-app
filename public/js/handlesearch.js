const searchBox = document.querySelector('header .search-box');
const searchIconBox = searchBox.querySelector('.search-icon');
const searchField = searchBox.querySelector('.search-field');

searchIconBox.addEventListener('click', onMouseOver);
searchField.addEventListener('input', onValueChange);

function onValueChange(event) {
    const { value } = event.target;

    if (value.trim().toLowerCase() !== '') {
        const filterProduct = allProduct.filter(product => product.title.toLowerCase().includes(value))
        renderProduct(filterProduct);
    } else {
        renderProduct(allProduct);
    }
}

function onMouseOver(event) {
    searchBox.classList.toggle('border-property');
    searchField.classList.toggle('d-none');
    if (!searchField.classList.contains('d-none'))
        searchField.querySelector('input').focus();
}
