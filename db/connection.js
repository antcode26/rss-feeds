const mongoose = require("mongoose")

const URI ="mongodb+srv://anant:anant@cluster0.1yaow.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async ()=>{
   await mongoose.connect(URI, { useUnifiedTopology:true,
    useNewUrlParser:true
});
   console.log('db connected..!')
}

module.exports = connectDB;