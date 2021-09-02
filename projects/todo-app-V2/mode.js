const modeBtn = document.getElementById("togBtn");

let mode = localStorage.getItem("mode");
mode = mode == null ? "light" : mode;
document.getElementById("css-switcher").href = `./themes/${mode}.css`;

modeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  mode = mode == "light" ? "dark" : "light";
  localStorage.setItem("mode", mode);
  document.getElementById("css-switcher").href = `./themes/${mode}.css`;
});