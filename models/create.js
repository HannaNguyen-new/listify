
   const mongoose = require("mongoose");
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
   function create(userInput){
   const newCollection =  mongoose.model("test", listSchema);
   const newList = new newCollection();
   newList.listName = userInput;
   newList.save()
   return newList;

} 

module.exports =  create;