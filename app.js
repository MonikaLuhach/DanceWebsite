const express = require ("express");
const path = require("path");
var mongoose = require('mongoose');
const bodyparser = require("body-parser");

mongoose.connect('mongodb://127.0.0.1:27017/ContactDance',{ useUnifiedTopology:true,});

const app = express();
const port = 80
// add mongoose in js
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
  var Contact = mongoose.model('Ravi', contactSchema);

app.use('/static', express.static('static'))
app.use(express.urlencoded());

app.set('view engine','pug');
app.set('views' ,path.join(__dirname,'views')); 

app.get('/',(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params)
})
app.get('/contact',(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params)
})

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body)
    myData.save().then(()=>{
    res.send("This item has been saved to the database")
    prompt("Your form is submitted successful")
    }).catch(()=>{
    res.status(400).send("item was not saved to the databse")
})
// res.status(200).render('contact.pug',params)
});

app.listen(port,()=>{
    console.log(`The application is started successfully on port ${port}`);
});

// let submitbutton = document.getElementById('button');