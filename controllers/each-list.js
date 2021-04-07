
import {create, findList, findAndUpdateListName,findAndAddItem,updateItem} from "../models/list.js";


// Create new list
export const createList = async function(req, res){
   let listName = req.body.listName;
   const list = await create(listName)
   .then(list => res.redirect(list.url))
   .catch(err => console.log(err))
}
// render list name
export const renderListName = async function(req,res){
  const id = req.params.id;
 return await findList(id)
  .then(result =>  result.listName)
  .catch(err => console.log(err))
  
}
// render items
export const renderItem = async function(req,res){
  const id = req.params.id;
 return await findList(id)
  .then(result =>  result.itemArray)
  .catch(err => console.log(err))
}
// render both list name and items
export const renderAll = function(req,res){
  Promise.all( [renderListName(req,res),renderItem(req,res)])
   .then(results => res.render("../views/pages/each-list-page",{list_name: results[0],itemArr: results[1]}))
   .catch(err => console.log(err))
}
// update list name
export const updateListName = async function(req,res){
  const id = req.params.id;
  const updatedName = req.body.listName;
  await findAndUpdateListName(id,updatedName)
  .then(result => res.render("../views/pages/each-list-page",{list_name: result.listName}))
  .catch(err => console.log(err))
}
// add new item
export const addItem = async function(req,res){
  const id = req.params.id;
  const item_name = req.body.itemName.toLowerCase();
  const item_quantity = 1;
 await findAndAddItem(id, item_name, item_quantity)
  .then(result => res.json(result.url))
  .catch(err => console.log(err)) 
}
// update item properties

export const update = async function(req,res){
  const id = req.params.id;
  const itemId = req.params.itemid;
  const key = Object.keys(req.body)[0];
  const value = req.body[key];
  await updateItem(id, itemId, key, value)
  .then(result => res.json(result.url))
  .catch(err => console.log(err))  
}



