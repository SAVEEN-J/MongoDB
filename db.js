const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient ;
const config =require('./utils/config')
const ObjectId = mongodb.ObjectId;

let database;
async function getDatabase(params) {
    const client =await MongoClient.connect(config.MONGODB_URI)
    database =client.db('library');
    if (!database) {
        console.log("Database not connected");
        
    }
     return database;
}
module.exports={
    getDatabase,
    ObjectId
}