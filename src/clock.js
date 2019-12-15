const clockcontainer = document.querySelector(".clock");
const clockTitle = clockcontainer.querySelector(".clock-title");

function getTime() {
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  clockTitle.innerHTML = `${hour < 10 ? `0${hour}` : hour}:${
    minute < 10 ? `0${minute}` : minute
  }:${second < 10 ? `0${second}` : second}`;
}
function init() {
  setInterval(() => {
    getTime();
  }, 1000);
}
init();
