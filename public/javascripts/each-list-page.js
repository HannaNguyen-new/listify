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
item.forEach((el) =>
  el.addEventListener("click", (event) => {
    if (event.target.className === "item") {
      el.childNodes[7].toggleAttribute("noDisplay");
    }
  })
);

// move checked item
const items = document.querySelector(".items");
const checkbox = document.querySelectorAll(".checkbox");
checkbox.forEach(node => node.addEventListener("click", event =>{
      const node = event.target;
      const id = node.parentElement.getAttribute("id");
      const checkedItem = document.getElementById(id);
      const index = Array.from(items.children).findIndex(el => el.getAttribute("id") === id);
      toggle([checkedItem],"checked");
        if(checkedItem.hasAttribute("checked")){
          check(checkedItem,items,index);
        }else{
          uncheck(checkedItem,items)
        }
     
     
 }
));

function check(node,parent,index) {
  node.remove();
  parent.appendChild(node);
  node.setAttribute("oldIndex",index)
}
function uncheck(node,parent){
  const i = node.getAttribute("oldIndex")
  parent.insertBefore(node,parent.children[i])
}

/*--------- Dealing with database----------*/
/* function debounce */
function debounce(fn, delay) {
  let timeout;
  return () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(fn, delay);
  };
}
/* function update */
function update(str, url, obj) {
    return axios.patch(url, obj);
}

/* update listname*/
const listNameInput = document.querySelector(".list-name-input");
listNameInput.addEventListener("keyup", debounce(() => {
  const url = window.location.href;
  const obj = { listName: listNameInput.textContent };
  update(listNameInput.textContent, url, obj);

},1000) 
);

/*add item*/
const itemInput = document.querySelector(".list-item-input");
itemInput.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
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
const noteInput = document.querySelectorAll(".noteInput");
const arr = [...itemQuantity, ...unitPrice, ...noteInput];
arr.forEach(node =>
  node.addEventListener("keyup", debounce(() =>{
    let nodeName = node.getAttribute("class");
    nodeName =
      nodeName === "item-quantity"
        ? "itemQuantity"
        : nodeName === "unit-price"
        ? "unitPrice"
        : "note";
    const parent = node.closest(".item");
    const parentId = parent.getAttribute("id");
    const url = window.location.href + "/items/" + parentId;
    const obj = { [nodeName]: node.value };
    const updatedTotalPrice =
      parent.lastElementChild.lastElementChild.lastElementChild;

      (async function (){
        await update(node.value, url, obj)
          .then(res => {
            console.log(res.data)
             updatedTotalPrice.innerHTML = res.data.itemQuantity * res.data.unitPrice
          })
          .catch(err => console.log(err));
      })()
  },500)
  ))


/* update itemName */
const itemName = document.querySelectorAll(".item-name");
itemName.forEach((node) => {
  node.addEventListener(
    "keyup",
    debounce(() => {
      const parentId = node.parentNode.getAttribute("id");
      const url = window.location.href + "/items/" + parentId;
      const obj = { itemName: node.textContent };
      update(node.value, url, obj);
    }, 2000)
  );
});

/* delete item*/
const deleteIcon = document.querySelectorAll(".fa-trash");
deleteIcon.forEach(node => node.addEventListener("click", ()=> {
  const parent = node.closest(".item");
  const parentId = parent.getAttribute("id");
  const url = window.location.href + "/items/" + parentId;
  axios.delete(url)
  .then(res => window.location.href = res.data)
}))