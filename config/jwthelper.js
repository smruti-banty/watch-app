const jwt = require('jsonwebtoken');
const dbConnect = require('./dbconfig')
const { ObjectId } = require('mongodb');
const USER_COLLECTION = 'users';

const secret_key = "f77b5591de6e3c504132f7bd51d9bca128a9746613100a38668cc7b940406d6aaff1da9c7bb92d7e65c70ce043ea2afc"

module.exports.createToken = (payload) => {
    return jwt.sign(payload, secret_key, {
        algorithm: 'HS256'
    })
}

module.exports.verify = async (req, res, next) => {
    let token;
    if ('authorization' in req.headers) {
        token = req.headers['authorization'].split(' ')[1];
    }

    if (!token) {
        return res.status(400).json({ 'message': 'No token Provided' })
    } else {
        jwt.verify(token, secret_key, async (err, payload) => {
            if (err) {
                console.error(err);
                return res.status(401).json({ 'message': 'Unauthorized Access' })
            }
            else {
                const userCollection = await dbConnect(USER_COLLECTION);
                const user = await userCollection.findOne({ '_id': new ObjectId(payload.userId), token });

                if (user) {
                    req.userId = payload.userId;
                    req.userName = payload.userName;
                    next();
                } else {
                    return res.status(401).json({ 'message': 'Unauthorized Access' })
                }
            }
        })
    }
}