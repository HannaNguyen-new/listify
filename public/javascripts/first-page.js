const createBtn = document.querySelector(".create-btn");
const overlay = document.querySelector(".overlay");
const listNameInput = document.querySelector(".list-name-input-container");
const createListBtn = document.querySelector(".createList-btn");

function toggle (arr,attribute){
   arr.forEach(el => el.toggleAttribute(attribute))
}

createBtn.addEventListener("click", ()=> {toggle([overlay,listNameInput],"hidden")});
overlay.addEventListener("click", ()=> {toggle([overlay,listNameInput],"hidden")});

createListBtn.addEventListener("click",() => {
   listNameInput.submit();
})

// all-list transition slide
const navIcon = document.querySelector(".nav-icon");
const allListOverlay = document.querySelector(".all-list");
const transition = document.querySelector(".transition");
navIcon.addEventListener("click", ()=>{
   toggle([transition,allListOverlay],"hidden")
})
allListOverlay.addEventListener("click", ()=>{
   toggle([transition,allListOverlay],"hidden")
})

