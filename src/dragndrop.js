// https://glitch.com/edit/#!/park?path=script.js%3A21%3A19

function addListeners() {
  let target = document.getElementById("dragTarget"),
    item = document.getElementById("dragItem");

  item.addEventListener("dragstart", dragStart);
  // item.addEventListener("dragend");
  target.addEventListener("dragover", dragOverEnter);
  target.addEventListener("dragenter", dragOverEnter);
  target.addEventListener("drop", getDroppedItem);
}

// Need to set data when dragging
function dragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.innerHTML);
}

// Allow div to be a valid drop zone
function dragOverEnter(e) {
  e.preventDefault();
}

let getDroppedItem = (e) => {
  console.log(e.target, e.currentTarget);
  e.target.innerHTML += e.dataTransfer.getData("text/plain");
};

export function main() {
  addListeners();
}
