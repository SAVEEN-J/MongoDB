const dotenv = require("dotenv").config();
const express = require('express');
const app = express();
const bodyparser=require('body-parser');
const exhbs= require('express-handlebars'); 
const dbo =require('./db');
const ObjectID_id =dbo.ObjectId;

const config = require('./utils/config')
const PORT_B = config.PORT || 5000;


app.engine('hbs',exhbs.engine({layoutsDir:'views/',defaultLayout:"main",extname:"hbs"}))
app.set('view engine','hbs');
app.set('views','views');
app.use(bodyparser.urlencoded({extended:true}))

app.get('/',async (req,res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    const cursor = collection.find({})
    let books = await cursor.toArray();

    let message ="";
    //edit
    let edit_id,edit_book;
if (req.query.edit_id) {
    edit_id = req.query.edit_id;
    // edit_book = await collection.findOne({_id:edit_id})
    edit_book = await collection.findOne({_id:new ObjectID_id(edit_id)})
  
}   
//delete
if (req.query.delete_id) {
    delete_id = req.query.delete_id;

  await collection.deleteOne({_id: new ObjectID_id(delete_id)});
  return res.redirect('/?status=3')
 
  
}   
    switch (req.query.status) {
        case "1":
            message = "Inserted Succesfully"
            break;
            case "2":
            message = "Update Succesfully"
            break;
            case "3":
                message = "Delete Succesfully"
                break;
        default:
            break;
    }

    res.render('main',{message,books,edit_id,edit_book})
})

//create
app.post('/store_book',async(req, res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    let book = {title:req.body.title , author:req.body.author}
    await collection.insertOne(book);
    return res.redirect('/?status=1')

})
//edit
app.post('/update_book/:edit_id',async(req, res)=>{
    let database = await dbo.getDatabase();
    const collection = database.collection('books');
    let book = {title:req.body.title , author:req.body.author}
    let edit_id = req.params.edit_id
    await collection.updateOne({_id:new ObjectID_id(edit_id)},{$set:book});
    return res.redirect('/?status=2')

})
//delete


app.listen(PORT_B,()=>{
    console.log(`server running on port ${PORT_B}`)
});