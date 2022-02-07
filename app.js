let operands = [];
let interimSol = 0;
let operator = "";
let currentNum = "";
let solution = document.querySelector('.solution');
let calc_sequence = document.querySelector('.calc-sequence');
let deleteBtn = document.querySelector('.delete');
let clearBtn = document.querySelector('.clear');
let equalBtn = document.querySelector('.equals');

// global Listener for click events
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('num')) {
        calc_sequence.textContent += e.target.textContent;
        currentNum += e.target.textContent;
    } else if (e.target.classList.contains('operator')) {
        operands.push(Number(currentNum));
        // console.log(currentNum);
        updateSum(operator);
        operator = e.target.textContent;
        currentNum = "";
        calc_sequence.textContent += e.target.textContent;
    } else if (e.target.classList.contains('equals')) {
        operands.push(Number(currentNum));
        // console.log(operands);
        // console.log(currentNum);
        updateSum(operator);
        // console.log(operands);
        currentNum = "";
    }
})


// updates the array of operands
function updateSum(operator) {
    if (operands.length == 2) {
        interimSol = operate(operands, operator);
        solution.textContent = interimSol.toString();
        operands = [];
        operands.push(interimSol);
    }
    
};

// deleteLastEntry
function deleteLastEntry() {
    currentNum = currentNum.slice(0,currentNum.length-1);
    calc_sequence.textContent = calc_sequence.textContent.slice(0,calc_sequence.textContent.length-1);
}

// clearAll 
function clearAll() {
    currentNum = '';
    operator = '';
    interimSol = 0;
    operands = [];
    solution.textContent = '';
    calc_sequence.textContent = '';
    currentNum = '';
}

// operations 
function operate(arrOfOperands, operator) {
    switch (operator) {
        case '+':
            return arrOfOperands.reduce((total, value) => {
                return total+value;
            })
        case '−':
            return arrOfOperands.reduce((total, value) => {
                return total-value;
            })
        case '÷':
            return arrOfOperands.reduce((total, value) => {
                return total/value;
            })
        case 'x':
            return arrOfOperands.reduce((total, value) => {
                return total*value;
            })
        default:
            break;
    }
}