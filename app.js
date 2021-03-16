const express = require('express');
const eachList = require("./controllers/each-list.js")


const app = express();

app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/each-list", eachList)
app.set('view engine',"ejs")

app.get("/", function(req, res){
    res.render("pages/first-page.ejs")
})





app.listen(process.env.PORT || 3000,() => {
    console.log("Server started on port 3000")
})