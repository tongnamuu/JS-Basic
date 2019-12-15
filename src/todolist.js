const todoForm = document.querySelector(".todoform"),
  toDoInput = todoForm.querySelector(".getinput");
const todoList = document.querySelector(".todolist");
const completeList = document.querySelector(".completelist");

const TODO_LS = "toDos";
const FN_LS = "finDos";
let toDo_list = [];
let finish_list = [];

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDo_list));
}
function saveTofindos() {
  localStorage.setItem(FN_LS, JSON.stringify(finish_list));
}

function loadToDos() {
  const load = localStorage.getItem(TODO_LS);
  if (load !== null) {
    const parsedToDos = JSON.parse(load);
    parsedToDos.forEach(function(toDo) {
      addtoPending(toDo.text);
    });
  }

  const loadfn = localStorage.getItem(FN_LS);
  if (loadfn !== null) {
    const parsedToDos = JSON.parse(loadfn);
    parsedToDos.forEach(function(toDo) {
      addtoFinished(toDo.text);
    });
  }
}

function deletetoDo(event) {
  //pending
  const btn = event.target;
  const li = btn.parentNode;
  todoList.removeChild(li);
  const cleanToDos = toDo_list.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDo_list = cleanToDos;
  saveToDos();
}

function deletetoFn(event) {
  //Finished
  const btn = event.target;
  const li = btn.parentNode;
  completeList.removeChild(li);
  const cleanToDos = finish_list.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finish_list = cleanToDos;
  saveTofindos();
}

function movetoPending(event) {
  addtoPending(event.target.parentNode.querySelector("h3").innerText);
  const btn = event.target;
  const li = btn.parentNode;
  completeList.removeChild(li);
  const cleanToDos = finish_list.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  finish_list = cleanToDos;
  saveTofindos();
}

function movetoFinish(event) {
  addtoFinished(event.target.parentNode.querySelector("h3").innerText);
  const btn = event.target;
  const li = btn.parentNode;
  todoList.removeChild(li);
  const cleanToDos = toDo_list.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDo_list = cleanToDos;
  saveToDos();
}

function addtoFinished(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "❌"; //버튼추가
  delBtn.addEventListener("click", deletetoFn);

  const finBtn = document.createElement("button");
  finBtn.innerHTML = "◀"; //버튼추가
  finBtn.addEventListener("click", movetoPending);

  const span = document.createElement("h3");
  span.innerText = text;

  const newId = finish_list.length + 1;
  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  completeList.appendChild(li);
  const todoObj = {
    text: text,
    id: newId
  };
  finish_list.push(todoObj);
  saveTofindos();
}

function addtoPending(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  delBtn.innerHTML = "❌"; //버튼추가
  delBtn.addEventListener("click", deletetoDo);

  const finBtn = document.createElement("button");
  finBtn.innerHTML = "✅"; //버튼추가
  finBtn.addEventListener("click", movetoFinish);

  const span = document.createElement("h3");
  span.innerText = text;

  const newId = toDo_list.length + 1;
  li.id = newId;
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(finBtn);
  todoList.appendChild(li);
  const todoObj = {
    text: text,
    id: newId
  };
  toDo_list.push(todoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  addtoPending(currentValue);
  toDoInput.value = "";
}
function init() {
  loadToDos();
  todoForm.addEventListener("submit", handleSubmit);
}
init();
