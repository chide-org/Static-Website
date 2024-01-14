//获得总任务表元素并展示缓存数据
let ul = document.querySelector("ul");
localStorage.setItem(
  "mission",
  '<li data-piece="10" data-progress="1" style="--width: 9.5%;">学习10个css<button type="button"> 提交</button><button type="button">删除</button></li>'
);
ul.innerHTML = localStorage.getItem("mission");
//监视新增按钮
let addButton = document.getElementById("add");
addButton.addEventListener("click", add);

//定义新增函数
function add() {
  let newLi = document.createElement("li");
  let nam = document.getElementById("name");
  let num = document.getElementById("num");

  ////数字合法性判断

  newLi.innerHTML =
    nam.value +
    '<button  type="button"> 提交</button><button type="button">删除</button>';
  newLi.setAttribute("data-piece", num.value);
  newLi.setAttribute("data-progress", 0);
  ul.appendChild(newLi);
  num.value = "";
  nam.value = "";
  //提示添加成功
  console.log(
    ////渐退出提示框
    "新增任务成功！\n" +
      "\n" +
      newLi.innerText.slice(0, -2) +
      "\n" +
      newLi.dataset.piece
  );
  localStorage.setItem("mission", ul.innerHTML);
}

//监视提交和删除按钮
ul.addEventListener("click", function (event) {
  console.log("catched");

  if (event.target.innerText === "删除") {
    console.log("删除任务"); ////
    let judge = window.confirm("确认删除这项任务吗？");
    if (judge) {
      ul.removeChild(event.target.parentNode);
      localStorage.setItem("mission", ul.innerHTML);
    }
    return;
  }

  let uploadLi = event.target.parentNode;
  let pie = Number(uploadLi.dataset.piece);
  let pro = Number(uploadLi.dataset.progress);
  console.log(pie);
  console.log(pro);

  if (pie === pro) {
    console.log("这个任务已经完成啦\n 试试添加新的任务~~"); ////渐退出提示框
    return;
  }

  let piece = (95 / pie) * (1 + pro);
  uploadLi.style.setProperty("--width", piece + "%");
  uploadLi.setAttribute("data-progress", 1 + Number(pro));

  console.log(uploadLi.dataset.piece);
  console.log(uploadLi.dataset.progress);
  if (uploadLi.dataset.piece === uploadLi.dataset.progress) {
    console.log("完成任务了呢！庆祝一下吧~~"); ////渐退出提示框
  }
  localStorage.setItem("mission", ul.innerHTML);
});
