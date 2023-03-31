const mongoose = require('mongoose');
const connectDB = async ()=> {
    try {
        const con = await mongoose.connect("mongodb+srv://mailonggt2020:long2992003@cluster0.yalbov1.mongodb.net/users?retryWrites=true&w=majority")
        console.log(`MongoDB connected:${con.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}
module.exports=connectDB