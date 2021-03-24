
const create = require("../models/create")


// Create new list
exports.createList= function(req, res){
   let listName = req.body.listName;
   const list = create(listName);
  res.redirect(list.url);
}

