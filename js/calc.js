let calc = document.querySelector("#calc")
let result = document.querySelector("#result")
const possibleOp = ["mais", "menos", "mult", "dividir"]
let isOperating = false
let operation = ""
let numbers = []
let secondNumber = ""
let resultOnScreen = false

function handleClick(op){
    if (resultOnScreen) {
        calc.innerHTML = result.innerHTML
        result.innerHTML = ""
        resultOnScreen = false
    }

    if (isOperating) {
        if(!isNaN(op) || op === ".") {
            calc.innerText += op
            secondNumber += op
        } else {
            if (possibleOp.includes(op) && calc.innerHTML !== ""){
                numbers.push(Number(secondNumber))
                let res = operations[operation]()
                calc.innerHTML = res + " " + operationsOnScreen(op)
                numbers.pop()
                console.log(numbers);
                numbers[0] = Number(res)
                operation = op
                secondNumber = ""
            } else if (op === "porcent" && calc.innerHTML !== "") {
                let res = operations[operation]()
                calc.innerHTML = res
                numbers[0] = res
            }
        }
    } else {
        if(!isNaN(op) || op === ".") {
            calc.innerHTML += op
        } else {
            if (possibleOp.includes(op) && calc.innerHTML !== ""){
                numbers.push(Number(calc.innerText))
                calc.innerHTML += ` ${operationsOnScreen(op)}&nbsp;` 
                isOperating = true
                operation = op
            } else if (op === "porcent" && calc.innerHTML !== "") {
                calc.innerText = Number(calc.innerText) / 100
                operation = op
            }
        }
    }

    if (op === "igual" && calc.innerHTML !== "" && secondNumber !== "") {
        numbers.push(Number(secondNumber))
        let res = operations[operation]()
        result.innerHTML = res
        isOperating = false
        operation = ""
        numbers = []
        secondNumber = ""
        calc.innerHTML = ""
        resultOnScreen = true
    }

    if (op === "apagar") {
        isOperating = false
        operation = ""
        numbers = []
        secondNumber = ""
        resultOnScreen = false
        calc.innerHTML = ""
        result.innerHTML = ""
    }
}

const operations = {
    mais() {return numbers[0] + numbers[1]},
    menos() {return numbers[0] - numbers[1]},
    mult() {return numbers[0] * numbers[1]},
    dividir() {
        if (numbers[1] !== 0) {
            return numbers[0] / numbers[1]
        } else {
            return "erro"
        }
    }
}

function operationsOnScreen(op) {
    switch (op) {
        case "mais":
            return "+"
        case "menos":
            return "-"
        case "mult":
            return "x"
        case "dividir":
            return "/"
    }
}
