document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');

    let currentInput = '';
    let operator = null;
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (!isNaN(value) || value === '.') {
                currentInput += value;
                display.value = currentInput;
            } else if (value === 'Clear') {
                currentInput = '';
                previousInput = '';
                operator = null;
                display.value = '';
            } else if (value === '=') {
                if (currentInput && previousInput && operator) {
                    currentInput = String(calculate(previousInput, currentInput, operator));
                    display.value = currentInput;
                    previousInput = '';
                    operator = null;
                }
            } else {
                if (currentInput) {
                    if (previousInput) {
                        previousInput = String(calculate(previousInput, currentInput, operator));
                    } else {
                        previousInput = currentInput;
                    }
                    currentInput = '';
                    operator = value;
                    display.value = previousInput;
                }
            }
        });
    });

    function calculate(a, b, operator) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num2 !== 0 ? num1 / num2 : 'Error';
            default:
                return 0;
        }
    }
});
