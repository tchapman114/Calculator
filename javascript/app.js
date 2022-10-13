// + - * / --> operator
// what do we need to keep track of ? op1(input1), op2, operator, outputVar
// let outputVar = 1 + 12 - 4 .......n  You can really only keep track of the first operand

// set up a storage object for the calculator
// object literal = calculator
const calculator = {
  displayValue: "0", //display of result and what user inputs, initially shows a 0
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false, //this should switch to true the moment the operator is hit
};

// Update the display box of calculator
function updateDisplay() {
  // select the HTML element that will show the output. Grab html element
  const display = document.querySelector(".calculator-screen");
  //updating the value HTML attribute....<input class="calculator-screen value="0" ">
  display.value = calculator.displayValue;
}

// input of operands and display in real time on calc screen
function inputDigit(digit) {
  // destructuring displayValue
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

// handing the decimal and its representation on calc
function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }
  if (!calculator.displayValue.includes(dot)) {
    // this prevents multiple '.'
    // append the dot to the display
    calculator.displayValue += dot;
  }
}

// input of Operators + - ? *
function handleOperator(nextOperator) {
  //destructor calculator values you need
  const { firstOperand, displayValue, operator } = calculator;

  //we need to do type casting! String -> Float for arithmetic operations
  const inputValue = parseFloat(displayValue);

  if (operator && calculate.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  // to check whether input is valid
  if (firstOperand === null && !isNaN(inputValue)) {
    // update the firstOperand, we have valid data. NAN = is not a number
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);
    // convert back to string for html format
    calculator.displayValue = String(result);
    calculator.firstOperand = result;
    console.log(calculator);
  }
  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
}

// Performing actual computation
function calculate(firstOperand, secondOperand, operator) {
  // determine the operator and perform that expression
  switch (operator) {
    case "+":
      return firstOperand + secondOperand;
    case "-":
      return firstOperand - secondOperand;
    case "/":
      return firstOperand / secondOperand;
    case "*":
      return firstOperand * secondOperand;
    default:
      console.log("Incorrect Operator!");
      break;
  }
  return secondOperand;
}

// all reset logic
function resetCalc() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
}

// Grab the inputs from HTML and keep track when it gets clicked
// Add event listeners to all buttons
const keys = document.querySelector(".calculator-keys");

keys.addEventListener("click", (e) => {
  const { target } = e;

  // check if the element is a button or not
  // if not, exit this function. This means it is the open empty space
  if (!target.matches("button")) {
    return;
  }

  // Keep track of buttons based on class
  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("decimal")) {
    // console.log("decimal", target.value);
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("all-clear")) {
    resetCalc();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});
