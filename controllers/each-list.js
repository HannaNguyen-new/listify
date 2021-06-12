
import {create, findList, findAndUpdateListName,findAndAddItem,updateItem,deleteItem} from "../models/list.js";


// Create new list
export const createList = async function(req, res){
   let listName = req.body.listName;
   const list = await create(listName)
   .then(list => res.redirect(list.url))
   .catch(err => console.log(err))
}

// render both list name and items
export const renderAll = async function(req,res){
  const id = req.params.id;
  await findList(id)
   .then(result => res.render("each-list-page",
   {list_name: result.listName, itemArr: result.itemArray, 
    sum: result.sumToBuy, purchased: result.sumPurchased}))
   .catch(err => console.log(err))
}
// update list name
export const updateListName = async function(req,res){
  const id = req.params.id;
  const updatedName = req.body.listName;
  await findAndUpdateListName(id,updatedName)
  .then(result => res.render("each-list-page",{list_name: result.listName,itemArr:[],
  sum: 0, purchased: 0}))
  .catch(err => console.log(err))
}
// add new item
export const addItem = async function(req,res){
  const id = req.params.id;
  const item_name = req.body.itemName.toLowerCase();
  const item_quantity = 1;
  const unit_price = 0;
 await findAndAddItem(id, item_name, item_quantity,unit_price)
  .then(result => res.send(result))
  .catch(err => console.log(err)) 
}
// update item properties

export const update = async function(req,res){
  const id = req.params.id;
  const itemId = req.params.itemid;
  const key = Object.keys(req.body)[0];
  const value = req.body[key];
  await updateItem(id, itemId, key, value)
  .then(result => res.json(result))
  .catch(err => console.log(err))  
}

// delete item
export const  del = async function(req,res){
  const id = req.params.id;
  const itemId = req.params.itemid;
  await deleteItem(id,itemId)
  .then(result => res.send("delete successfully"))
  .catch(err => console.log(err))
}


