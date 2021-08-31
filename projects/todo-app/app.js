const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("add-btn");
const newTodoName = document.getElementById("newTodo-name");
const deleteCompleted = document.getElementById("delete-completed");
const leftCount = document.getElementById("leftCount");
const modeBtn = document.getElementById("togBtn");
const filterButtons = [...document.getElementsByClassName("filter")];

let tasks = [
  { name: "Tâche exemple", completed: false },
  { name: "Tâche terminée", completed: true },
];
let filteredTasks = [];

function addTask(task) {
  tasks.push(task);
  displayTasks(tasks);
}

function deleteTask(id) {
  tasks.splice(id, 1);
  displayTasks(tasks);
}
function deletCompleted(tasks) {
  return tasks.filter((task) => !task.completed);
}

function displayTasks(tasks, filter = "all") {
  let remainingTasks = tasks.filter((task) => !task.completed).length;
  leftCount.textContent = remainingTasks;
  taskList.innerHTML = "";
  let tasksToDisplay = [];
  switch (filter) {
    case "all":
      tasksToDisplay = tasks;
      break;
    case "active":
      tasksToDisplay = tasks.filter((task) => !task.completed);
      break;
    case "completed":
      tasksToDisplay = tasks.filter((task) => task.completed);
      break;
  }

  tasksToDisplay.forEach((task, index) => {
    let li = document.createElement("li");
    let input = document.createElement("input");
    let label = document.createElement("label");
    let icon = document.createElement("i");

    icon.classList.add("far", "fa-trash-alt", "trash");
    icon.dataset.id = index;
    label.htmlFor = `${index}`;
    label.textContent = task.name;
    input.setAttribute("type", "checkbox");
    input.name = task.name;
    input.setAttribute("id", `${index}`);
    if (task.completed) {
      input.value = 1;
      input.setAttribute("checked", true);
    }

    li.appendChild(input);
    li.appendChild(label);
    li.appendChild(icon);
    li.classList.add("task");
    taskList.appendChild(li);
    input.addEventListener("change", () => {
      task.completed = !task.completed;
      displayTasks(tasks);
    });
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      deleteTask(e.target.dataset.id);
    });
  });
}

function getNewTask() {
  const task = {
    name: newTodoName.value,
    completed: false,
  };
  addTask(task);
  newTodoName.value = "";
}

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    getNewTask();
  }
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getNewTask();
});

deleteCompleted.addEventListener("click", (e) => {
  e.preventDefault();
  tasks = deletCompleted(tasks);
  displayTasks(tasks);
});

let mode = localStorage.getItem("mode");
mode = mode == null ? "light" : mode;
document.getElementById("css-switcher").href = `./themes/${mode}.css`;

modeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  mode = mode == "light" ? "dark" : "light";
  localStorage.setItem("mode", mode);
  document.getElementById("css-switcher").href = `./themes/${mode}.css`;
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    filterButtons.forEach((button) => {
      if (button.classList.contains("active")) {
        button.classList.toggle("active");
      }
    });
    btn.classList.toggle("active");
    displayTasks(tasks, btn.dataset.filter);
  });
});

displayTasks(tasks);
