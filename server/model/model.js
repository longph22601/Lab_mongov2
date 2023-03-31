const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type : String,
        require:true
    },
    age: {
        type : String,
        require:true
    },
    room: {
        type : String,
        require:true
    },
})

const Userdb = mongoose.model('userdb',schema);
module.exports=Userdb;