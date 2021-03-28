// Require modules
import express from "express";
import path from "path";
import {fileURLToPath} from "url";

// Require routes
import {router} from "./routes/router.js";

// Connect with database
import mongoose from "mongoose";
const url = "mongodb://localhost:27017/listifyDB";
mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true})
.then(success => console.log("Connected to database"))
.catch(err => console.log(err))


const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/each-list", router)
app.set('view engine',"ejs")

app.get("/", function(req, res){
    res.render("pages/first-page.ejs")
})






app.listen(process.env.PORT || 3000,() => {
    console.log("Server started on port")
})