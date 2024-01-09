//日期和时间获取函数
function dateTime() {
  let date = new Date();
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month : month;
  let day = date.getDate();
  day = day < 10 ? "0" + day : day;

  let hours = date.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  let minutes = date.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let week = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
  ];
  let weekday = week[date.getDay()];
  let dateStr = month + "月" + day + "日" + " " + weekday;
  let timeStr = hours + ":" + minutes;

  return [dateStr, timeStr];
}

//展示日期和时间函数
function refreshDateTime() {
  let [dateStr, timeStr] = dateTime();
  document.getElementById("time").textContent = timeStr;
  document.getElementById("date").textContent = dateStr;
}

//更新日期和时间
setInterval(refreshDateTime, 1000);

//初始化日期和时间
refreshDateTime();
