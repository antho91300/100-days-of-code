const calculator = document.querySelector(".calculator");
const resultArea = document.getElementById("result");
const operationArea = document.getElementById("operation");
const previousKey = calculator.dataset.previousKey;
resultArea.textContent = 0;

// Function to calculate result
function calculate(num1, operator, num2) {
  const number1 = parseFloat(num1);
  const number2 = parseFloat(num2);

  switch (operator) {
    case "add":
      return number1 + number2;
    case "substract":
      return number1 - number2;
    case "multiply":
      return number1 * number2;
    case "divide":
      return number1 / number2;
  }
}

//Define action from button
function checkbutton(button) {
  const action = button.dataset.action;
  const keyValue = button.textContent;
  const displayedResult = resultArea.textContent;

  if (!action) {
    if (
      displayedResult === "0" ||
      calculator.dataset.previousKey === "operator" ||
      calculator.dataset.previousKey === "calculate"
    ) {
      calculator.dataset.previousKey = "";
      resultArea.textContent = keyValue;
    } else {
      resultArea.textContent = displayedResult + keyValue;
    }
    calculator.dataset.previousKey = "number";
  }

  if (
    action === "add" ||
    action === "substract" ||
    action === "multiply" ||
    action === "divide"
  ) {
    const firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    const secondValue = displayedResult;

    if (
      firstValue &&
      operator &&
      calculator.dataset.previousKey !== "operator" &&
      calculator.dataset.previousKey !== "calculate"
    ) {
      const calcValue = calculate(firstValue, operator, secondValue);
      resultArea.textContent = calcValue;
      calculator.dataset.firstValue = calcValue;
    } else {
      calculator.dataset.firstValue = displayedResult;
    }

    calculator.dataset.operator = action;
    calculator.dataset.previousKey = "operator";
  }

  if (action === "decimal") {
    if (calculator.dataset.previousKey === "operator") {
      resultArea.textContent = "0.";
    } else if (!displayedResult.includes(".")) {
      resultArea.textContent = displayedResult + ".";
    }
    calculator.dataset.previousKey = "decimal";
  }

  if (action === "clear") {
    resultArea.textContent = "0";
  }

  if (action === "reset") {
    delete calculator.dataset.firstValue;
    delete calculator.dataset.operator;
    delete calculator.dataset.previousKey;
    delete calculator.dataset.modValue;
    resultArea.textContent = "0";
    calculator.dataset.previousKey = "clear";
  }

  if (action === "calculate") {
    let firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    let secondValue = displayedResult;

    if (firstValue) {
      if (calculator.dataset.previousKey === "calculate") {
        firstValue = displayedResult;
        secondValue = calculator.dataset.modValue;
      }

      resultArea.textContent = calculate(firstValue, operator, secondValue);
    }

    calculator.dataset.modValue = secondValue;
    calculator.dataset.previousKey = "calculate";
  }
}

//Get all buttons
const buttons = [...document.getElementsByTagName("button")];

//Onclick EventListener on buttons
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    checkbutton(e.target);
  });
});
