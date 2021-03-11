const express = require('express');
const path = require('path');


const app = express();

app.use(express.static("public"));
app.set('view engine',"ejs")
app.get("/", function(req, res){
    res.render("first-page.ejs")
})





app.listen(process.env.PORT || 3000,() => {
    console.log("Server started on port 3000")
})