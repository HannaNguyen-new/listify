
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

   const newCollection =  mongoose.model("test", listSchema);
   function create(userInput){
      const newList = new newCollection();
      newList.listName = userInput;
      newList.save()
      return newList;
  } 

  function findList(id){
  return  newCollection.findById(id)
  }

  function findAndUpdateListName(id,updatedName){
   return  newCollection.findByIdAndUpdate(id,{listName:updatedName},{new:true})
  }
export {create,findList,findAndUpdateListName};
