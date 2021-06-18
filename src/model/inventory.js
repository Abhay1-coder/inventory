const mongoose = require("mongoose");

const bookschema =  {
    title: String,
    author: String
}

const userschema = {
    email: String,
    password: String
}


const Book = mongoose.model("Book", bookschema);
const User = mongoose.model("User", userschema);


module.exports ={
    Book:Book,
    User:User
};