const expression_space = document.getElementById("operation")
const answer_space = document.getElementById("answer")

//buttons
const equalsBtn = document.getElementById("equals-btn")
const parenthesisBtn = document.getElementById("parenthesis-btn")
const percentageBtn = document.getElementById("percentage-btn")
const negationBtn = document.getElementById("negation-btn")
const commaBtn = document.getElementById("comma-btn")

//clearing buttons
const clearNumBtn = document.getElementById("clear-num-btn")
const deleteBtn = document.getElementById("delete-btn")
const clearBtn = document.getElementById("clear-btn")


let expression = expression_space.value || 0
let answer = answer_space.value || 0

const clickNumber = (element)=>{
    const number = element.getAttribute('data-number')
    expression += number+" "
}

const clickOperator = (element)=>{
    const operator = element.getAttribute('data-value')
    alert(operator)
}

const clearNumbers = ()=>{
    alert("zero")
}

const addParenthesis = ()=>{
    alert("one")
}

const findPercenatage = ()=>{
    alert("zero")
}

const negateNum = ()=>{
    alert("one")
}

const addComma = ()=>{
    alert("zero")
}

const clickEqualsBtn = ()=>{
    alert("=")
}

const clearHistory = ()=>{
    alert("zero")
}

const deleteNum = ()=>{
    alert("one")
}

console.log(expression+" "+answer)
expression_space.value =expression
answer_space.innerHTML = answer

clearNumBtn.addEventListener('click', clearNumbers)
parenthesisBtn.addEventListener('click', addParenthesis)
percentageBtn.addEventListener('click', findPercenatage)
negationBtn.addEventListener('click', negateNum)
commaBtn.addEventListener('click', addComma)
equalsBtn.addEventListener('click', clickEqualsBtn)
clearBtn.addEventListener('click', clearHistory)
deleteBtn.addEventListener('click', deleteNum)



