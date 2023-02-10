# Watch App #
This is a basic e-commerse app having the following functionality.
- Login/ Sign up page.
- Product detail page for smart watches.
- Add/remove the product to the cart and checkout.
- Search and filters.
- Ratings and reviews.

### Setup Code Locally ###
- Download and install node 16 or above.
- Install mongodb 5 or abode.
- Create a database named as *ecommerse*.
- Create collections as followings
- users, product, cart, order, rating
- Add few product information inside product collection as mentioned below.

```json
{
  "title": "Color fit icon buzz",
  "description": "ANC | 40 hours Playtime",
  "category": [
    {
      "name": "black",
      "thumbnail": "https://cdn.shopify.com/s/files/1/0997/6284/products/Side02.png?v=1672316134"
    },
    {
      "name": "red",
      "thumbnail": "https://cdn.shopify.com/s/files/1/0997/6284/products/Untitled-13.png?v=1672316134"
    }
  ],
  "price": {
    "mrp": 4999,
    "list_price": 1749
  }
}
```

### Run Code Locally ###
- Inside project location enter following command
- For first time
```
npm i --save
```
- To run the project
```
npm start
```
- Then inside broswer enter the following url.
```
http://localhost:3200
```

`!!! Happy coding !!!`