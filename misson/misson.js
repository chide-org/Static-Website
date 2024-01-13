let up = document.querySelector("button");
let css = document.querySelector("li");
let width = window.getComputedStyle(css, "::after").width;

up.addEventListener("click", upper);

let xx = 10;

function upper() {
  xx += 10;
  let x = xx + "%";
  if (
    window.getComputedStyle(css, "::after").width ===
    window.getComputedStyle(css, "::before").width
  ) {
    alert("够了够了别点了");
    return;
  }
  css.style.setProperty("--width", x);
}
