
const create = require("../models/create")



exports.createList= function(req, res){
   let listName = req.body.listName;
   create(listName);
   res.render("pages/each-list-page.ejs");
}

