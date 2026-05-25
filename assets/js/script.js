var left = '';
var operator = '';
var right = '';

function appendToResult(value) {
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
  if (left.length === 0) return;
  if (right.length > 0) {
    calculateResult();
    left = document.getElementById('result').value;
  }
  operator = value;
  updateResult();
}

function backspace() {
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
  updateResult();
}

function clearResult() {
  left = '';
  operator = '';
  right = '';
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
  updateResult();
}

function updateResult() {
  var display = left + (operator ? ' ' + operator + ' ' : '') + right;
  document.getElementById('result').value = display || '0';
}

document.addEventListener('DOMContentLoaded', updateResult);
