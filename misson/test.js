let progress = document.getElementById("progress");
let li = document.querySelector("li");
let width = window.getComputedStyle(li, "::after").width;

progress.addEventListener("click", upper);

let piece = 0;
let xx = 0;

function upper() {
  xx += piece;
  let x = xx + "%";
  if (
    window.getComputedStyle(li, "::after").width ===
    window.getComputedStyle(li, "::before").width
  ) {
    alert("够了够了别点了");
    return;
  }
  li.style.setProperty("--width", x);
}

// 获得输入的任务名和分段数
let nam = document.getElementById("name");
let num = document.getElementById("num");
let submit = document.getElementById("submit");
let ul = document.querySelector("ul");

submit.addEventListener("click", deal);

function deal() {
  let newLi = document.createElement("li");

  li.innerText = nam.value;
  piece = 100 / num.value;
}
