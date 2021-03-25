import axios from "axios";

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

const listNameInput = document.querySelector(".listNameInput");
listNameInput.onchange = updateListName;
function updateListName(input){
   const url = "/each-list/:id";
   axios.put(url,{listName:input})
}