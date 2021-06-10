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
const expand = document.querySelectorAll(".expand");
const shrink = document.querySelectorAll(".shrink");
const noteAndPrice = document.querySelectorAll(".noteTotalprice");

document.addEventListener("click", event => {
  const clickedIcon = event.target;
  if(isMatched(clickedIcon,[".expand",".shrink"])){
    const parent = clickedIcon.parentElement.parentElement;
    const children = parent.children;
    const priceDisplay = Array.from(children).filter(child => child.className === "noteTotalprice"); // priceDisplay is an array
    const sibling = clickedIcon.className.includes("expand") ? clickedIcon.nextElementSibling : clickedIcon.previousElementSibling;
    toggle([...priceDisplay, event.target, sibling], "noDisplay")

  }

})



// move checked item
const purchased = document.querySelector(".purchased")
document.addEventListener("click", event => {
  const node = event.target;
  if(isMatched(node,[".checkbox"])){
    console.log(items)
    const id = node.parentElement.getAttribute("id");
    const checkedItem = document.getElementById(id);
    const index = Array.from(items.children).findIndex(el => el.getAttribute("id") === id);
    const url = window.location.href + "/items/" + id;
    toggle([checkedItem], "checked");
    if (checkedItem.hasAttribute("checked")) {
      check(checkedItem, items, index);
      update(url, { checked: true }).then(res => purchased.innerHTML = "Purchased:￥ " + res.data[2])
    } else {
      uncheck(checkedItem, items);
      update(url, { checked: false }).then(res => purchased.innerHTML = "Purchased:￥ " + res.data[2])
    }
  }

}
);

function check(node, parent, index) {
  node.remove();
  parent.appendChild(node);
  node.setAttribute("oldIndex", index)
}
function uncheck(node, parent) {
  const i = node.getAttribute("oldIndex")
  parent.insertBefore(node, parent.children[i])
}

// all-list transition slide
const navIcon = document.querySelector(".nav-icon");
const transition = document.querySelector(".transition");
const overlay = document.querySelector(".overlay");
navIcon.addEventListener("click", () => {
  toggle([transition, overlay], "hidden")
})
overlay.addEventListener("click", () => {
  toggle([transition, overlay], "hidden")
})


/*--------- Dealing with database----------*/
/* function debounce */
// function debounce(fn, delay) {
//   let timeout;

//   return () => {
//     if (timeout) {
//       clearTimeout(timeout);
//     }
//     timeout = setTimeout(fn, delay);

//   };
// }

function debounce(fn, delay) {
  let timeout;
  return function executedFunction(arg) {
    const later = () => {
      clearTimeout(timeout);
      fn(arg)
    }
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, delay)
  }

}

/* function update */
function update(url, obj) {
  return axios.patch(url, obj);
}

/* update listname*/
function updateListName (target){
  const url = window.location.href;
  const obj = { listName: target.textContent };
  update(url, obj);

}
const updateListNameLater = debounce(updateListName,1000)

// clear contents of cloned node
function clearContents(node, arr) {
  const contents = arr.map(className => node.querySelector("." + className))
  contents.forEach(content => content.innerHTML = '')
  return contents
}
/*add item*/
const items = document.querySelector(".items");
const item = document.querySelector(".item")
const itemInput = document.querySelector(".list-item-input");
const addItem = async () => {
  const url = window.location.href;
  const obj = { itemName: itemInput.value };
  if (itemInput.value !== "") {
    if (item === null) {
      axios.post(url, obj).then((res) => (window.location.reload()));
    } else {
      const res = await axios.post(url, obj);
      if (res.data) {
        const newItem = item.cloneNode(true)
        const [itemName, itemQuantity, unitPrice] = clearContents(newItem, ["item-name", "item-quantity", "unit-price", "noteInput", "priceDisplay"])
        itemName.innerHTML = itemInput.value;
        itemQuantity.value = 1;
        unitPrice.value = 0;
        newItem.setAttribute("id", res.data._id)
        items.appendChild(newItem)
      }
    }

  }

  itemInput.value = "";
}

itemInput.addEventListener("keyup", (event) => {
  if (event.keyCode == 13) {
    addItem()
  }
});
itemInput.addEventListener("focusout", addItem);

/* update item*/

const toBuy = document.querySelector(".to-buy");
function isMatched(target, arr) {
  return arr.some(selector => target.matches(selector))
}

async function updateItem(node) {
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


  await update(url, obj)
    .then(res => {
      updatedTotalPrice.innerHTML = res.data[0].itemQuantity * res.data[0].unitPrice;
      toBuy.innerHTML = "Plan to buy: ￥ " + res.data[1]
    })
    .catch(err => console.log(err));


}

const updateItemLater = debounce(updateItem, 1000)

/* update itemName */
function updateItemName(node) {
  const parentId = node.parentNode.getAttribute("id");
  const url = window.location.href + "/items/" + parentId;
  const obj = { itemName: node.textContent };
  update(url, obj);
  
}
const updateItemNameLater = debounce(updateItemName, 2000)

document.addEventListener("keyup", event => {
  const target = event.target;
  if (isMatched(target, [".item-quantity", ".unit-price", ".noteInput"])) {
    updateItemLater(target)
  }else if(isMatched(target, [".item-name"])){
    updateItemNameLater(target)
  }else if(isMatched(target,[".list-name-input"])){
    updateListNameLater(target)
  }

}
)

/* delete item*/
function deleteItem(target) {
  const parent = target.closest(".item");
  const parentId = parent.getAttribute("id");
  const url = window.location.href + "/items/" + parentId;
  axios.delete(url)
    .then(res => window.location.href = res.data)

}
document.body.addEventListener("click", event => {
  const target = event.target;
  if (target.matches(".fa-trash")) {
    deleteItem(target)
  }
}, true)
