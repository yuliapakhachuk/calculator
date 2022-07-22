class MathOper {
    getResult(operator, curentValue, resultValue) {
        switch(operator) {
            case "*":
                return Number(resultValue) * Number(curentValue);
            case "/":
                return Number(resultValue) / Number(curentValue);
            case "-":
                return Number(resultValue) - Number(curentValue);
            case "+":
                return Number(resultValue) + Number(curentValue);
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
        this.refs.operators.forEach(operator => operator.addEventListener('click', (e) => this.toMakeMathOperation(e)));
        window.addEventListener('keydown', (e) => this.toMakeMathOperation(e));
        this.refs.equal.addEventListener('click', (e) => this.toGetTotalResult(e));
        this.refs.equal.addEventListener('keydown', (e) => this.toGetTotalResult(e));
        this.refs.backspaceBtn.addEventListener('click', () => this.removeOneNumber());
        this.refs.resetCalc.addEventListener('click', () => this.resetCalculator());
    }
    
    showOnDisplay(e) {
        const availableNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
        let number = e.type === "keydown" ? e.key : e.target.innerText;
        if (!availableNumbers.includes(number)) { return; };
        this.curentValue = `${this.curentValue}` + `${number}`;
        console.log(this.curentValue)
        this.refs.display.innerText = this.curentValue;
    }

    removeOneNumber() {
        this.curentValue.length <= 1 ? 
            this.curentValue = "" :
            this.curentValue = this.curentValue.slice(0, this.curentValue.length - 1);
        this.refs.display.innerText = this.curentValue;
    }
    
    toMakeMathOperation(e) {
        const availableMathOper = ["+", "-", "*", "/"];
        if(e.type === "keydown") {
            if (!availableMathOper.includes(e.key)) {
                return;
            }
        }

        if(!this.operator) {
            this.#result = Number(this.curentValue);
        } else {
            if(this.currentValue) {
                this.#result = super.getResult(this.operator, this.curentValue, this.#result);
                this.refs.display.innerText = this.#result;
            }
        }
        this.operator = e.type === "keydown" ? e.key : (e.target.dataset.value);
        this.recordHistory();
        this.refs.display.innerText = this.#result;
        this.curentValue = "";
    }

    toGetTotalResult() {
        this.clearHistory();
        this.#result = super.getResult(this.operator, this.curentValue, this.#result);
        this.refs.display.innerText = this.#result;
        this.calcMemory.push(this.#result);
        this.curentValue = "";
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
        this.#result = 0;
        this.curentValue = "";
        this.operator;
        this.refs.display.innerText = 0;
        this.clearHistory();
    }
}

const calculator = new Calculator();
const mathOper = new MathOper();
