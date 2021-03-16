const createBtn = document.querySelector(".create-btn");
const overlay = document.querySelector(".overlay");

function toggleOverlay(){
   overlay.toggleAttribute("hidden")
};

createBtn.addEventListener("click", toggleOverlay);
overlay.addEventListener("click", toggleOverlay);

