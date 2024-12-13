const expression_space = document.getElementById("operation")
const answer_space = document.getElementById("answer")
const history_space = document.querySelector(".history-content");
const placeholderText = document.getElementById("placeholder")

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

let expression = expression_space.value || ""
let answer = answer_space.value || 0
let isOpen = false
let counter = 0

const createHistoryContent = (operation, answer)=>{
    const operationAnsContainer = document.createElement('div')
    operationAnsContainer.className = "operation-answer"
    operationAnsContainer.innerHTML = `
                <div class="operation-answer">
                    <p class="history-operation">${operation}</p>
                    <p class="history-answer">${answer}</p>
                </div>
    `

    return operationAnsContainer
}

const updateInterface = ()=>{
    expression_space.value =expression
    answer_space.innerHTML = answer
}

const makeCalculations = ()=>{

    //put * where there is a match
    let regularExp =  /(?<=[\d\)])\(/g
    let updateExp = expression.replace(regularExp, '*(')

    //replace × with *, and ÷ with / 
    let newExpression = updateExp.replace(/×/g, "*")
    let finalExpression = newExpression.replace(/÷/g, "/")

    return Function('"use strict"; return (' + finalExpression + ')')()
}

const clickNumber = (element)=>{
    const number = element.getAttribute('data-number')
   
    if(expression == "0")
        expression = number
    else
        expression = expression + ""+number
    
    updateInterface()
}

const clickOperator = (element)=>{
    const operator = element.getAttribute('data-value')

    if(expression == 0)
        expression = number
    else if(answer == 0)
        expression = expression + ""+operator
    else{
        expression = (makeCalculations() + operator)+""
        answer = 0
    }

    updateInterface()
}

const clearNumbers = ()=>{
    expression = "0"
    answer = 0
    updateInterface()
}

const addParenthesis = ()=>{
    
    let lastChar = expression.slice(-1);
    let isOpen = false
    let difference  = (expression.split("(").length - 1) - (expression.split(")").length - 1)
    
    if(expression.lastIndexOf("(") > expression.lastIndexOf(")"))
        isOpen = true
    
    if(expression == "" || expression == "0"){
        expression = "("
    }else if(isOpen && !isNaN(Number(lastChar))){
        expression = expression + ")"
    }else if(isOpen && isNaN(Number(lastChar)))
        expression = expression + "("
    else if(!isOpen && difference > 0)
        expression = expression + ")"
    else
        expression = expression + "("


    updateInterface()
}

const findLastOperatorInd = ()=>{
    const lastDevideIndex = expression.lastIndexOf("÷");
    const lastMultiplyIndex = expression.lastIndexOf("×");
    const lastPlusIndex = expression.lastIndexOf("+");
    const lastMinusIndex = expression.lastIndexOf("-");

    let lastIndex = -1

    if(lastDevideIndex > lastIndex)
        lastIndex = lastDevideIndex
    
    if(lastMultiplyIndex > lastIndex)
        lastIndex = lastMultiplyIndex

    if(lastPlusIndex > lastIndex)
        lastIndex = lastPlusIndex

    if(lastMinusIndex > lastIndex)
        lastIndex = lastMinusIndex

    return lastIndex
}

const findPercenatage = ()=>{

    let lastIndex = findLastOperatorInd()

   if(lastIndex >-1 && answer ==0)
     expression = ( expression.slice(0, lastIndex+1) +  Function('"use strict"; return (' +  expression.slice(lastIndex+1)  + ')')()/100)+""
   else{
       expression =  (makeCalculations()/100)+""
       answer = 0
   }

    updateInterface()

}

const negateNum = ()=>{
    let lastIndex = findLastOperatorInd()

    if(lastIndex > -1 && answer ==0)
        expression = expression.slice(0, lastIndex+1)+"(-"+ expression.slice(lastIndex+1)+")"
    else{
        expression = (makeCalculations()* -1)+""
        answer = 0
    }
    updateInterface()
}

const addComma = ()=>{
    expression = expression + "."
    updateInterface()
}

const clearHistory = ()=>{
    history_space.innerHTML = ""
    placeholderText.innerHTML = "No calculations made yet"
    placeholderText.style.display = "block"

    history_space.appendChild(placeholderText)
}

const deleteNum = ()=>{
    expression = expression.slice(0,-1)
    updateInterface()
}

const clickEqualsBtn = ()=>{
    const value = makeCalculations()
    
    history_space.appendChild(createHistoryContent(expression+" =", value))
    answer_space.innerHTML= value
    answer =value
    placeholderText.style.display = history_space.children.length >1 ?"none":"block"
    updateInterface()
}

expression_space.addEventListener("input", e=>expression = e.target.value)

clearNumBtn.addEventListener('click', clearNumbers)
parenthesisBtn.addEventListener('click', addParenthesis)
percentageBtn.addEventListener('click', findPercenatage)
negationBtn.addEventListener('click', negateNum)
commaBtn.addEventListener('click', addComma)
equalsBtn.addEventListener('click', clickEqualsBtn)
clearBtn.addEventListener('click', clearHistory)
deleteBtn.addEventListener('click', deleteNum)



