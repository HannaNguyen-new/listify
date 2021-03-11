const express = require('express');
const path = require('path');


const app = express();

app.use(express.static("public"));
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,"first-page.html"))
})





app.listen(process.env.PORT || 3000,() => {
    console.log("Server started on port 3000")
})