const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("add-btn");
const newTodoName = document.getElementById("newTodo-name");
const deleteCompleted = document.getElementById("delete-completed");
const leftCount = document.getElementById("leftCount");
const modeBtn = document.getElementById("togBtn");
const filterButtons = [...document.getElementsByClassName("filter")];

import { firebaseConfig } from "./firestore.js";
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const todosDB = db.collection("todos");

let tasks = [];
let filteredTasks = [];

function addTask(task) {
  todosDB.add(task);
  getToDos();
}

function updateTask(task) {
  todosDB.doc(task.id).update(task);
  getToDos();
}

function deleteTask(id) {
  todosDB
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
      getToDos();
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

function deletCompleted(tasks) {
  todosDB
    .where("completed", "==", true)
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      let tasksToDelete = [...data];
      tasksToDelete.forEach((task) => {
        deleteTask(task.id);
      });
    });
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
    icon.dataset.id = task.id;
    label.htmlFor = task.id;
    label.textContent = task.name;
    input.setAttribute("type", "checkbox");
    input.name = task.name;
    input.setAttribute("id", `${task.id}`);
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
      updateTask(task);
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
  deletCompleted();
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

function getToDos(filter = "all") {
  todosDB.get().then((snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    tasks = [...data];
    displayTasks(tasks, filter);
  });
}

getToDos();
