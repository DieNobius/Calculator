const display = document.getElementById('textareaId');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let firstOperand = null;
let expression = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (isNumber(value)) {
            handleNumberInput(value);
        } else if (value === '.') {
            handleDecimalInput();
        } else if (value === '←') {
            handleBackspace();
        } else if (value === 'AC') {
            clearAll();
        } else if (value === '=') {
            calculateResult();
        } else {
            handleOperatorInput(value);
        }
    });
});

function isNumber(value) {
    return value >= '0' && value <= '9';
}

function handleNumberInput(value) {
    currentInput += value;
    expression += value;
    display.value = expression;
}

function handleDecimalInput() {
    if (!currentInput.includes('.')) {
        if (currentInput === '') {
            currentInput += '0.';
            expression += '0.';
        } else {
            currentInput += '.';
            expression += '.';
        }
        display.value = expression;
    }
}

function handleBackspace() {
    if (currentInput) {
        currentInput = currentInput.slice(0, -1);
        expression = expression.slice(0, -1);
        display.value = expression;
    }
}

function clearAll() {
    currentInput = '';
    operator = '';
    firstOperand = null;
    expression = '';
    display.value = '';
}

function calculateResult() {
    if (currentInput && operator) {
        const secondOperand = parseFloat(currentInput);
        const result = calculate(firstOperand, secondOperand, operator);
        display.value = result;
        expression = result.toString();
        resetCalculatorState(result);
    }
}

function handleOperatorInput(value) {
    if (currentInput) {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
        } else {
            const secondOperand = parseFloat(currentInput);
            const result = calculate(firstOperand, secondOperand, operator);
            display.value = result;
            expression = result + ' ';
            firstOperand = result;
        }
        operator = value;
        expression += `${ operator }`;
        currentInput = '';
        display.value = expression;
    }
}

function calculate(first, second, operator) {
    switch (operator) {
        case '+':
            return first + second;
        case '-':
            return first - second;
        case '*':
            return first * second;
        case '/':
            return second !== 0 ? first / second : 'Ошибка: деление на ноль';
        case '%':
            return first * (second / 100);
        default:
            return second;
    }
}
function resetCalculatorState(result) {
    currentInput = '';
    operator = '';
    firstOperand = result;
}
