const { MongoClient } = require("mongodb");
const URI = `mongodb://127.0.0.1:27017/ecommerse`;
const mongClient = new MongoClient(URI);

async function dbConnect(collection) {
    await mongClient.connect()
    return mongClient.db().collection(collection);
}

module.exports = dbConnect;
