//selectors

const toDoInput = document.querySelector(".todo-input");
const toDoButton = document.querySelector(".todo-button");
const toDoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todo");


//EventListeners
document.addEventListener("DOMContentLoaded", getTodos);
toDoButton.addEventListener("click", addToDo);
toDoList.addEventListener("click", deleteCheck);
filter.addEventListener("change", filtertodo);

//Functions
function addToDo(event) {
  //prevents the form from submitting
  event.preventDefault();

  //ToDo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create LI
  const newToDo = document.createElement("li");
  newToDo.innerText = toDoInput.value;
  newToDo.classList.add("todo-item");
  todoDiv.appendChild(newToDo);

  //Add to local storage
  saveLocalTodos(toDoInput.value);

  //check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<li class="fas fa-check"></li>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //trash button
  const trashButtton = document.createElement("button");
  trashButtton.innerHTML = '<li class="fas fa-trash"></li>';
  trashButtton.classList.add("trash-btn");
  todoDiv.appendChild(trashButtton);

  //append to todoList
  toDoList.appendChild(todoDiv);

  //clear todoInput
  toDoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;

  //delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;

    //Animation
    todo.classList.add("fall");

    //remove from local storage
    removeLocalTodos(todo);

    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check mark
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}


function filtertodo(e) {
  const todos = toDoList.childNodes;
  todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
          if(!todo.classList.contains("completed")) {
              todo.style.display = "flex";
          } else {
              todo.style.display = "none";
          }
          break;
    }
  });
}

//save todo to the local storage
function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos =JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//to get the todolist when the browser is reloaded
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //ToDo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create LI
  const newToDo = document.createElement("li");
  newToDo.innerText = todo;
  newToDo.classList.add("todo-item");
  todoDiv.appendChild(newToDo);

  //check mark button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<li class="fas fa-check"></li>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //trash button
  const trashButtton = document.createElement("button");
  trashButtton.innerHTML = '<li class="fas fa-trash"></li>';
  trashButtton.classList.add("trash-btn");
  todoDiv.appendChild(trashButtton);

  //append to todoList
  toDoList.appendChild(todoDiv);
    });
  }

//to remove todo from the local storage when the trash button is clicked
function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos =JSON.parse(localStorage.getItem('todos'));
    }
    const todoItem = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoItem), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
