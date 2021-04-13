import {findAllLists,findAndDeleteList} from '../models/list.js';

export const renderLists = async function(req,res){
await findAllLists()
.then(result => res.render("../views/pages/all-lists-page",{lists: result}))
.catch(err => console.log(err))
}

export const deleteList = async function(req, res){
const id = req.params.id;
await findAndDeleteList(id)
}