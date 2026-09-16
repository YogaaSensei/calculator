const display = document.getElementById('display');
const operatorButtons = document.querySelectorAll('.operator');
const numberButtons = document.querySelectorAll('.number');
const resultButton = document.querySelector('.result');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');
const deleteButton = document.querySelector('.delete');

let previousInput = '';
let currentInput = '';
let operator = undefined;

function updateDisplay() {
    if (operator != null) {
        display.value = `${previousInput} ${operator} ${currentInput}`;
    } else {
        display.value = currentInput;
    }
}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentInput += button.dataset.value;
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput === '' && previousInput === '') return; 
        
        if (previousInput !== '' && currentInput !== '') {
            calculate(); 
        }

        operator = button.dataset.value;
        if (currentInput !== '') {
            previousInput = currentInput; 
            currentInput = '';            
        }
        updateDisplay();
    })
});

function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    // Logika perhitungan manual
    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': 
            if (current === 0) {
                alert("Tidak bisa membagi dengan nol!");
                return;
            }
            result = prev / current; 
            break;
        default: return;
    }

    currentInput = result.toString();
    operator = undefined; // Reset operator
    previousInput = '';   // Reset angka pertama
}

// Tombol Sama Dengan (=)
resultButton.addEventListener('click', () => {
    calculate();
    updateDisplay();
});

// Tombol C (Clear)
clearButton.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = undefined;
    display.value = '';
});

// Tombol Titik (Desimal)
decimalButton.addEventListener('click', () => {
    if (currentInput.includes('.')) return;
    if (currentInput === '') currentInput = '0'; 
    currentInput += '.';
    updateDisplay();
});

// Tombol DEL
deleteButton.addEventListener('click', () => {
    if (currentInput !== '') {
        currentInput = currentInput.slice(0, -1);
    } else if (operator != null) {
        operator = undefined;
        currentInput = previousInput;
        previousInput = '';
    }
    updateDisplay();
});