import React, { useState } from 'react'
import { Box, Stack, TextField } from '@mui/material'

import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { config } from '../../Utils/Config/config'
import { ReusableCalculatorButtons } from './ReusableCalculatorButtons';
import { CalculatorField } from '../../Utils/Helpers/ObjectList/CalculatorField';
import CustomCalcTextField from '../CalculatorTextField/CustomCalcTextField';

const ReusableCalculator = () => {
    const [state, setState] = useState({
        data: "",
        lastResult: null,
        mode: 'light',
        cursorPosition: 0,
    });

    const Toggle = () => {
        setState(astate => ({
            ...astate,
            mode: astate.mode === 'light' ? 'dark' : 'light',
        }));
    }

    const handleButtonClick = (value) => {
        // Use ternary logic for each button action
        if (value === "AC") {
            setState({ ...state, data: "", lastResult: null });
        } else if (value === "%") {
            handlePercentage();
        } else if (value === "clr") {
            Delete();
        } else if (value === "=") {
            result();
        }else if (value === "toggle") {
            Toggle();
        } 
        else {
            handleCalculatorInput(value);
        }
    };

    const getCustomColor = () => {
        const { mode } = state;
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

    const handlePercentage = () => {
        const dataStr = String(state.data).replace(config.Regex.percentVal, "/100");
        if (
            dataStr === "" || config.Regex.dataStr.test(dataStr) || config.Regex.checkDataStr.test(dataStr)
        ) {
            return;
        }

        if (!config.Regex.operatorCheck.test(dataStr)) {
            const Value = parseFloat(dataStr);
            const firstValue = Value / 100;
            setState((astate) => ({
                ...astate,
                data: `${String(firstValue)}`,
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
            setState((astate) => ({
                ...astate,
                data: finalResult.toFixed(2).toString(),
                lastResult: finalResult.toFixed(2).toString()
            }));
        } else if (operator.length === 2) {

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

            setState((astate) => ({ ...astate, data: String(finalResult.toFixed(2)), lastResult: String(finalResult.toFixed(2)) }));
        }
    };

    const { backgroundColor, buttonColor, operatorButtonColor, textColor, borderColor } = getCustomColor();

    const handleCalculatorInput = (value) => {
        const { a: operatorPattern, dots: dotsPattern } = config.Regex;
        const input = state.data + value
        const updatedValue = input.replace((config.Regex.valRegex), "");
        const cleanedValue = updatedValue.replace(config.Regex.valRegex1, "")
        const finalValue = cleanedValue.replace(dotsPattern, ".");

        if (value === '.') {
            const lastNumber = input.split(config.Regex.b).pop();
            if (lastNumber.includes('.')) {
                return;
            }
        }

        if (value === '.' && (input === "" || config.Regex.dataStr.test(input))) {
            setState((astate) =>
            ({
                ...astate,
                data: astate.data + '0.',
                lastResult: null,
            }))
            return;
        }
        //handle to replace oldvalue with new value
        if (state.lastResult !== null) {
            const operators = ['+', '-', '*', '/', '%'];

            if (operators.includes(value)) {
                // If value is operator, append it to last result
                setState((astate) => ({
                    ...astate,
                    data: astate.lastResult + value,
                    lastResult: null
                }));
            } else {
                // Otherwise, replace the result (starting new input)
                setState((astate) => ({
                    ...astate,
                    data: value,
                    lastResult: null
                }));
            }
            return;
        }

        if (config.Regex.alphabet.test(value)) {
            return;
        }

        if (operatorPattern.test(state.data + value)) {
            alert(config.message.invalid);
            return;
        }

        if (state.data === "" && (config.Regex.c).test(value)) {
            alert(config.message.invalid);
            return;
        }

        setState((astate) => ({
            ...astate,
            data: finalValue,
        }));
    };

    const result = () => {
        try {
            let expression = state.data.trim();

            if (config.Regex.removeOperator.test(expression)) {
                expression = expression.slice(0, -1);
            }

            expression = expression.replace(config.Regex.expression1, "$1");
            expression = expression.replace(config.Regex.expression2, "$1");

            if (expression.includes("*") && expression.split("*").every(num => parseFloat(num) === 0)) {
                setState(astate => ({
                    ...astate,
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
            setState(astate => ({
                ...astate,
                lastResult: sum,
                data: (astate.data.endsWith('.') || astate.data.startsWith('0.')) ? sum : calcValue,
            }));

        } catch {
            alert(config.message.invalid);
        }
    };

    const handleCursorUpdate = (event) => {
        const position = event.target.selectionStart;
        setState(astate => ({
            ...astate,
            cursorPosition: position,
        }));
    };

    const Delete = () => {
        const str = (state.data).toString();
        if (state.cursorPosition > 0 || state.cursorPosition) {
            const newData = str.split('');
            newData.splice(state.cursorPosition - 1, 1);

            setState(astate => ({
                ...astate,
                data: newData.join(''),
                cursorPosition: state.cursorPosition - 1,
            }));
        } else {
            setState((astate) =>
            ({
                ...astate,
                data: str.slice(0, -1),
                lastResult: null,
            }))
        }
    };

    return (
        <>
            <Box sx={{ backgroundColor: backgroundColor, borderRadius: '8px', border: '2px solid', borderColor: borderColor, width: { xs: '90vw', sm: '70vw', md: '40vw', lg: '25vw' }, ml: { xs: '12vw', sm: '20vw', md: '35vw' }, mt: 2 }}>
                <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                    {state.mode === 'dark' ? (<h2 style={{ color: '#fff' }}>Calculator</h2>) : (<h2 style={{ color: '#000' }}>Calculator</h2>)}</Box>
                <Box mb={1}>
                    <TextField
                        label={""}
                        type="text"
                        value={state.data}
                        sx={{ maxWidth: '400px', marginBottom: 1, ml: { sm: 0.5, md: 5 }, backgroundColor: 'white', input: { textAlign: 'right', fontSize: 'clamp(16px, 2vw, 24px)' }, borderRadius: '4px' }}
                        variant="outlined"
                        onChange={(event) => {
                            const value = event.target.value;

                            if (value.startsWith('+') || value.startsWith('-') || value.startsWith('*') || value.startsWith('/') || value.startsWith('%')) {
                                alert(config.message.invalid);
                                return;
                            }

                            if (value === "" || config.Regex.dataStr.test(value) || config.Regex.checkDataStr.test(value)) {
                                return;
                            }

                            handleCursorUpdate(event);
                        }}
                        onClick={(event) => handleCursorUpdate(event)}
                        onKeyUp={(event) => handleCursorUpdate(event)}
                    />
                </Box>
                <Box>
                    <Box>
                        {CalculatorField.map((row, rowIndex) => (
                            <Stack
                                direction="row"
                                spacing={2}
                                justifyContent="center"
                                mb={rowIndex === CalculatorField.length - 1 ? 2 : 1}
                                key={rowIndex}
                            >
                                {row.map((button, buttonIndex) => (
                                    <ReusableCalculatorButtons
                                        key={buttonIndex}
                                        value={button.value}
                                        icon={ button.value === "toggle" ? (state.mode === 'dark' ? <WbSunnyIcon /> : <DarkModeIcon />): null }
                                        onClick={() => handleButtonClick(button.value)}
                                        backgroundColor={
                                            button.value === "toggle" ? operatorButtonColor : buttonColor && 
                                            (
                                                button.value ==="%" || 
                                                button.value ==="clr" || 
                                                button.value ==="AC" || 
                                                button.value ==="-" || 
                                                button.value ==="+" || 
                                                button.value ==="*" || 
                                                button.value ==="/" || 
                                                button.value ==="="
                                            ) ? operatorButtonColor:buttonColor}
                                        textColor={textColor}
                                        isIconButton={button.isIconButton}
                                    />
                                ))}
                            </Stack>
                        ))}
                    </Box>
                </Box>
            </Box>
        </>
    )
}
export { ReusableCalculator };