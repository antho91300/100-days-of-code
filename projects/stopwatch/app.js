const h = document.getElementById("hour");
const m = document.getElementById("minute");
const s = document.getElementById("second");
const ms = document.getElementById("milli");
const list = document.getElementsByClassName("last-times")[0];

const actions = [...document.getElementsByClassName("btn")];

let timer;

function increment() {
  let newMS = ms.innerText;
  let newS = s.innerText;
  let newM = m.innerText;
  let newH = h.innerText;

  if (newMS < 99) {
    newMS++;
  } else {
    newMS = "00";
    if (newS < 59) {
      newS++;
    } else {
      newS = "00";
      if (newM < 59) {
        newM++;
      } else {
        newM = "00";
        newH++;
      }
    }
  }

  ms.innerText = newMS.length < 2 ? "0" + newMS : newMS;
  s.innerText = newS.length < 2 ? "0" + newS : newS;
  m.innerText = newM.length < 2 ? "0" + newM : newM;
  h.innerText = newH.length < 2 ? "0" + newH : newH;
}

function start() {
  if (!timer) {
    timer = setInterval(() => {
      increment();
    }, 10);
  }
}

function pause() {
  clearInterval(timer);
  timer = undefined;
}

function reset() {
  clearInterval(timer);
  timer = undefined;
  s.innerText = m.innerText = h.innerText = ms.innerText = "00";
}

function save() {
    let li = document.createElement("li");
    li.innerHTML = `${h.innerHTML}:${m.innerHTML}:${s.innerHTML},${ms.innerHTML}`;
    list.appendChild(li);
}

actions.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    let action = e.target.dataset.action;
    switch (action) {
      case "start":
        start();
        break;
      case "pause":
        pause();
        break;
      case "reset":
        reset();
        break;
      case "save":
        save();
        break;
    }
  });
});
