
import {create, findList, findAndUpdateListName,findAndAddItem} from "../models/list.js";


// Create new list
export const createList= function(req, res){
   let listName = req.body.listName;
   const list = create(listName);
  res.redirect(list.url);
}

export const renderListName = function(req,res){
  const id = req.params.id;
  findList(id)
  .then(result => res.render("../views/pages/each-list-page",{list_name: result.listName}))
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
  const id = req.params.id;
  const item_name = req.body.itemName;
  const item_quantity = 1;
  findAndAddItem(id, item_name, item_quantity)
  .then(arr => res.render("../views/pages/each-list-page",{itemArr: arr}))
  .catch(err => console.log(err))
}

