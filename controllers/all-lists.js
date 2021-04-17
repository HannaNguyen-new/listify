import {findAllLists,findAndDeleteList,duplicate} from '../models/list.js';

export const renderLists = async function(req,res){
await findAllLists()
.then(result => res.render("all-lists-page",{lists: result}))
.catch(err => console.log(err))
}

export const deleteList = async function(req, res){
const id = req.params.id;
await findAndDeleteList(id)
}

export const duplicateList = async function(req,res,next){
   const id = req.params.id;
   await duplicate(id);

}