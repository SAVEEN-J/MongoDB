// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient ;
// const config =require('./utils/config')
// const ObjectId = mongodb.ObjectId;
const mongoose = require('mongoose');
const config =require('./utils/config')
const {log,error} = require('./utils/logger')


// let database; 
// async function getDatabase(params) {

//     const client =await MongoClient.connect(config.MONGODB_URI)
//     database =client.db('library');
//     if (!database) {
//         console.log("Database not connected");
        
//     }
//      return database;
// }

async function getDatabase(params) {
    mongoose.set('strictQuery', false);

    mongoose.connect(config.MONGODB_URI)
.then(()=>{
    log("Connected to Mongo DB");
  })
.catch((err)=>{
    log("Error connecting to MongoDB", error);
});
    
}
module.exports={
    getDatabase
    // ObjectId
}