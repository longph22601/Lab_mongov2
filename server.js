const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");

const path = require('path');
const axios = require('axios');
const ejs = require("ejs");

const controller = require('./server/controller/controller');
const connectDB = require('./server/database/connection');

const app = express();


dotenv.config({path:'config.env'})
const PORT = process.env.PORT ||8080
// log requ
app.use(morgan('tiny'));

connectDB();

app.use(bodyparser.urlencoded({extended:true}));

// view engine
app.set("view engine","ejs")
app.set("views",path.resolve(__dirname,"views"))

//load asset
app.use('/css',express.static(path.resolve(__dirname,"asset/css")))
app.use('/img',express.static(path.resolve(__dirname,"asset/img")))
app.use('/js',express.static(path.resolve(__dirname,"asset/js")))

app.post('/api/users',controller.create);
app.get('/api/users',controller.find);
app.put('/api/users/:id',controller.update);
app.delete('/api/users/:id',controller.delete);
//load router
// app.use('/',require('./server/router/router'));

app.get('/all-user',(req, res)=>{
    axios.get('http://localhost:8080/api/users')
    .then(function(response){
        res.render('index.ejs',{users:response.data});
        
    })
    .catch(err=>{
        res.send(err);
    })
   
})
app.get('/add-user',(req, res)=>{
    res.render('add_user.ejs')
})
app.get('/update-user',(req, res)=>{
    axios.get('http://localhost:8080/api/users',{params:{id:req.query.id}})
    .then(function(userdata){
        res.render('update_user',{user: userdata.data})
        console.log("check")
        console.log(userdata.data)
    })
    .catch(err=>{
        res.send(err);
    })
})

app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});