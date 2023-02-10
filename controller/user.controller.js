const dbConnect = require('../config/dbconfig')
const jwt = require('../config/jwtHelper');
const { ObjectId } = require('mongodb');

const USER_COLLECTION = 'users';

exports.signup = async (request, response) => {
    const userData = request.body;
    try {
        const userCollection = await dbConnect(USER_COLLECTION);
        await userCollection.insertOne(userData);

        return response.status(201).send();
    } catch (error) {
        console.error(err);
        response.status(500).send();
    }
}

exports.login = async (request, response) => {
    const { email, password } = request.body;

    try {
        const userCollection = await dbConnect(USER_COLLECTION);
        const user = await userCollection.findOne({ email, password });

        if (!user)
            return response.status(401).json({ 'message': 'Unauthorized Access' })

        const payload = {
            userId: user._id,
            userName: user.name
        };
        const token = jwt.createToken(payload);
        await userCollection.updateOne({ "_id": new ObjectId(user._id) }, { "$set": { token } })

        return response.json({ token });

    } catch (error) {
        console.error(error);
        response.status(500).send();
    }
}

exports.logout = async (request, response) => {
    const userId = request.userId;

    try {
        const userCollection = await dbConnect(USER_COLLECTION);
        await userCollection.updateOne({ "_id": new ObjectId(userId) }, { "$set": { "token": null } })

        return response.send();
    } catch (error) {
        console.error(error);
        response.status(500).send();
    }

}

exports.checkEmail = async (request, response) => {
    const { email } = request.body;
    try {
        const userCollection = await dbConnect(USER_COLLECTION);
        const user = await userCollection.findOne({ "email": email });
        
        if (user) {
            return response.json({ userId: user._id });
        } else {
            return response.status(404).send("Email not exists");
        }
    } catch (error) {
        console.error(error);
        return response.status(500).send();
    }
}

exports.forgotPassword = async (request, response) => {
    const { password, userId } = request.body;

    try {
        const userCollection = await dbConnect(USER_COLLECTION);
        await userCollection.updateOne({ "_id": new ObjectId(userId) }, { "$set": { password } });
        return response.send();
    } catch (error) {
        console.error(error);
        return response.status(500).send();
    }
}