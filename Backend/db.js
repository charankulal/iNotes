const mongoose = require("mongoose");


const mongoURI =
  "mongodb://127.0.0.1/test";

const connectToMongo = () => {
  
  mongoose.connect(mongoURI,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
  }

module.exports = connectToMongo;
