
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

   function create(userInput){
   const newList =  mongoose.model(userInput, listSchema);

} 

module.exports =  create;