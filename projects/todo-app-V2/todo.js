const logoutBtn = document.getElementById("logout");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("add-btn");
const deleteCompleted = document.getElementById("delete-completed");
const leftCount = document.getElementById("leftCount");
const filterButtons = [...document.getElementsByClassName("filter")];

import { auth, db, logout } from "./connect.js";
const userId = localStorage.getItem("userID");

if (!userId) {
  window.location.replace("./login.html");
}

const userTodoDB = db.collection(userId);

function addTodo(todo) {
  userTodoDB.add(todo);
}

function deleteTodo(id) {
  userTodoDB
    .doc(id)
    .delete()
    .then(() => {
      console.log("Document successfully deleted!");
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
  countActive();
}

function updateTodo(task) {
  userTodoDB.doc(task.id).update(task);
}

function deleteCompletedTodo() {
  const completedTodos = userTodoDB.where("completed", "==", true);
  completedTodos.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      doc.ref.delete();
    });
  });
}

function countActive() {
  const todos = [...document.getElementsByClassName("task")];
  leftCount.innerHTML = todos.filter(
    (todo) => todo.getAttribute("data-completed") != "true"
  ).length;
}

function applyFilter(filter) {
  let children = [...taskList.children];
  localStorage.setItem("currentFilter", filter);
  switch (filter) {
    case "active":
      children.forEach((element) => element.classList.remove("hideTask"));
      children = children.filter((task) => task.dataset.completed != "false");
      children.forEach((element) => element.classList.add("hideTask"));
      break;
    case "completed":
      children.forEach((element) => element.classList.remove("hideTask"));
      children = children.filter((task) => task.dataset.completed == "false");
      children.forEach((element) => element.classList.add("hideTask"));
      break;
    default:
      children.forEach((element) => element.classList.remove("hideTask"));
      break;
  }
}

function displayTodo(todo) {
  let li = document.createElement("li");
  let input = document.createElement("input");
  let label = document.createElement("label");
  let trash = document.createElement("i");

  li.setAttribute("data-task", todo.id);
  li.setAttribute("data-completed", todo.data().completed);
  trash.classList.add("far", "fa-trash-alt", "trash");
  trash.dataset.id = todo.id;
  label.htmlFor = todo.id;
  label.textContent = todo.data().name;
  input.setAttribute("type", "checkbox");
  input.classList.add("todo");
  input.name = todo.data().name;
  input.setAttribute("id", `${todo.id}`);
  if (todo.data().completed) {
    input.value = true;
    input.setAttribute("checked", true);
  }

  li.appendChild(input);
  li.appendChild(label);
  li.appendChild(trash);
  li.classList.add("task");
  trash.addEventListener("click", (e) => {
    e.preventDefault();
    deleteTodo(e.target.dataset.id);
  });
  input.addEventListener("click", (e) => {
    const updatedTodo = {
      id: todo.id,
      name: todo.data().name,
      completed: !todo.data().completed,
    };
    updateTodo(updatedTodo);
  });
  li.addEventListener("dblclick", (e) => {
    const modal = document.getElementById("myModal");
    const cancel = document.getElementById("cancel");
    const save = document.getElementById("save");
    const field = document.getElementById("editTask-name");

    field.value = input.name;
    modal.style.display = "block";
    field.focus();

    cancel.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };

    save.onclick = function (event) {
      const todoEdited = {
        id: todo.id,
        name: field.value,
      };
      updateTodo(todoEdited);
      modal.style.display = "none";
    };

    document.addEventListener("keyup", function (e) {
      if (e.key === "Enter" || e.keyCode === 13) {
        if (document.activeElement.id == "editTask-name") {
          const todoEdited = {
            id: todo.id,
            name: field.value,
          };
          updateTodo(todoEdited);
          modal.style.display = "none";
        }
      }
    });
  });
  return li;
}

logoutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const newTodo = document.getElementById("newTodo-name");
  const todo = {
    name: document.getElementById("newTodo-name").value,
    completed: false,
  };
  addTodo(todo);
  newTodo.value = "";
});

document.addEventListener("keyup", function (e) {
  if (e.key === "Enter" || e.keyCode === 13) {
    if (document.activeElement.id == "newTodo-name") {
      const newTodo = document.getElementById("newTodo-name");
      const todo = {
        name: newTodo.value,
        completed: false,
      };
      addTodo(todo);
      newTodo.value = "";
    }
  }
});

deleteCompleted.addEventListener("click", (e) => {
  e.preventDefault();
  deleteCompletedTodo();
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
    applyFilter(btn.dataset.filter);
  });
});

auth.onAuthStateChanged((user) => {
  if (user) {
    userTodoDB.onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type == "added") {
          taskList.appendChild(displayTodo(change.doc));
          countActive();
        } else if (change.type == "removed") {
          const todoRemoved = taskList.querySelector(
            "[data-task=" + change.doc.id + "]"
          );
          taskList.removeChild(todoRemoved);
          countActive();
        } else if (change.type == "modified") {
          const todoModified = taskList.querySelector(
            "[data-task=" + change.doc.id + "]"
          );
          //todoModified.innerHTML = "";
          /*todoModified.setAttribute(
            "data-completed",
            change.doc.data().completed
          );*/
          taskList.insertBefore(displayTodo(change.doc), todoModified);
          todoModified.remove();
          applyFilter(localStorage.getItem("currentFilter"));
          countActive();
        }
      });
    });
  }
});
