const calculator = {
    screen: document.getElementById('calculator-screen'),
    currentValue: '',
    operator: '',
    previousValue: '',
    appendNumber(number) {
        if (this.currentValue.includes('.') && number === '.') return;
        this.currentValue = `${this.currentValue}${number}`;
    },
    chooseOperator(operator) {
        if (this.currentValue === '') return;
        if (this.previousValue !== '') {
            this.calculate();
        }
        this.operator = operator;
        this.previousValue = this.currentValue;
        this.currentValue = '';
    },
    calculate() {
        let result;
        const prev = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operator) {
            case 'add':
                result = prev + current;
                break;
            case 'subtract':
                result = prev - current;
                break;
            case 'multiply':
                result = prev * current;
                break;
            case 'divide':
                result = prev / current;
                break;
            case 'percent':
                result = (prev / 100) * current;
                break;
            default:
                return;
        }
        this.currentValue = result;
        this.operator = '';
        this.previousValue = '';
    },
    updateScreen() {
        this.screen.textContent = this.currentValue;
    },
    clear() {
        this.currentValue = '';
        this.operator = '';
        this.previousValue = '';
    },
    delete() {
        this.currentValue = this.currentValue.slice(0, -1);
    }
};

document.querySelector('.calculator-buttons').addEventListener('click', (event) => {
    const target = event.target;
    const action = target.dataset.action;

    if (!target.matches('button')) return;

    switch (action) {
        case 'clear':
            calculator.clear();
            calculator.updateScreen();
            break;
        case 'delete':
            calculator.delete();
            calculator.updateScreen();
            break;
        case 'calculate':
            calculator.calculate();
            calculator.updateScreen();
            break;
        case 'add':
        case 'subtract':
        case 'multiply':
        case 'divide':
        case 'percent':
            calculator.chooseOperator(action);
            break;
        case 'decimal':
            calculator.appendNumber('.');
            calculator.updateScreen();
            break;
        default:
            calculator.appendNumber(target.textContent);
            calculator.updateScreen();
            break;
    }
});