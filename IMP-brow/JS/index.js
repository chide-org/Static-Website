//增删改查系统完善后再运行notice
document.addEventListener("DOMContentLoaded", notice);

let button = document.getElementById("button");
let input = document.getElementById("input");

//提示语句函数
function notice() {
  if (button.innerText === "✘") {
    input.onfocus = null;
    input.onblur = null;
  } else {
    input.onfocus = function () {
      input.placeholder = "";
    };
    input.onblur = function () {
      input.placeholder = "今天最重要的事？";
    };
  }
}

//保存函数
function submit() {
  if (button.innerText === "✔") {
    button.innerText = "✘";
    button.style.color = "gray";
    button.style.opacity = "0.5";
    input.readOnly = true;
    input.style.borderBottomColor = "transparent";
    window.localStorage.setItem("thing", input.value);
  } else if (button.innerText === "✘") {
    button.innerText = "✔";
    button.style.opacity = "0.8";
    button.style.color = "white";
    notice();
    input.focus();
    input.readOnly = false;
    input.value = "";
    input.style.borderBottomColor = "#fff";
    window.localStorage.removeItem("thing");
  }
  notice();
}

//回车提交监视
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submit();
  }
});

//浏览器缓存查询
let data = window.localStorage.getItem("thing");
if (data) {
  input.value = data;
  submit();
}

//备忘录
//数据展示函数
let memoContent = document.querySelector("#memoContent");
let memoInput = document.querySelector(".memoInputAdd>input");
let memoButton = document.querySelector(".clearAll");
let addMemo = document.querySelector(".addMemo");
if (!localStorage.getItem("memo")) {
  localStorage.setItem("memo", JSON.stringify([]));
}
// 因为我在数据录入时采用追加方法，所以需要提前创建一个空键
function display() {
  let memo = window.localStorage.getItem("memo");
  if (memo) {
    let arr = JSON.parse(memo);
    memoContent.innerHTML = "";
    arr.forEach((element) => {
      if (element !== "") {
        if (getCode(element) === "###") {
          // element = element.slice(0, element.length - 3);
          let li = document.createElement("li");
          li.innerHTML = "<del>" + element + "</del>";
          memoContent.appendChild(li);
          memoContent.lastChild.style.opacity = 0.5;
        } else {
          let li = document.createElement("li");
          li.textContent = element;
          memoContent.appendChild(li);
        }
      }
    });
  } else {
    memoContent.innerHTML = "";
  }
}
display();
//数据录入函数
function memoEnter() {
  if (!memoInput.value) {
    memoInput.classList.add("shake");
    setTimeout(() => {
      memoInput.classList.remove("shake");
    }, 600);
  } else {
    let memo = window.localStorage.getItem("memo");
    let arr = JSON.parse(memo);
    arr.push(memoInput.value);
    localStorage.setItem("memo", JSON.stringify(arr));
    memoInput.value = "";
    display();
    memoInput.focus();
  }
}
//回车提交监视
memoInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    memoEnter();
  }
});
addMemo.addEventListener("click", memoEnter);
//按钮删除单行数据
memoContent.addEventListener("click", removeMemo);

function removeMemo(event) {
  if (getCode(event.target.innerText) === "###") {
    event.target.remove();
    let arr = memoContent.innerText.split("\n");
    localStorage.setItem("memo", JSON.stringify(arr));
    memoInput.focus();
  }
}
//单击完成条目函数
memoContent.addEventListener("click", deleteMemo);
function deleteMemo(event) {
  console.log("clicked"); ///
  if (getCode(event.target.innerText) === "###") {
    console.log("getdel"); ///
    let str = event.target.innerText;
    event.target.innerText = str.slice(0, str.length - 3);
    let arr = memoContent.innerText.split("\n");
    localStorage.setItem("memo", JSON.stringify(arr));
    display();
  } else {
    let text = event.target.innerText;
    event.target.innerText = text + "###";
    let arr = memoContent.innerText.split("\n");
    localStorage.setItem("memo", JSON.stringify(arr));
    display();
  }
}
//获取字符串后3位识别码函数
function getCode(str) {
  length = str.length;
  return str.slice(length - 3, length);
}

//提示词函数
memoInput.onfocus = function () {
  memoInput.placeholder = "";
};
memoInput.onblur = function () {
  memoInput.placeholder = "memo";
};

//清空函数和监视
function clearAll() {
  localStorage.removeItem("memo");
  localStorage.setItem("memo", JSON.stringify([]));
  memoInput.focus();
  display();
}
memoButton.addEventListener("click", clearAll);

//打卡程序//
let show = document.getElementById("showTime");
let preshow = document.getElementById("preShowTime");
let check = document.getElementById("check");
//日期函数
function DATE() {
  let currentDate = new Date();
  let year = currentDate.getFullYear(); // 获取年份
  let month = currentDate.getMonth() + 1; // 月份从 0 开始，所以要加 1
  let day = currentDate.getDate(); // 获取日期
  return `${year}-${month}-${day}`;
}
//按钮显示逻辑函数
function judge() {
  let dated = localStorage.getItem("dated");
  let currentdate = DATE();
  if (dated === null) {
    localStorage.setItem("dated", "初始化日期");
    check.style.display = "block";
  } else {
    if (dated === currentdate) {
      check.style.display = "none";
    } else {
      check.style.display = "block";
    }
  }
}
//展示天数函数
function showDays() {
  let days = localStorage.getItem("days");
  if (days) {
    show.innerText = days;
  } else {
    localStorage.setItem("days", "0");
    showDays();
  }
}
//打卡记录天数函数
function addDays() {
  let days = localStorage.getItem("days");
  days = Number(days) + 1;
  days = String(days);
  localStorage.setItem("days", days);
  localStorage.setItem("dated", DATE());
  judge();
  showDays();
}
//逻辑设置
showDays();
judge();
setInterval(judge, 1000);
check.addEventListener("click", addDays);

//日期手动设置函数
let handleSet = document.getElementById("handleSet");
function handle() {
  handleSet.style.display = "block";
  handleSet.focus();
  handleSet.onblur = () => {
    handleSet.style.display = "none";
    handleSet.value = "";
  };
}
handleSet.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    let str = handleSet.value;
    console.log(str); ///
    localStorage.setItem("days", str);
    showDays();
    handleSet.style.display = "none";
    handleSet.value = "";
  }
});
show.addEventListener("wheel", handle);

//全屏函数
let memoBoard = document.getElementById("memo");
let html = document.querySelector("html");
let fullButton = document.querySelector("#fullScreen");
function fullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    html.requestFullscreen();
  }
}
fullButton.addEventListener("click", fullScreen);
