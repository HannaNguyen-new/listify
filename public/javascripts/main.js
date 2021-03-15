const createBtn = document.querySelector(".create-btn");
const overlay = document.querySelector(".overlay");


createBtn.addEventListener("click", function displayOverlay(){
   overlay.toggleAttribute("hidden")
})