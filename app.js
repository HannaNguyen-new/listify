// Require modules
import express from "express";
import path from "path";
import {fileURLToPath} from "url";
import dotenv from "dotenv";
dotenv.config();
// Require routes
import router from "./routes/router.js";
import allListsRouter from "./routes/allListRouter.js";

// Connect with database
import mongoose from "mongoose";
//const url = "mongodb://localhost:27017/listifyDB";
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser:true, useUnifiedTopology:true})
.then(success => console.log("Connected to database"))
.catch(err => console.log(err))


const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use("/each-list", router);
app.use("/all-lists", allListsRouter)
app.set('view engine',"ejs");
app.set('views',"./views/pages"); // render path will be shorter

app.get("/", function(req, res){
    res.render("first-page")
})




app.listen(process.env.PORT || 3000,() => {
    console.log("Server started on port")
})
