

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
listNameInput.oninput = () => {updateListName(listNameInput.textContent)}; //oninput works for contenteditable
function updateListName(input){
   const url = window.location.href;
   axios.put(url,{listName:input})
}

/*add item*/
const itemInput = document.querySelector(".list-item-input");
itemInput.addEventListener("keyup",(event) =>{
   if(event.keyCode === 13){
      addItem(itemInput.value); //onchange works for input but not contenteditable
      itemInput.value = "";
   };
   }) 

async function addItem(input){
   const url = window.location.href;
   if(input !== ""){
      await axios.post(url,{itemName:input});
   }
}