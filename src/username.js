const namecontainer = document.querySelector(".username");
const input = namecontainer.querySelector(".name-input");
const name_blank = input.querySelector("input");
const greeting = namecontainer.querySelector(".hello");

const USER_NAME = "currentuser";

function saveName(text) {
  localStorage.setItem(USER_NAME, text);
}

function handlesubmit(event) {
  event.preventDefault();
  const value = name_blank.value;
  console.log(value);
  paintGreeting(value);
  saveName(value);
}

function getName() {
  if (input.classList.contains("not-display"))
    input.classList.remove("not-display");
  if (!greeting.classList.contains("not-display"))
    greeting.classList.add("not-display");
  input.addEventListener("submit", handlesubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_NAME);
  if (currentUser === null) {
    getName();
  } else {
    paintGreeting(currentUser);
  }
}

function paintGreeting(text) {
  input.classList.add("not-display");
  greeting.classList.remove("not-display");
  greeting.innerHTML = `<h1>Hello ${text}!</h1>`;
}

function init() {
  loadName();
}
init();
