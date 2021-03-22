// Require modules
const express = require("express");
// Require routes
const router = require("./routes/router");

// Connect with database
const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/listifyDB";
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true})
.then(success => console.log("Connected to database"))
.catch(err => console.log(err))


const app = express();

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/each-list", router)
app.set('view engine',"ejs")

app.get("/", function(req, res){
    res.render("pages/first-page.ejs")
})





app.listen(process.env.PORT || 3000,() => {
    console.log("Server started on port 3000")
})