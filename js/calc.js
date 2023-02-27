let calc = document.querySelector("#calc")
let numbers = []

function handleClick(op){
    if(!isNaN(op) || op === ".") {
        calc.innerText += op
    } else {
        console.log(Number(calc.innerText))
        numbers.push(Number(calc.innerText))
        calc = ""
        console.log(numbers);
    }
}