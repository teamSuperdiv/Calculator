let operands = []
let interimSol
let operator = ''
let currentNum = ''
let equalsClicked = false
let solution = document.querySelector('.solution')
let calc_sequence = document.querySelector('.calc-sequence')
let deleteBtn = document.querySelector('.delete')
let clearBtn = document.querySelector('.clear')
let equalBtn = document.querySelector('.equals')
let point = document.querySelector('.point')

// global Listener for click events
document.addEventListener('click', (e) => {
  if (
    e.target.classList.contains('num') ||
    e.target.classList.contains('percent')
  ) {
    if (containsPoint()) point.disabled = true
    calc_sequence.textContent += e.target.textContent
    currentNum += e.target.textContent
  } else if (e.target.classList.contains('operator')) {
    point.disabled = false
    if (currentNum !== '' ) {
      pushNumberToArr(operands, currentNum)
      updateSum(operator)
      currentNum = ''
      operator = e.target.textContent
      calc_sequence.textContent += operator
    }
  } else if (e.target.classList.contains('equals')) {
    if (currentNum !== '' && operands.length === 1) {
      equalsClicked = true
      pushNumberToArr(operands, currentNum)
      updateSum(operator)
      currentNum = ''
    }
  }
})

// updates the array of operands
function updateSum(operator) {
  if (operands.length === 2) {
    if (!(operator == '÷' && operands[1] == 0)) {
      interimSol = operate(operands, operator)
      solution.textContent = interimSol.toString()
      operands = []
      operands.push(interimSol)
    } else {
      alert('You cannot divide by zero!')
      clearAll()
    }
  }
}

// percentage
function pushNumberToArr(operands, currNum) {
  if (currNum.includes('%')) {
    let num = currNum.slice(0, currNum.length - 1)
    operands.push(Number(num) / 100)
  } else {
    operands.push(Number(currNum))
  }
}

// check if currentNum contains a floating point
function containsPoint() {
  return currentNum.match(/[.]/)
}

// deleteLastEntry
function deleteLastEntry() {
  currentNum = currentNum.slice(0, currentNum.length - 1)
  calc_sequence.textContent = calc_sequence.textContent.slice(
    0,
    calc_sequence.textContent.length - 1
  )
}

// clearAll
function clearAll() {
  currentNum = ''
  operator = ''
  interimSol = 0
  operands = []
  solution.textContent = ''
  calc_sequence.textContent = ''
  currentNum = ''
}

// operations
function operate(arrOfOperands, operator) {
  switch (operator) {
    case '+':
      return arrOfOperands.reduce((total, value) => {
        if (isFloat(value)) {
          return (total + value).toFixed(2)
        } else return total + value
      })
    case '−':
      return arrOfOperands.reduce((total, value) => {
        if (isFloat(value)) {
          return (total - value).toFixed(2)
        } else return total - value
      })
    case '÷':
      return arrOfOperands.reduce((total, value) => {
        if (isFloat(value)) {
          return (total / value).toFixed(2)
        } else return total / value
      })
    case 'x':
      return arrOfOperands.reduce((total, value) => {
        if (isFloat(value)) {
          return (total * value).toFixed(2)
        } else return total * value
      })
    default:
      break
  }
}

// helper: check if number is floating point
function isFloat(n) {
  return n % 1 !== 0
}
