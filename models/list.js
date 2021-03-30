
   import mongoose from "mongoose";
   const itemSchema = new mongoose.Schema({
      itemName : {type: String, lowercase:true, required: true},
      itemQuantity : Number,
      unitPrice : Number,
      totalPrice : Number,
      memo : String
   })
   const listSchema = new mongoose.Schema({
      listName : {type: String, required: true},
      itemArray : [itemSchema]
   })
   listSchema
   .virtual("url")
   .get(function (){
      return "/each-list/" + this._id
   })

   const ListCollection =  mongoose.model("test", listSchema);
  export async function create(userInput){
      const newList = new ListCollection();
      newList.listName = userInput;
      newList.save()
      return newList;
  } 

 export async function findList(id){
  return  ListCollection.findById(id)
  }

 export function findAndUpdateListName(id,updatedName){
   return  ListCollection.findByIdAndUpdate(id,{listName:updatedName},{new:true})
  }
export function findAndAddItem(id,name,quantity){
   return findList(id)
   .then(result => {
      result.itemArray.push({itemName: name, itemQuantity:quantity});
      result.save(); //subdocs are only saved when you execute save() on parent docs
      return result.itemArray;
   })
   .catch(err => console.log(err))
}


