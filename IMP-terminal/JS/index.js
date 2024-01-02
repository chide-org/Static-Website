//增删改查系统完善后再运行notice
document.addEventListener("DOMContentLoaded", notice);

let button = document.getElementById("button");
let input = document.getElementById("input");

//保存按钮
function submit() {
  if (button.innerText === "✔") {
    console.log("capture ✔");
    console.log(button.innerText);
    button.innerText = "✘";
    button.style.color = "gray";
    input.readOnly = true;
    input.style.borderBottomColor = "transparent";
    fetch("http://localhost:3000/" + input.value, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  } else if (button.innerText === "✘") {
    console.log("capture ✘");
    console.log(button.innerText);
    button.innerText = "✔";
    button.style.color = "white";
    input.readOnly = false;
    input.value = "";
    input.style.borderBottomColor = "#fff";
    fetch("http://localhost:3000/", { method: "DELETE" })
      .then((res) => res.json)
      .then((data) => {
        console.log(data);
      });
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
// let data = window.localStorage.getItem("thing");
// if (data) {
//   input.value = data;
//   submit();
// }
//后端缓存
fetch("http://localhost:3000/", {
  method: "GET",
})
  .then((response) => response.json())
  .then((jsonData) => {
    console.log(jsonData);
    if (jsonData.data) {
      document.getElementById("input").value = jsonData.data;
      button.innerText = "✘";
      input.style.borderBottomColor = "transparent";
      input.readOnly = true;
    }
  });

//提示语句
function notice() {
  if (button.innerText === "✘") {
    console.log("clean last function");
    console.log(button.innerText);
    input.onfocus = null;
    input.onblur = null;
  } else {
    console.log("start function");
    console.log(button.innerText);
    input.onfocus = function () {
      input.placeholder = "";
    };
    input.onblur = function () {
      input.placeholder = "今天最重要的事？";
    };
  }
}
