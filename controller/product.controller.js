const { MongoClient, ObjectId } = require('mongodb');
const dbConnect = require('../config/dbconfig')

const PRODUCT_COLLECTION = 'product';
const CART_COLLECTION = 'cart';
const ORDER_COLLECTION = 'order';
const RATING_COLLECTION = 'rating';

exports.getAllProduct = async (request, response) => {
    try {
        const collection = await dbConnect(PRODUCT_COLLECTION);
        const list = await collection.find().toArray();

        return response.json(list)
    } catch (err) {
        console.error(err);
        response.status(500).send();
    }

}

exports.addToCart = async (request, response) => {
    const body = request.body;
    body.userId = request.userId;

    const { productId, productCatagory, userId } = body;

    try {
        const collection = await dbConnect(CART_COLLECTION);
        const list = await collection.find({ productId, productCatagory, userId }).limit(1).toArray();

        if (list.length == 0) {
            await collection.insertOne(body)
            return response.status(201).send();
        }

        return response.status(403).send();
    } catch (err) {
        console.error(err);
        response.status(500).send();
    }
}

exports.totalCartProduct = async (request, response) => {
    const userId = request.userId;
    try {
        const collection = await dbConnect(CART_COLLECTION);
        const countCartProduct = await collection.countDocuments({ userId });

        return response.json({ countCartProduct })
    } catch (err) {
        console.error(err);
        response.status(500).send();
    }
}

exports.allCartList = async (request, response) => {
    const userId = request.userId;

    try {
        const collection = await dbConnect(CART_COLLECTION);
        const list = await collection.find({ userId }).toArray();

        return response.json(list)
    } catch (err) {
        console.error(err);
        response.status(500).send();
    }
}

exports.deleteCart = async (request, response) => {
    const { cartId } = request.params;
    const userId = request.userId;

    try {
        const collection = await dbConnect(CART_COLLECTION);
        collection.deleteOne({ _id: new ObjectId(cartId), userId }).then(resp => {
            return response.status(202).send();
        }).catch(err => response.status(500).send());
    } catch (err) {
        console.error(err);
        response.status(500).send();
    }
}

exports.removeAllCart = async (request, response) => {
    const userId = request.userId;

    try {
        const collection = await dbConnect(CART_COLLECTION);
        collection.deleteMany({ userId }).then(resp => {
            return response.status(202).send();
        }).catch(err => response.status(500).send());
    } catch (err) {
        console.error(err);
        response.status(500).send();
    }
}

exports.checkout = async (request, response) => {
    const userId = request.userId;

    try {
        const cartCollection = await dbConnect(CART_COLLECTION);
        const cartDocument = await cartCollection.find({ userId }).toArray()

        const orderCollection = await dbConnect(ORDER_COLLECTION);
        await orderCollection.insertMany(cartDocument);

        await cartCollection.deleteMany({ userId });

        return response.send();

    } catch (err) {
        console.error(err);
        response.status(500).send();
    }
}

exports.addRating = async (request, response) => {
    const userId = request.userId;
    const userName = request.userName;
    const product = request.body;
    product.userId = userId;
    product.userName = userName;
    const { productId, category } = product;

    try {
        const collection = await dbConnect(RATING_COLLECTION);
        await collection.insertOne(product);

        return response.status(201).json({ productId, category });
    } catch (error) {
        console.error(error);
        return response.status(500).send();
    }
}

exports.retriveRating = async (request, response) => {
    const { productId, category } = request.params;

    try {
        const collection = await dbConnect(RATING_COLLECTION);
        const ratings = await collection.find({ productId, category }).toArray();

        return response.json(ratings);
    } catch (error) {
        console.error(error);
        response.status(500).send();
    }
}