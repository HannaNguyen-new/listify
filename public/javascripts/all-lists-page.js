


const trash = document.querySelectorAll(".fa-trash");
trash.forEach(el => el.addEventListener("click", event => {
   event.preventDefault()
   const id = event.target.closest(".list").getAttribute("id");
   const url = window.location.href + "/" + id;
   axios.delete(url)
   .then(res => window.location.href = res.data.url)
}))

const clone = document.querySelectorAll(".fa-clone");
clone.forEach(el => el.addEventListener("click", event => {
   event.preventDefault();
   const id = event.target.closest(".list").getAttribute("id");
   const url = window.location.href + "/" + id;
   axios.post(url)
   .then(res => window.location.href = res.data.url)
}))
/* Transition layer to each-list-page */
const createBtn = document.querySelector(".button");
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

