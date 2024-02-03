/////展示缓存区/////
//获得总任务表元素并展示缓存数据
let ul = document.querySelector("ul");
console.log(localStorage.getItem("mission"));
if (
  localStorage.getItem("mission") === null &&
  localStorage.getItem("test") === null
) {
  localStorage.setItem(
    "mission",
    '<li data-piece="10" data-progress="1" style="--width: 9.5%;">示例（删除后添加您的任务）：10个分段<button type="button"> 提交</button><button type="button">删除</button></li>'
  );
  localStorage.setItem("test", "ok");
} else {
  console.log("老用户了啊，就不教你做事了");
}
ul.innerHTML = localStorage.getItem("mission");

/////添加任务逻辑区/////
//监视新增按钮
let addButton = document.getElementById("add");
let nam = document.getElementById("name");
let num = document.getElementById("num");
addButton.addEventListener("click", add);

//监视回车提交
nam.addEventListener("keydown", judgeEnter);
num.addEventListener("keydown", judgeEnter);

//定义回车提交函数
function judgeEnter(event) {
  if (event.key === "Enter") {
    if (num.value !== "" && nam.value !== "") {
      add();
      console.log("回车提交，成功！");
    } else if (nam.value === "") {
      nam.focus();
    } else if (num.value === "") {
      num.focus();
    }
  }
}

//定义新增函数

function add() {
  let newLi = document.createElement("li");

  ////输入合法性判断
  numb = Number(num.value);
  console.log(num.value + "---" + numb);
  if (numb.value === "" || nam.value === "") {
    alert("请完整填写信息哦，做个乖宝宝");
    return;
  } else if (!Number.isInteger(numb) || numb < 1) {
    alert("想啥呢！分段数量必须为正整数");
    num.value = "";
    return;
  }

  newLi.innerHTML =
    nam.value +
    `<button  type="button"> 提交0/${num.value}</button><button type="button">删除</button>`;
  newLi.setAttribute("data-piece", num.value);
  newLi.setAttribute("data-progress", 0);
  ul.appendChild(newLi);
  num.value = "";
  nam.value = "";
  //提示添加成功
  console.log(
    ////渐退出提示框
    "新增任务成功！大忙人呐，快去忙吧\n" +
      "\n" +
      newLi.innerText.slice(0, -2) +
      "\n" +
      newLi.dataset.piece
  );
  localStorage.setItem("mission", ul.innerHTML);
}

/////任务操作区/////
//监视提交和删除按钮
ul.addEventListener("click", function (event) {
  console.log("catched");

  if (event.target.innerText === "删除") {
    console.log("删除任务"); ////
    let judge = window.confirm("真的！确认！的确！要删除这项任务吗？");
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
  // 更新显示的数字
  event.target.innerText = `提交${pro + 1}/${pie}`;

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
