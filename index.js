class MathOper {
    getResult(operator, curentValue, resultValue) {
        switch(operator) {
            case "*":
                return Number(resultValue) * Number(curentValue);
            case "/":
                return Number(resultValue) / Number(curentValue);
            case "-":
                return ((Number(resultValue) * 1000000) - (Number(curentValue) * 1000000)) / 1000000;
            case "+":
                return ((Number(resultValue) * 1000000) + (Number(curentValue) * 1000000)) / 1000000;
        }
    }

    checkIsError(curentValue, operator) {
        if(curentValue === "0" && operator === "/") {
            return true;
        } else {
            return false;
        }
    }
}

class Calculator extends MathOper {
    refs = {
        display: document.querySelector('.calc__display'),
        numKeys: document.querySelectorAll('.number__btn'),
        operators: document.querySelectorAll('.operator__btn'),
        equal: document.querySelector('.result'),
        calcMemoryElement: document.querySelector('.calculator__memory'),
        backspaceBtn: document.querySelector('.reset'),
        resetCalc: document.querySelector('.resetAC'),
    }

    calcMemory = [];
    #result = 0;
    curentValue = "";
    operator;

    constructor() {
        super();
        this.refs.numKeys.forEach(numKey => numKey.addEventListener('click', (e) => this.showOnDisplay(e)));
        window.addEventListener('keydown', (e) => this.showOnDisplay(e));
        this.refs.operators.forEach(operator => operator.addEventListener('click', (e) => this.makeMathOperation(e)));
        window.addEventListener('keydown', (e) => this.makeMathOperation(e));
        this.refs.equal.addEventListener('click', (e) => this.getTotalResult(e));
        this.refs.backspaceBtn.addEventListener('click', () => this.removeOneNumber());
        this.refs.resetCalc.addEventListener('click', () => this.resetCalculator());
        window.addEventListener('keydown', (e) => this.contolKeyboard(e));
    }
    
    showOnDisplay(e) {
        const availableNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
        let number = e.type === "keydown" ? e.key : e.target.innerText;
        if (!availableNumbers.includes(number)) { return; };
        if (this.curentValue.slice(-1) === "." && number === ".") { return; }
        this.curentValue = (`${this.curentValue}` + `${number}`).slice(0, 10);
        this.refs.display.innerText = this.curentValue;
    }

    removeOneNumber() {
        if(!this.curentValue) {return}
        let nuberOnDisplay = this.refs.display.innerText;
        if(nuberOnDisplay.length <= 1) {
            nuberOnDisplay = "";
        } else {
            nuberOnDisplay = nuberOnDisplay.slice(0, nuberOnDisplay.length - 1);
        }
        this.curentValue = nuberOnDisplay;
        this.refs.display.innerText = this.curentValue;

        console.log(this.curentValue);
        console.log(this.#result);
        console.log(this.operator);
        console.log(this.calcMemory);
    }

    imposibleMathOperation() {
        const isError = super.checkIsError(this.curentValue, this.operator);
        if(isError) {
            alert("Error! Division by ZERO is prohibited");
            this.resetCalculator();
        }
    }
    
    makeMathOperation(e) {
        const availableMathOper = ["+", "-", "*", "/"];
        if(e.type === "keydown") {
            if (!availableMathOper.includes(e.key)) { return; }
        }
        if(!this.operator) {
            this.#result = Number(this.curentValue);
        } else {
            if(!this.curentValue) {
                this.curentValue === this.#result;
            } else {
                this.#result = super.getResult(this.operator, this.curentValue, this.#result);
                this.imposibleMathOperation();
            }
            this.refs.display.innerText = this.#result;
        }
        this.operator = e.type === "keydown" ? e.key : (e.target.dataset.value);
        this.recordHistory();
        this.refs.display.innerText = this.#result;
        this.curentValue = "";
    }

    getTotalResult() {
        this.clearHistory();
        console.log(this.curentValue);
        console.log(this.#result);
        console.log(this.operator);
        console.log(this.calcMemory);

        if(!this.curentValue) {
            this.curentValue === this.#result;
        } else {
            if (!this.operator) {
                this.#result = this.curentValue;
                return;
            }
            this.#result = super.getResult(this.operator, this.curentValue, this.#result);
            this.imposibleMathOperation();
        }
        this.refs.display.innerText = this.#result;
        this.calcMemory.push(this.#result);
        // this.recordHistory();
        this.curentValue = "";
        // this.operator = !this.operator;

        console.log(this.curentValue);
        console.log(this.#result);
        console.log(this.operator);
        console.log(this.calcMemory);
    }

    recordHistory() {
        if (this.curentValue) {
            this.calcMemory.push(this.curentValue);
        }
        const lastHistoryElement = this.calcMemory.at(-1);
        !isNaN(Number(lastHistoryElement)) ? 
            this.calcMemory.push(this.operator) : 
            this.calcMemory[this.calcMemory.length - 1] = this.operator;
        this.showCalcHistory();
    }

    clearHistory() {
        this.calcMemory = [];
        this.refs.calcMemoryElement.innerText = "";
    }
    
    showCalcHistory() {
        const history = this.calcMemory.join("");
        this.refs.calcMemoryElement.innerText = history;
    }

    resetCalculator() {
        this.clearHistory();
        this.#result = 0;
        this.curentValue = "";
        this.operator = !this.operator;
        this.refs.display.innerText = 0;

        // console.log(this.curentValue);
        // console.log(this.#result);
        // console.log(this.operator);
        // console.log(this.calcMemory);
    }

    contolKeyboard(e) {
        switch(e.key) {
            case "Enter":
                this.getTotalResult();
                break;
            case "=":
                this.getTotalResult();
                break;
            case "Backspace":
                this.removeOneNumber();
                break;
        }
    }
}

const calculator = new Calculator();
const mathOper = new MathOper();
