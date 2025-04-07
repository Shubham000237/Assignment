import React, { useState } from 'react'
import { TextField, Box, Stack } from '@mui/material'

import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import BackspaceOutlinedIcon from '@mui/icons-material/BackspaceOutlined';
import { config } from '../../Utils/Config/config'
import { ReusableCalculatorButtons } from './ReusableCalculatorButtons';

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
            const Val = parseFloat(dataStr);
            const Val1 = Val / 100;
            setState((astate) => ({
                ...astate,
                data: `${String(Val1)}`,
                lastResult: String(Val1)
            }));
            return;
        }

        const operator = dataStr.match(config.Regex.operatorMatch) || [];
        const Val1 = dataStr.split(config.Regex.operatorCheck).filter(Boolean);
        const Val2 = parseFloat(Val1[0]) || 0;
        const Val3 = parseFloat(Val1[1]) || 0;
        const parts = parseFloat(Val1[2]) || 0;
        let finalResult;

        if (isNaN(Val2) || isNaN(Val3)) return;

        if (operator.length === 1) {
            let finalResult;

            if (operator[0] === "+") {
                finalResult = Val2 + (Val2 * (Val3 / 100));
            } else if (operator[0] === "-") {
                finalResult = Val2 - (Val2 * (Val3 / 100));
            } else if (operator[0] === "*") {
                finalResult = Val2 * (Val3 / 100);
            } else if (operator[0] === "/") {
                finalResult = Val2 / (Val3 / 100);
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
                firstResult = Val3 * (parts / 100);
            } else if (operator[1] === "/") {
                firstResult = Val3 / (parts / 100);
            } else {
                return;
            }


            if (operator[0] === "+") {
                finalResult = Val2 + firstResult;
            } else if (operator[0] === "-") {
                finalResult = Val2 - firstResult;
            } else if (operator[0] === "/") {
                finalResult = Val2 / firstResult;
            } else if (operator[0] === "*") {
                finalResult = Val2 * firstResult;
            } else {
                return;
            }

            setState((astate) => ({ ...astate, data: String(finalResult.toFixed(2)), lastResult: String(finalResult.toFixed(2)) }));
        }
    };

    const { backgroundColor, buttonColor, operatorButtonColor, textColor, borderColor } = getCustomColor();

    const Val = (value) => {
        const { a: operatorPattern, dots: dotsPattern } = config.Regex;
        const updatedValue = (state.data + value).replace(config.Regex.valRegex, "");
        const val = updatedValue.replace(dotsPattern, ".");

        if (value === '.') {
            const lastNumber = state.data.split(config.Regex.b).pop();
            if (lastNumber.includes('.')) {
                return;
            }
        }

        if (value === '.' && (state.data === "" || /[+\-*/]$/.test(state.data))) {
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
            data: val,
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
                        sx={{ maxWidth: '400px', marginBottom: 1, ml: { sm: 0.5, md: 3.8 }, backgroundColor: 'white', input: { textAlign: 'right', fontSize: 'clamp(16px, 2vw, 24px)' }, borderRadius: '4px' }}
                        variant="outlined"
                        onChange={(event) => {
                            const { a: operatorPattern } = config.Regex;
                            const value = event.target.value;

                            if (/^[+*/%]/.test(value)) {
                                alert(config.message.invalid);
                                return;
                            }

                            if (operatorPattern.test(value)) {
                                alert(config.message.invalid);
                                return;
                            }
                            if (value.startsWith('+') || value.startsWith('-') || value.startsWith('*') || value.startsWith('/') || value.startsWith('%')) {
                                alert(config.message.invalid);
                                return;
                            }

                            if (config.Regex.alphabet.test(value)) {
                                return;
                            }

                            if (value.includes('%')) {
                                value.replace(config.Regex.percentVal, `*(${state.data}/100)`);
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
                    <Stack direction='row' spacing={2} justifyContent={'center'} mb={1}>
                        <ReusableCalculatorButtons
                            onClick={Toggle}
                            backgroundColor={operatorButtonColor}
                            textColor={textColor}
                            icon={state.mode === 'dark' ? <DarkModeIcon /> : <WbSunnyIcon />}
                            isIconButton
                        />
                        <ReusableCalculatorButtons
                            onClick={handlePercentage}
                            value="%"
                            backgroundColor={operatorButtonColor}
                            textColor={textColor}
                        />
                        <ReusableCalculatorButtons
                            onClick={Delete}
                            icon={<BackspaceOutlinedIcon />}
                            value="clr"
                            backgroundColor={operatorButtonColor}
                            textColor={textColor}
                        />
                        <ReusableCalculatorButtons
                            onClick={() => setState(astate => ({ ...astate, data: '', lastResult: null }))}
                            value="AC"
                            backgroundColor={operatorButtonColor}
                            textColor={textColor}
                        />
                    </Stack>
                    <Stack direction='row' spacing={2} justifyContent={'center'} mb={1}>
                        {['7', '8', '9'].map(num => (
                            <ReusableCalculatorButtons
                                key={num}
                                onClick={() => Val(num)}
                                value={num}
                                backgroundColor={buttonColor}
                                textColor={textColor}
                            />
                        ))}
                        <ReusableCalculatorButtons
                            onClick={() => Val('*')}
                            value="X"
                            backgroundColor={operatorButtonColor}
                            textColor={textColor}
                        />
                    </Stack>
                    <Stack direction='row' spacing={2} justifyContent={'center'} mb={1}>
                        {['4', '5', '6'].map(num => (
                            <ReusableCalculatorButtons
                                key={num}
                                onClick={() => Val(num)}
                                value={num}
                                backgroundColor={buttonColor}
                                textColor={textColor}
                            />
                        ))}
                        <ReusableCalculatorButtons
                            onClick={() => Val('-')}
                            value="-"
                            backgroundColor={operatorButtonColor}
                            textColor={textColor}
                        />
                    </Stack>
                    <Stack direction='row' spacing={2} justifyContent={'center'} mb={1}>
                        {['1', '2', '3'].map(num => (
                            <ReusableCalculatorButtons
                                key={num}
                                onClick={() => Val(num)}
                                value={num}
                                backgroundColor={buttonColor}
                                textColor={textColor}
                            />
                        ))}
                        <ReusableCalculatorButtons
                            onClick={() => Val('+')}
                            value="+"
                            backgroundColor={operatorButtonColor}
                            textColor={textColor}
                        />
                    </Stack>
                    <Stack direction='row' spacing={2} justifyContent={'center'} mb={2}>
                        <ReusableCalculatorButtons
                            value="0"
                            onClick={() => Val('0')}
                            backgroundColor={buttonColor}
                            textColor={textColor}
                        />
                        <ReusableCalculatorButtons
                            value="."
                            onClick={() => Val('.')}
                            backgroundColor={buttonColor}
                            textColor={textColor}
                        />
                        <ReusableCalculatorButtons
                            value="="
                            onClick={result}
                            backgroundColor={operatorButtonColor}
                            textColor={textColor}
                        />
                        <ReusableCalculatorButtons
                            value="/"
                            onClick={() => Val('/')}
                            backgroundColor={operatorButtonColor}
                            textColor={textColor}
                        />
                    </Stack>
                </Box>
            </Box>
        </>
    )
}
export { ReusableCalculator };