const calculator = document.querySelector(".calculator");
const resultArea = document.getElementById("result");
const operationArea = document.getElementById("operation");
const previousKey = calculator.dataset.previousKey;
resultArea.textContent = 0;

// Function to calculate result
function calculate(num1, operator, num2) {
  let result = "";
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  if (operator === "add") {
    result = num1 + num2;
  } else if (operator === "substract") {
    result = num1 - num2;
  } else if (operator === "multiply") {
    result = num1 * num2;
  } else if (operator === "divide") {
    result = num1 / num2;
  }

  return result;
}
//
function checkbutton(button) {
  const action = button.dataset.action;
  const keyValue = button.textContent;
  const displayedResult = resultArea.textContent;

  if (!action) {
    if (
      displayedResult === "0" ||
      calculator.dataset.previousKey === "operator"
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

    if (firstValue && operator && previousKey !== "operator") {
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
    const secondValue = displayedResult;

    if (firstValue) {
      if (previousKey === "calculate") {
        firstValue = displayedResult;
        secondValue = calculator.dataset.modValue;
      }

      resultArea.textContent = calculate(firstValue, operator, secondValue);
    }

    calculator.dataset.firstValue = firstValue;
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
