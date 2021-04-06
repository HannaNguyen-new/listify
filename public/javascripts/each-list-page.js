/*--------- Animation-----------*/
/* each-list-page*/
// show, hide button
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

// slide up and down
const item = document.querySelectorAll(".item");
const noteAndPrice = document.querySelectorAll(".noteTotalprice");
item.forEach(el => el.addEventListener("click",(event) => {
   if(event.target.className !== "noteInput"){
     el.childNodes[7].toggleAttribute("noDisplay");
   }
  
}))

/*--------- Dealing with database----------*/
/* function debounce */
function debounce(callback, delay) {
  let timeout = null;
  clearTimeout(timeout);
  timeout = setTimeout(callback, delay);
}
/* function update */
function update(str, url, obj) {
  if (str !== "") {
    axios.patch(url, obj);
  }
}

/* update listname*/
const listNameInput = document.querySelector(".list-name-input");
listNameInput.addEventListener("keyup", () => {
  const url = window.location.href;
  const obj = { listName: listNameInput.textContent };
  debounce(() => {
    update(listNameInput.textContent, url, obj);
  }, 2000);
});

/*add item*/
const itemInput = document.querySelector(".list-item-input");
itemInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    const url = window.location.href;
    const obj = { itemName: itemInput.value };
    if (itemInput.value !== "") {
      axios.post(url, obj).then((res) => (window.location.href = res.data));
    }
  }
});

/* update item*/
const itemQuantity = document.querySelectorAll(".item-quantity");
const unitPrice = document.querySelectorAll(".unit-price");
const arr = [...itemQuantity, ...unitPrice];
arr.forEach((node) =>
  node.addEventListener("keyup", () => {
    let nodeName = node.getAttribute("class");
    nodeName = nodeName === "item-quantity" ? "itemQuantity" : "unitPrice";
    const parent = node.parentNode.parentNode;
    const parentId = parent.getAttribute("id");
    const url = window.location.href + "/items/" + parentId;
    const obj = { [nodeName]: Number(node.value) };
    debounce(() => {
      update(node.value, url, obj);
    }, 1000);
  })
);

/* update itemName */
const itemName = document.querySelectorAll(".item-name");
itemName.forEach((node) =>
  node.addEventListener("keyup", () => {
    const parentId = node.parentNode.getAttribute("id");
    const url = window.location.href + "/items/" + parentId;
    const obj = { itemName: node.textContent };
      debounce(() => {
        update(node.textContent,url, obj);
      }, 2000);
  })
);
