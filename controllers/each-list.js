
const {create, findList, updateListName} = require("../models/list");


// Create new list
exports.createList= function(req, res){
   let listName = req.body.listName;
   const list = create(listName);
  res.redirect(list.url);
}

exports.renderListName = function(req,res){
  const id = req.params.id;
  findList(id)
  .then(list => res.render("../views/pages/each-list-page",{list_name: list.listName}))
  .catch(err => console.log(err))
  
}

exports.updateListName = function(req,res){
  const id = req.params.id;
  const updatedName = req.body.listName;
  updateListName(id,updatedName)
  .then(list => res.render("../views/pages/each-list-page",{list_name: list.listName}))
  .catch(err => console.log(err))
}