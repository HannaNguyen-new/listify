

/* each-list-page*/
function toggle(arr, attribute) {
  arr.forEach((el) => el.toggleAttribute(attribute));
}

const hide = document.querySelector(".hide");
const show = document.querySelector(".show");
const bottomContainer = document.querySelector(".bottom-container");
hide.addEventListener("click", () => {
  toggle([bottomContainer, hide, show], "hidden");
});
show.addEventListener("click", () => {
  toggle([bottomContainer, hide, show], "hidden");
});
/* update listname*/
const listNameInput = document.querySelector(".list-name-input");
listNameInput.oninput = () => {
   listNameInput.value = "";
  updateListName(listNameInput.textContent);
}; //oninput works for contenteditable
function updateListName(input) {
  const url = window.location.href;
  axios.patch(url, { listName: input });
}

/*add item*/
const itemInput = document.querySelector(".list-item-input");
itemInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    addItem(itemInput.value); //onchange works for input but not contenteditable
  }
});

function addItem(input) {
  const url = window.location.href;
  if (input !== "") {
    axios
      .post(url, {itemName: input})
      .then((res) => (window.location.href = res.data));
  }
}

/* update item*/
const itemQuantity = document.querySelectorAll(".item-quantity");
const unitPrice = document.querySelectorAll(".unit-price");
const arr = [...itemQuantity, ...unitPrice];
arr.forEach((node) =>
  node.addEventListener("keyup", () => {
     let nodeName = node.getAttribute("class");
     nodeName = nodeName === "item-quantity" ? "itemQuantity": "unitPrice"
     const parent = node.parentNode.parentNode;
     const parentId = parent.getAttribute("id");
     update(nodeName,node.value,parentId)
     
  })
);
function update(elementToUpdate, value, id) {
  const obj = {[elementToUpdate] : Number(value)} // create obj with dynamic key-value
  const url = window.location.href + "/items/" + id;
  axios.patch(url, obj);
}

/* update itemName */
const itemName = document.querySelector(".item-name");
itemName.addEventListener("keyup", () => {
   const parentId = itemName.parentNode.getAttribute("id");
   updateItemName(itemName.textContent, parentId)

})
function updateItemName(input, id){
   const url = window.location.href + "/items/" + id; 
   if(input !== ""){
      axios.patch(url, {itemName : input})
   }
}
