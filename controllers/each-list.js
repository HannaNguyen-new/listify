const express = require("express");
const router = express.Router();
const createList = require("../models/create-list")



router.post("/",  function(req, res){
   let listName = req.body.listName;
   createList(listName);
   res.render("pages/each-list-page.ejs");
})

module.exports = router;