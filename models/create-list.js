
   const mongoose = require("mongoose");
   const url = "mongodb://localhost:27017/listifyDB";
   mongoose.connect(url,{useNewUrlParser:true, useUnifiedTopology:true})
   .then(success => console.log("Connected to database"))
   .catch(err => console.log(err))

   const listSchema = new mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      itemName : {type: String, lowercase:true, required: true},
      itemQuantity : Number,
      unitPrice : Number,
      totalPrice : Number,
      memo : String
   })
   function createList(listName){
   const newList =  mongoose.model(listName, listSchema);

   const first = new newList({_id: new mongoose.Types.ObjectId,itemName:"ice", itemQuantity:1});
      first.save()
      .then(result => console.log("success"))
      .catch(err => console.log(err)) 

} 

module.exports =  createList;