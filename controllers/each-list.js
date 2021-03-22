
const createList = require("../models/create-list")



exports.createList= function(req, res){
   let listName = req.body.listName;
   createList(listName);
   res.render("pages/each-list-page.ejs");
}

