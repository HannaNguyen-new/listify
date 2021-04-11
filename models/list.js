
   import mongoose from "mongoose";
   const itemSchema = new mongoose.Schema({
      itemName : {type: String, lowercase:true},
      itemQuantity : {type:Number, min:0},
      unitPrice : {type:Number, min:0},
      totalPrice : {
         type : Number,
         get : function() {return this.itemQuantity * this.unitPrice}
      },
      note : String,
      checked : {type: Boolean, default: false}
   })
   const listSchema = new mongoose.Schema({
      listName :  String,
      itemArray : [itemSchema]
   })
   listSchema
   .virtual("url")
   .get(function (){
      return "/each-list/" + this._id
   })

   listSchema
   .virtual("sumToBuy")
   .get(function(){
      return this.itemArray.reduce((acc,curr) => acc + curr.totalPrice, 0)
   })

   const ListCollection =  mongoose.model("test", listSchema);
  export async function create(userInput){
      const newList = new ListCollection();
      newList.listName = userInput;
     await newList.save()
      return newList;
  } 

 export async function findList(id){
  return  ListCollection.findById(id)
  }

 export function findAndUpdateListName(id,updatedName){
    return  ListCollection.findByIdAndUpdate(id,{listName:updatedName},{new:true})
}

export async function findAndAddItem(id,name,quantity, price){
   const list = await findList(id)
   .then(list => {
      if(list.itemArray.length < 1){
         list.itemArray.push({itemName: name, itemQuantity:quantity, unitPrice: price});
         list.save(); //subdocs are only saved when you execute save() on parent docs
      }else{
         const foundItem = list.itemArray.find(item => item.itemName === name)
              if(foundItem == undefined){
                  list.itemArray.push({itemName: name, itemQuantity:quantity, unitPrice: price});
                  list.save(); //subdocs are only saved when you execute save() on parent docs
               }else{
                  foundItem.itemQuantity++;
                  list.save(); //subdocs are only saved when you execute save() on parent docs
               }  
         } 
      return list;
   })
   .catch(err => console.log(err))
   return list;
}


export async function updateItem(id,itemId, key, value){
   const list = await findList(id)
   const item = await list.itemArray.id(itemId);
   if(key === "itemQuantity" || key === "unitPrice"){
      item[key] = Number(value);
   }else{
      item[key] = value;
      console.log(value)
   }
   await list.save();
   return item;
}

export async function deleteItem(id,itemId){
   const list = await findList(id);
   await list.itemArray.id(itemId).remove();
   await list.save();
   return list

}


