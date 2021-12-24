function addAnim() {
  let progress = document.getElementById("overlay"),
    num = 10;

  var interval = setInterval(() => {
    progress.style.width = num + "%";
    num += 30;
    if (num > 100) clearInterval(interval);
  }, 1020);
}

module.exports = addAnim;
