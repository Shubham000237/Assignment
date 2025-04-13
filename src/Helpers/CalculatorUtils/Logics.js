import { config } from "../../Utils/Config/config";

export const Toggle = (setState) => {
    setState(previousState => ({
        ...previousState,
        mode: previousState.mode === 'light' ? 'dark' : 'light',
    }));
}

export const handlePercentage = (calculatorState, setCalculatorState) => {
    //data ko number se String convert karne k liye
    const dataStr = String(calculatorState.data).replace(config.Regex.percentVal, "/100");
    //
    if (
        dataStr === "" || config.Regex.dataStr.test(dataStr) || config.Regex.checkDataStr.test(dataStr)
    ) {
        return;
    }
    // for 9%= 9/100= 0.09%
    if (!config.Regex.operatorCheck.test(dataStr)) {
        const Value = parseFloat(dataStr);
        const firstValue = Value / 100;
        const roundedValue = Math.round(firstValue * 100) / 100;
        setCalculatorState((previousState) => ({
            ...previousState,
            data: `${String(roundedValue.toFixed(3))}`,
            lastResult: firstValue
        }));
        return;
    }

    const operator = dataStr.match(config.Regex.operatorMatch) || [];
    const operand = dataStr.split(config.Regex.operatorCheck).filter(Boolean);
    const firstOperand = parseFloat(operand[0]) || 0;
    const secondOperand = parseFloat(operand[1]) || 0;
    const thirdOperand = parseFloat(operand[2]) || 0;
    let finalResult;

    if (isNaN(firstOperand) || isNaN(secondOperand)) return;
    // For 200*10% = 200*0.1 = 20.00%
    if (operator.length === 1) {
        let finalResult;

        if (operator[0] === "+") {
            finalResult = firstOperand + (firstOperand * (secondOperand / 100));
        } else if (operator[0] === "-") {
            finalResult = firstOperand - (firstOperand * (secondOperand / 100));
        } else if (operator[0] === "*") {
            finalResult = firstOperand * (secondOperand / 100);
        } else if (operator[0] === "/") {
            finalResult = firstOperand / (secondOperand / 100);
        } else {
            return;
        }
        setCalculatorState((previousState) => ({
            ...previousState,
            data: finalResult.toFixed(2).toString(),
            lastResult: finalResult.toFixed(2).toString()
        }));
    } else if (operator.length === 2) { // For 200-10% = 200 - (200*10/100) = 180.00%

        let firstResult;

        if (operator[1] === "*") {
            firstResult = secondOperand * (thirdOperand / 100);
        } else if (operator[1] === "/") {
            firstResult = secondOperand / (thirdOperand / 100);
        } else {
            return;
        }

        if (operator[0] === "+") {
            finalResult = firstOperand + firstResult;
        } else if (operator[0] === "-") {
            finalResult = firstOperand - firstResult;
        } else if (operator[0] === "/") {
            finalResult = firstOperand / firstResult;
        } else if (operator[0] === "*") {
            finalResult = firstOperand * firstResult;
        } else {
            return;
        }

        setCalculatorState((previousState) => ({ ...previousState, data: String(finalResult.toFixed(2)), lastResult: String(finalResult.toFixed(2)) }));
    }
};

export const handleCursorUpdate = (event, setCalculatorState) => {
    const position = event.target.selectionStart;
    setCalculatorState(previousState => ({
        ...previousState,
        cursorPosition: position,
    }));
};

export const Delete = (calculatorState, setCalculatorState) => {
    const str = (calculatorState.data).toString();
    if (calculatorState.cursorPosition > 0 || calculatorState.cursorPosition) {
        const newData = str.split('');
        newData.splice(calculatorState.cursorPosition - 1, 1);

        setCalculatorState(previousState => ({
            ...previousState,
            data: newData.join(''),
            cursorPosition: calculatorState.cursorPosition - 1,
        }));
    } else {
        setCalculatorState((previousState) =>
        ({
            ...previousState,
            data: str.slice(0, -1),
            lastResult: null,
        }))
    }
};

export const result = (calculatorState, setCalculatorState) => {
    try {
        let expression = calculatorState.data.trim();

        if (config.Regex.removeOperator.test(expression)) {
            expression = expression.slice(0, -1);
        }

        expression = expression.replace(config.Regex.expression1, "$1");
        expression = expression.replace(config.Regex.expression2, "$1");

        if (expression.includes("*") && expression.split("*").every(num => parseFloat(num) === 0)) {
            setCalculatorState(previousState => ({
                ...previousState,
                data: "0",
                lastResult: "0"
            }));
            return;
        }

        if (config.Regex.noZero.test(expression)) {
            alert(config.message.notBeZero)
            return;
        }

        const calcValue = eval(expression);

        if (isNaN(calcValue)) {
            alert(config.message.invalid);
            return;
        }

        const sum = parseFloat(calcValue).toFixed(2);
        setCalculatorState(previousState => ({
            ...previousState,
            lastResult: (previousState.data.endsWith('.') || previousState.data.startsWith('0.')) ? sum : calcValue,
            data: (previousState.data.endsWith('.') || previousState.data.startsWith('0.')) ? sum : calcValue,
        }));

    } catch {
        alert(config.message.invalid);
    }
};

export const getCustomColor = (calculatorState) => {
    //passing color dynamically
    const { mode } = calculatorState;
    if (mode === 'dark') {
        return {
            backgroundColor: '#333',
            buttonColor: '#f1f1f1',
            operatorButtonColor: '#ff9800',
            textColor: '#000',
            borderColor: '#333'
        };
    }
    return {
        backgroundColor: '#D3D3D3',
        buttonColor: '#000',
        operatorButtonColor: '#1976d2',
        textColor: '#fff',
        borderColor: '#D3D3D3'
    };
};

const Logics = {
    Toggle,
    handlePercentage,
    handleCursorUpdate,
    Delete,
    result,
    getCustomColor,
}
export default Logics;

