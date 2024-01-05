//增删改查系统完善后再运行notice
document.addEventListener("DOMContentLoaded", notice);

let button = document.getElementById("button");
let input = document.getElementById("input");

//提示语句
function notice() {
  if (button.innerText === "✘") {
    console.log("clean last function");
    console.log(button.innerText);
    input.onfocus = null;
    input.onblur = null;
  } else {
    // console.log("start function");
    // console.log(button.innerText);
    input.onfocus = function () {
      input.placeholder = "";
    };
    input.onblur = function () {
      input.placeholder = "今天最重要的事？";
    };
  }
}

//保存按钮
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

//回车提交
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    submit();
  }
});

//浏览器缓存
let data = window.localStorage.getItem("thing");
if (data) {
  input.value = data;
  submit();
}

//备忘录
//数据展示
let memoContent = document.querySelector("#memoContent");
let memoInput = document.querySelector(".memoInputAdd>input");
let memoButton = document.querySelector(".clearAll");
let addMemo = document.querySelector(".addMemo");
localStorage.setItem("memo", JSON.stringify([]));
// 因为我在数据录入时采用追加方法，所以需要提前创建一个空键
console.log("getmemo"); ///
function display() {
  let memo = window.localStorage.getItem("memo");
  if (memo) {
    let arr = JSON.parse(memo);
    memoContent.innerHTML = "";
    arr.forEach((element) => {
      if (element !== "") {
        let li = document.createElement("li");
        li.textContent = element;
        memoContent.appendChild(li);
      }
    });
  } else {
  }
}
display();
//数据录入
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
// memoButton.addEventListener("click", memoEnter);
//删除数据
memoContent.addEventListener("dblclick", removeMemo);
let lastClickTime = 0;
memoContent.addEventListener("click", function (event) {
  let currentTime = new Date().getTime();
  let clickTimeDiff = currentTime - lastClickTime;

  if (clickTimeDiff < 300) {
    // 在短时间内触发了两次点击，可以视作双击操作
    // 处理双击事件
    removeMemo(event);
  }

  lastClickTime = currentTime;
});
function removeMemo(event) {
  if (event.target.tagName === "LI") {
    event.target.remove();
    let arr = memoContent.innerText.split("\n");
    localStorage.setItem("memo", JSON.stringify(arr));
    memoInput.focus();
  }
}
//回车提交
memoInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    memoEnter();
  }
});
addMemo.addEventListener("click", memoEnter);

//提示词
memoInput.onfocus = function () {
  memoInput.placeholder = "";
};
memoInput.onblur = function () {
  memoInput.placeholder = "memo";
};

//清空
memoButton.addEventListener("click", clearAll);
function clearAll() {
  localStorage.removeItem("memo");
  localStorage.setItem("memo", JSON.stringify([]));
  memoInput.focus();
  display();
}
