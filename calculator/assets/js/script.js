var left = '';
var operator = '';
var right = '';
var degMode = true;
var shiftActive = false;
var justEvaluated = false;

function appendToResult(value) {
  if (justEvaluated) {
    left = '';
    operator = '';
    right = '';
    justEvaluated = false;
  }
  if (value === '.' && currentInput().includes('.')) return;
  if (operator.length === 0) {
    left += value.toString();
  } else {
    right += value.toString();
  }
  updateResult();
}

function currentInput() {
  return operator.length === 0 ? left : right;
}

function operatorToResult(value) {
  if (justEvaluated) justEvaluated = false;
  if (left.length === 0) return;
  if (right.length > 0) {
    calculateResult();
    left = document.getElementById('result').value;
  }
  operator = value;
  updateResult();
}

function backspace() {
  if (justEvaluated) {
    clearResult();
    return;
  }
  if (right.length > 0) {
    right = right.slice(0, -1);
  } else if (operator.length > 0) {
    operator = '';
  } else if (left.length > 0) {
    left = left.slice(0, -1);
  }
  updateResult();
}

function clearEntry() {
  if (right.length > 0) {
    right = '';
  } else if (operator.length > 0) {
    operator = '';
  } else {
    left = '';
  }
  justEvaluated = false;
  updateResult();
}

function clearResult() {
  left = '';
  operator = '';
  right = '';
  justEvaluated = false;
  updateResult();
}

function calculateResult() {
  if (left.length === 0 || operator.length === 0 || right.length === 0) return;
  var l = parseFloat(left);
  var r = parseFloat(right);
  var result;
  switch (operator) {
    case '+': result = l + r; break;
    case '-': result = l - r; break;
    case '*': result = l * r; break;
    case '/': result = r !== 0 ? l / r : 'Error'; break;
    default: return;
  }
  if (result === 'Error') {
    document.getElementById('result').value = 'Error';
    left = '';
    operator = '';
    right = '';
    return;
  }
  result = parseFloat(result.toFixed(10));
  left = result.toString();
  operator = '';
  right = '';
  justEvaluated = true;
  updateResult();
}

function trigFunction(func) {
  var input = currentInput();
  if (input.length === 0) return;
  var value = parseFloat(input);
  var result;

  if (shiftActive) {
    var invFunc = 'a' + func;
    result = Math[invFunc](value);
    if (degMode) result = result * 180 / Math.PI;
  } else {
    var rad = degMode ? value * Math.PI / 180 : value;
    result = Math[func](rad);
  }

  result = toResult(result);
  setCurrent(result.toString());
  justEvaluated = true;
  updateResult();
}

function toResult(val) {
  if (Math.abs(val) < 1e-14) val = 0;
  return parseFloat(val.toFixed(10));
}

function setCurrent(val) {
  if (operator.length === 0) {
    left = val;
  } else {
    right = val;
  }
}

function toggleMode() {
  degMode = !degMode;
  updateIndicators();
}

function toggleShift() {
  shiftActive = !shiftActive;
  var label = shiftActive ? 'SHIFT' : '';
  document.getElementById('shiftIndicator').textContent = label;
  document.getElementById('shiftBtn').classList.toggle('active', shiftActive);

  var sinBtn = document.getElementById('sinBtn');
  var cosBtn = document.getElementById('cosBtn');
  var tanBtn = document.getElementById('tanBtn');

  if (shiftActive) {
    sinBtn.textContent = 'sin\u207B\u00B9';
    cosBtn.textContent = 'cos\u207B\u00B9';
    tanBtn.textContent = 'tan\u207B\u00B9';
  } else {
    sinBtn.textContent = 'sin';
    cosBtn.textContent = 'cos';
    tanBtn.textContent = 'tan';
  }
}

function updateIndicators() {
  document.getElementById('modeIndicator').textContent = degMode ? 'DEG' : 'RAD';
  document.getElementById('modeBtn').textContent = degMode ? 'DEG' : 'RAD';
}

function updateResult() {
  var display = left + (operator ? ' ' + operator + ' ' : '') + right;
  document.getElementById('result').value = display || '0';
}

document.addEventListener('DOMContentLoaded', function () {
  updateResult();
  updateIndicators();
  document.getElementById('shiftIndicator').textContent = '';
});
