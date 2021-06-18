const mongoose = require("mongoose");

// connecting wirh db and ginvng db name
 mongoose.connect("mongodb://localhost:27017/inventory", {
     // ignore deprication warning
     useNewUrlParser: "true",
     useUnifiedTopology: "true",
     useCreateIndex: "true",
 }).then(() =>{// when connecton is sucess
    console.log('connection sucessfull');
 }).catch((e) =>{// if connection is not sucess, it will catch an error
    console.log('no connection');
 })// here connection of express with mongodb is done