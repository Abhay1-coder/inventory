const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

require("/src/db/conn");
const inventory = require("/src/model/inventory");

////request tragetting all books

app.route("/books")
.get(function(req,res){
    inventory.Book.find({},function(err,foundBook){
        if(!err){
            res.send(foundBook);
        }else{
            res.send(err);
        }
    })

})

.post(function(req, res){
    const newBook = new inventory.Book({
        title: req.body.title,
        author: req.body.authorName
    });
    newBook.save(function(err){
        if(!err){
            res.send("sucessfully added a new book.");
        }else{
            res.send(err);
        }
    });
    
    
})
app.route("/register")
.get(function(req,res){
    inventory.User.find({},function(err,foundUser){
        if(!err){
            res.send(foundUser);
        }else{
            res.send(err);
        }
    })
})
.post(function(req, res){
    const newUser = new inventory.User({
        email: req.body.email,
        password: req.body.password
    });
    newUser.save(function(err){
        if(!err){
            res.send("sucessfully added a new user.");
        }else{
            res.send(err);
        }
    });
})
// login check
app.post("/login", async(req, res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        // check user input match with database
       const userEmail= await inventory.User.findOne({email:email});
       
        //check for password
        if(userEmail.password === password){
            res.status(201).send("login sucess");
        }else{
            res.send("password are not matching");
        }
    }catch(error){
        res.status(400).send("invalid");
    }
})


.delete(function(req, res){
    inventory.Book.deleteMany({}, function(err){
        if(!err){
            res.send("sucessfully deleted all book");
        }else{
            res.send(err);
        }
    });
});

app.route("/books/:bookTitle")
.get(function(req , res){


    inventory.Book.findOne({title:req.params.bookTitle}, function(err, foundBook){
        if(foundBook){
            res.send(foundBook);
        }else{
            res.send("No books matchig tittle");
        }
    })

})

.put(function(req , res){
    inventory.Book.update(
        {title:req.params.bookTitle},
        {tittle: req.body.tittle, author:req.body.authorName},
        {overwrite: true},
        function(err){
            if(!err){
                res.send("sucessfully updated book.")
            }
        }
    )
})

.patch(function(req , res){
    inventory.Book.update(
        {title: req.params.bookTitle},
        {$set:req.body},
        function(err){
            if(!err){
                res.send("sucessfully updated book")
            }else{
                res.send(err);
            }
        }
    )
})

.delete(function(req, res){
    inventory.Book.deleteOne(
        {title: req.body.bookTitle},
        function(err){
            if(!err){
                res.send("sucessfully deleted selected  book");
            }else{
                res.send(err);
            }
        }
    );
});

app.listen(3000, function(){
    console.log("server is running on localhost port 3000");
});