
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
  export function create(userInput){
      const newList = new ListCollection();
      newList.listName = userInput;
      newList.save()
      return newList;
  } 

 export  function findList(id){
  return  ListCollection.findById(id)
  }

 export function findAndUpdateListName(id,updatedName){
   return  ListCollection.findByIdAndUpdate(id,{listName:updatedName},{new:true})
  }

export async function findAndAddItem(id,name,quantity){
   const list = await findList(id)
   .then(list => {
      if(list.itemArray.length < 1){
         list.itemArray.push({itemName: name, itemQuantity:quantity});
         list.save(); //subdocs are only saved when you execute save() on parent docs
      }else{
         for(let item in list.itemArray){
            if(item.itemName !== name){
                  list.itemArray.push({itemName: name, itemQuantity:quantity});
                  list.save(); //subdocs are only saved when you execute save() on parent docs
               }else{
                  itemQuantity++;
               }
      }
   }
      return list;
   })
   .catch(err => console.log(err))
}

export function findAndUpdate(id,arr){
   findList(id)
   
}


