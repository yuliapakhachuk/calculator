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
        backspaceBtn: document.querySelector('.recet'),
    }

    calcMemory = [];
    #result = 0;
    curentValue = "";
    operator;

    constructor() {
        super();
        this.refs.numKeys.forEach(numKey => numKey.addEventListener('click', (e) => this.showOnDisplay(e)));
        this.refs.operators.forEach(operator => operator.addEventListener('click', (e) => this.toMakeMathOperation(e)));
        this.refs.equal.addEventListener('click', (e) => this.toMakeMathOperation(e));
        // this.backspaceBtn.addEventListener('click', () => removeOneNumber())
    }
    
    showOnDisplay(e) {
        this.curentValue = this.curentValue + `${e.target.innerText}`;
        this.refs.display.innerText = this.curentValue;
    }
    
    toMakeMathOperation(e) {
        if(!this.operator) {
            this.#result = Number(this.curentValue);
            this.operator = (e.target.dataset.value);
        } else {
            this.#result = super.getResult(this.operator, this.curentValue, this.#result);
            this.operator = (e.target.dataset.value);
            this.refs.display.innerText = this.#result;
        }

        e.target.dataset.value === "=" ? 
                    this.clearHistory() : this.recordHistory();
        
        this.curentValue = "";
        this.refs.display.innerText = this.#result;
        console.log(this.calcMemory);
    }

    recordHistory() {
        this.curentValue === "" ? this.calcMemory.push() : this.calcMemory.push(this.curentValue);
        
        const lastHistoryElement = this.calcMemory[this.calcMemory.length - 1];

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
        // this.calcMemory += `${this.curentValue} ${this.operator}`;
        this.refs.calcMemoryElement.innerText = history;
    }

    // removeOneNumber() {

    // }
}

const calculator = new Calculator();
const mathOper = new MathOper();
    