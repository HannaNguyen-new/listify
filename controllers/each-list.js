const express = require("express");
const router = express.Router();
const createList = require("../models/create-list")

router.get("/",  function(req, res){
   let listName = req.body.listName;
   createList(listName);
   res.send("success");
})

module.exports = router;