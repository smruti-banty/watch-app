# Dev Guide #
- This is a simple webapplication which based on 3 tier architecture.
- In frontend we use HTML, CSS and JS. 
- In backend we use node js with express js.
- And for database we are using mongodb.

### Backend Overview ###
- In backend we use four js library.
- express, jsonwebtoken, mongodb, nodemon.  
- We use express because it gives functionality to easily buid our app in MVC model.
- jsonwebtoken are used to provide token based authorization.
- mongodb are used to provide support for connecting and performing database operation in between node and mongodb server.
- nodemon are used to provide live reloading of our node app.

### Backend control flow ###
- The first file which is run called app.js which under the root directory of our project.
- To handle json data we use middleware express.json().
- To handle static resorces we use *public* folder
- We take the default port as 3200.
- There are mainly 2 routes are there.
- One is to serve static page.
- Another one is handle backend api.
- To call any api we have to routes through '/api'.

### All api ###
- Every details about api you can find inside routes.js file.
- There are 2 main api(controller) are there.
- User api(controller) and Product api(controller);
- User api handles login, logout and signup functionality.
- Product api handles every things regarding product.

### About config folder ###
- There are 2 file inside config folder.
- dbconfig.js, jwthelper.js
- dbconfig.js file used to centerlized the database connection.
- jwthelper.js file provide jwt related functionality like create and verify token.

### Home page ###
- When user enter the base url the first and only one page that show user every time is index.html.
- This file is the part of public folder
- As i developed the application in SPA(Single Page Application) model.
- So there is only one html file available in our app.

### CSS Overview ###
- To make our code clean we use mulitple external css files.
- All css file are available inside `public/css` directory.
- Main.css provide all basic styling for our app.
- It also provide styling for our header section.
- utility.css used to place our common styling classes.
- product.section.css provide all the styling for production section.
- It also provide styling to view our front page of each product card.
- cardflip.css contains all styling for review and rating which is backside of our each product card.
- cart.css are used design the cart modal as well as all cart design functionalities.
- search.css provide all styling for search box.
- loginsignup.css provide styling for login and signup modal.
- It also provide styling for both login and signup sections.

### JS Overview ###
- To make our code clean we use mulitple external js files.
- All js file are available inside `public/js` directory.
- itemload.js file contains logic to check whether user is already login or not.
- It also renders all the product using multiple cards.
- loginsignup.js file provide all the logic for authentication and authorization.
- It also provide logic to logout from system.
- handlecart.js provide logic to manage our cart feature.
- It contains logic to render all cart, to count all cart and add or remove cart.
- handlesearch.js file contains logic to handle search functionality.
- For faster searching we store our data in a array and show it according to user input.
- handlerating.js is used to handle all rating and review related stuff.
- It contains logic to add a review, render all review etc.

`Thank you`
