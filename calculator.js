class Calculator {
  constructor(resultDisplayTextElement, inputDisplayTextElement) {
    this.resultDisplayTextElement = resultDisplayTextElement;
    this.inputDisplayTextElement = inputDisplayTextElement;
    this.clear();
  }

  arabRom(number) {
    const romanNumbers = {
      1: {
        1: "I",
        2: "II",
        3: "III",
        4: "IV",
        5: "V",
        6: "VI",
        7: "VII",
        8: "VIII",
        9: "IX",
      },
      2: {
        1: "X",
        2: "XX",
        3: "XXX",
        4: "XL",
        5: "L",
        6: "LX",
        7: "LXX",
        8: "LXXX",
        9: "XC",
      },
      3: {
        1: "C",
        2: "CC",
        3: "CCC",
        4: "CD",
        5: "D",
        6: "DC",
        7: "DCC",
        8: "DCCC",
        9: "CM",
      },
      4: {
        1: "M",
        2: "MM",
        3: "MMM",
      },
    };
    const numbString = number.toString();
    const numbArr = Array.from(numbString);
    const romanNumbArray = new Array();
    if (Number.isInteger(number) == false) return "WRONG INPUT";
    for (let i = numbArr.length, j = 0; i >= 0, j < numbArr.length; i--, j++) {
      if (Number(numbArr[j]) == 0) continue;
      romanNumbArray.push(romanNumbers[i][Number(numbArr[j])]);
    }
    return romanNumbArray.join("");
  }

  clear() {
    this.inputDisplay = "";
    this.resultDisplay = "";
    this.operation = undefined;
  }

  delete() {
    this.inputDisplay = this.inputDisplay.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.inputDisplay.includes(".")) return;
    this.inputDisplay = this.inputDisplay.toString() + number.toString();
  }
  appendRomanNumber(romanCharacter) {
    if (rc.includes(romanCharacter) === false) return;
    this.inputDisplay = this.inputDisplay + romanCharacter;
  }
  chooseOperation(operation) {
    if (this.inputDisplay === "") return;
    if (this.resultDisplay !== "") {
      this.compute();
    }
    this.operation = operation;
    this.resultDisplay = this.inputDisplay;
    this.inputDisplay = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.resultDisplay);
    const current = parseFloat(this.inputDisplay);
      switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "X":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      case "arab-rom":
        computation = this.arabRom(prev);

        break;
      default:
    }
    this.inputDisplay = computation;
    this.operation = undefined;
    this.resultDisplay = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = number;
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.inputDisplayTextElement.innerText = this.getDisplayNumber(
      this.inputDisplay
    );
    if (this.operation != null) {
      this.resultDisplayTextElement.innerText = `${this.getDisplayNumber(
        this.resultDisplay
      )} ${this.operation}`;
    } else {
      this.resultDisplayTextElement.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll(".number");
const operationButtons = document.querySelectorAll(".operations");
const equalsButton = document.querySelector(".equals");
const deleteButton = document.querySelector(".DEL");
const allClearButton = document.querySelector(".AC");
const resultDisplayTextElement = document.querySelector(".result-display");
const inputDisplayTextElement = document.querySelector(".input-display");

const calculator = new Calculator(
  resultDisplayTextElement,
  inputDisplayTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
addEventListener("keyup", function (e) {
  if (rc.includes(e.key) == false) return;
  calculator.appendRomanNumber(e.key);
  calculator.updateDisplay();
});
