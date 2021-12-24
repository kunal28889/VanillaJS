function createComment(text) {
  let box = document.createElement("div");
  box.innerHTML = `<div class="comment"><textarea></textarea><button>Comment</button></div>`;
  return box;
}
function listComment(text, indent) {
  let box = document.createElement("div");
  box.innerHTML = `<div class="listcomment" style="margin-left:${indent}px"><span>${text}</span></div>`;
  return box;
}
export function main() {
  let app = document.getElementById("app");
  app.appendChild(createComment());
  renderList(app);
}

let comments = [
  "sample Text inside a comment",
  "sample Text inside a comment",
  "sample Text inside a comment",
  "sample Text inside a comment",
  "sample Text inside a comment",
  "sample Text inside a comment"
];

function renderList(app) {
  let list = document.createElement("div");
  list.className = "list";

  comments.map((comment, i) => {
    list.appendChild(listComment(comment + i, i * 10));
  });
  app.appendChild(list);
}

/**
 * API struct-> [{
 *  text, next, prev, id, time
 * }]
 */
