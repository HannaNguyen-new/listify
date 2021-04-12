import {findAllLists} from '../models/list.js';

export const renderLists = async function(req,res){
await findAllLists()
.then(result => res.render("../views/pages/all-lists-page",{lists: result}))
.catch(err => console.log(err))
}