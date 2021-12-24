let list1,
  list2,
  data1 = [
    { value: "dog" },
    { value: "cat" },
    { value: "lion" },
    { value: "sheep" },
    { value: "wolf" }
  ],
  data2 = [];

function sendHandler(element1, element2, singleFlag) {
  let parent = Array.prototype.slice.call(element1.children);
  for (let i = 0; i < parent.length; i++) {
    if (singleFlag || parent[i].selected) {
      element2.appendChild(createOption(parent[i].value));
      element1.removeChild(parent[i]);
    }
  }
}

function createOption(value) {
  let tempElement = document.createElement("option");
  tempElement.value = value;
  tempElement.innerHTML = value;
  return tempElement;
}

export function main() {
  list1 = document.getElementById("list1");
  list2 = document.getElementById("list2");
  data1.map((item, key) => {
    list1.appendChild(createOption(item.value));
  });
  document
    .getElementById("send")
    .addEventListener("click", sendHandler.bind(undefined, list1, list2, true));
  document
    .getElementById("receive")
    .addEventListener("click", sendHandler.bind(undefined, list2, list1, true));

  document
    .getElementById("sendOne")
    .addEventListener(
      "click",
      sendHandler.bind(undefined, list1, list2, false)
    );
  document
    .getElementById("receiveOne")
    .addEventListener(
      "click",
      sendHandler.bind(undefined, list2, list1, false)
    );
}
