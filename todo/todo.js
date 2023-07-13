const toDoForm = document.querySelector("#toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector("#toDoList");

const TODOS_LS = "toDos";

var toDos = [];

function deleteToDo(event) {
  button = event.target;
  list = button.parentNode;
  toDoList.removeChild(list);
  const cleanToDo = toDos.filter(function(toDo){
    return toDo.id !== parseInt(list.id);
  });
  toDos = cleanToDo;
  saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const deleteButton = document.createElement("button");
  const span = document.createElement("span");
  const idCount = toDos.length + 1;
  deleteButton.innerText = "❌";
  deleteButton.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(deleteButton);
  li.appendChild(span);
  li.id = idCount;
  toDoList.appendChild(li);
  const toDoObject = {
      text: text,
      id: idCount
  };
  toDos.push(toDoObject);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(
          function(toDo) {
              paintToDo(toDo.text);
          }
      );
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();