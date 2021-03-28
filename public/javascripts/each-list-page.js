import axios from "axios";
import { findAndUpdateListName } from "../../models/list";

/* each-list-page*/
function toggle (arr,attribute){
   arr.forEach(el => el.toggleAttribute(attribute))
}

const hide = document.querySelector(".hide");
const show = document.querySelector(".show");
const bottomContainer = document.querySelector(".bottom-container");
hide.addEventListener("click",()=>{
   toggle([bottomContainer,hide,show],"hidden")

})
show.addEventListener("click",()=>{
   toggle([bottomContainer,hide,show],"hidden")

})
/* update listname*/
const listNameInput = document.querySelector(".list-name-input");
listNameInput.oninput = () => {updateListName(listNameInput.textContent)};
function updateListName(input){
   const url = window.location.href;
   axios.put(url,{listName:input})
}

/*add item*/
const itemInput = document.querySelector(".list-item-input");
itemInput.oninput = () =>{addItem(itemInput.textContent)};
function addItem(input){
   const url = windows.location.href;
   axios.post(url,{itemName:input});
}