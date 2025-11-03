const display = document.getElementById("display");
let readOnly = false;
let fullnumber = false;
const buttonValues = [
  "AC",
  "+/-",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "0",
  ".",
  "=",
];
const topValues = ["AC", "+/-", "%"];
const rightValues = ["÷", "×", "-", "+", "="];
const buttons_container = document.getElementById("buttons_container");
let A = 0;
let operator = null;
let B = null;

for (let i = 0; i < buttonValues.length; i++) {
  const btn = document.createElement("button");
  btn.textContent = buttonValues[i];
  if (buttonValues[i] == "0") {
    btn.style.gridColumn = "span 2";
    btn.style.width = "6em";
  } else if (topValues.includes(buttonValues[i])) {
    btn.style.backgroundColor = "white";
    btn.style.color = "black";
  } else if (rightValues.includes(buttonValues[i])) {
    btn.style.backgroundColor = "orange";
  }
  btn.addEventListener("click", function () {
    if (btn.textContent == "0") {
      if (!readOnly) {
        if (display.value != "0") display.value += "0";
      } else {
        display.value = "";
        if (display.value != "0") display.value += "0";
      }
    } else if (btn.textContent == ".") {
      if (!readOnly) {
        if (!display.value.includes(".")) {
          if (display.value != "") {
            display.value += ".";
          } else {
            display.value += "0";
            display.value += ".";
          }
        }
      } else {
        display.value = "";
        if (!display.value.includes(".")) {
          if (display.value != "") {
            display.value += ".";
          } else {
            display.value += "0";
            display.value += ".";
          }
        }
      }
    } else if (topValues.includes(btn.textContent)) {
      if (btn.textContent == topValues[0]) {
        readOnly = false;
        display.value = "";
        clearAll();
      } else if (btn.textContent == topValues[1]) {
        if (display.value != "") {
          if (display.value[0] != "-") {
            display.value = "-" + display.value;
          } else {
            display.value = display.value.slice(1);
          }
        }
      } else {
        display.value = Number(display.value) / 100;
      }
    } else if (rightValues.includes(btn.textContent)) {
      if (btn.textContent != "=") {
        readOnly = false;
        if (A != 0) {
          B = Number(display.value);
          display.value = "";
          calculate();
          clearAll();
          operator = btn.textContent;
          readOnly = true;
          fullnumber = true;
          A = Number(display.value);
        } else if (A == 0) {
          if (operator == null) {
            A = Number(display.value);
            display.value = "";
            operator = btn.textContent;
          }
        }
      } else {
        if (!readOnly) {
          if (operator != null) {
            B = Number(display.value);
            calculate();
            readOnly = true;
            fullnumber = true;
          }
        } else {
          B = Number(display.value);
          display.value = "";
          calculate();
          clearAll();
          readOnly = true;
          fullnumber = true;
        }
      }
    } else {
      if (readOnly && fullnumber) {
        display.value = "";
        display.value += btn.textContent;
        fullnumber = false;
      } else {
        display.value += btn.textContent;
      }
    }
  });
  buttons_container.appendChild(btn);
}

function clearAll() {
  A = 0;
  operator = null;
  B = null;
}

function calculate() {
  switch (operator) {
    case "+":
      display.value = A + B;

      break;

    case "-":
      display.value = A - B;

      break;

    case "×":
      display.value = A * B;

      break;

    case "÷":
      display.value = A / B;

      break;
  }
  clearAll();
}
