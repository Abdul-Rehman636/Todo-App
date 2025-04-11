var inputValue = document.getElementById("taskInput");
var taskList = document.getElementById("taskList");
var taskButton = document.getElementById("addTaskBtn");

var todos = [];
let updatingIndex;

taskButton.innerText = "+ Add";
taskButton.addEventListener("click", () => addTodo());

function addTodo() {
  if (inputValue.value) {
    if (updatingIndex) {
      todos[updatingIndex] = inputValue.value;
      inputValue.value = "";
      renderTodo();
    } else {
      todos.push(inputValue.value);
      inputValue.value = "";
      renderTodo();
    }
  } else {
    alert("Kindly add the task.");
  }
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodo();
}

function updateTodo(todo, index) {
  inputValue.value = todo;
  taskButton.innerText = "+ Update";
  updatingIndex = index;
}

function renderTodo() {
  taskList.innerHTML = "";
  if (todos.length >= 1) {
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.textContent = `${index + 1}. ${todo}`;
      var actionDiv = document.createElement("div");
      var deleteIcon = document.createElement("img");
      deleteIcon.src = "/assets/delete.png";
      deleteIcon.addEventListener("click", () => deleteTodo(index));
      var updateIcon = document.createElement("img");
      updateIcon.src = "/assets/pencil.png";
      updateIcon.addEventListener("click", () => updateTodo(todo, index));
      actionDiv.appendChild(updateIcon);
      actionDiv.appendChild(deleteIcon);
      li.appendChild(actionDiv);
      taskList.appendChild(li);
    });
  } else {
    var noTextDiv = document.createElement("div");
    noTextDiv.style.display = "flex";
    noTextDiv.style.justifyContent = "center";
    var noText = document.createElement("p");
    noTextDiv.appendChild(noText);
    noText.innerText = "No Todos 😎";
    taskList.appendChild(noTextDiv);
  }
}

inputValue.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTodo();
  }
});

renderTodo();
