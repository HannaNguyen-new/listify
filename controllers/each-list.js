
import {create, findList, findAndUpdateListName} from "../models/list.js";


// Create new list
export const createList= function(req, res){
   let listName = req.body.listName;
   const list = create(listName);
  res.redirect(list.url);
}

export const renderListName = function(req,res){
  const id = req.params.id;
  findList(id)
  .then(list => res.render("../views/pages/each-list-page",{list_name: list.listName}))
  .catch(err => console.log(err))
  
}

export const updateListName = function(req,res){
  const id = req.params.id;
  const updatedName = req.body.listName;
  findAndUpdateListName(id,updatedName)
  .then(result => res.render("../views/pages/each-list-page",{list_name: result.listName}))
  .catch(err => console.log(err))
}

export const addItem = function(req,res){
  const itemName = req.body.itemName;
  const itemQuantity = 1;
  addItem(itemName,itemQuantity)
}

