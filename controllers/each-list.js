const express = require("express");
const router = express.Router();
const createList = require("../models/create-list")



router.post("/",  function(req, res){
   let listName = req.body.listName;
   console.log(req.body);
   createList(listName);
   res.send("success");
})

module.exports = router;