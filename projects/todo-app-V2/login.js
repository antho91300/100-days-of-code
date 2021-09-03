const form = document.getElementsByClassName("form")[0];
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const errorMessage = document.getElementById("errorMessage");
const error = localStorage.getItem("errorMessage");

import { auth, login, logout } from "./connect.js";

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const status = form.checkValidity();
  form.reportValidity();
  if (status) {
    login(email.value, password.value);
  }
});

if (error != undefined) {
  errorMessage.innerText = error;
  localStorage.removeItem("errorMessage");
}