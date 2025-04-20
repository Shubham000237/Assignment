import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import { Header, CustomTextField, CustomButton } from '../../Components'
import { config, CalculatorData, textFieldsData } from '../../Utils'
import { Delete, modeToggle, getCustomColor, handleCursorUpdate, handlePercentage, result } from '../../Helpers';

const Calculator = () => {
    const navigate = useNavigate();
    
    const operatorButtons = ["%", "clr", "AC", "-", "+", "*", "/", "="];
    const startWithOperator = ['+', '-', '*', '/', '%']

    const [calculatorState, setCalculatorState] = useState({
        data: "",
        lastResult: null,
        mode: 'light',
        cursorPosition: 0,
    });

    const handleKeyPress = (value) => {
        const actions = {
            "AC": () => setCalculatorState((previousState) => ({ ...previousState, data: "", lastResult: null })),
            "%": () => handlePercentage(calculatorState, setCalculatorState),
            "clr": () => Delete(calculatorState, setCalculatorState),
            "=": () => result(calculatorState, setCalculatorState),
            "toggle": () => modeToggle(setCalculatorState)
        };
        (actions[value] || (() => handleExpressionInput(value)))();
    };

    const { backgroundColor, buttonColor, operatorButtonColor, textColor, borderColor } = getCustomColor(calculatorState); // created a function and calling the components so that component call krne me aasani hogi

    //Logics ko control karega taaki calculator ki functionality sahi call ho sake
    const handleExpressionInput = (value) => {

        const { a: operatorPattern, dots: dotsPattern } = config.Regex;
        const inputValue = calculatorState.data + value
        const updatedValue = inputValue.replace((config.Regex.valRegex), "");
        const cleanedValue = updatedValue.replace(config.Regex.valRegex1, "")
        const finalValue = cleanedValue.replace(dotsPattern, ".");

        //decimal 0.2 except kare naaki 0.2.2.2
        if (value === '.') {
            const inputValue = calculatorState.data.toString();

            // Check if last char is an operator (using dataStr)
            if (inputValue === '' || config.Regex.dataStr.test(inputValue)) {
                setCalculatorState(prev => ({
                    ...prev,
                    data: prev.data + '0.',
                    lastResult: null
                }));
                return;
            }

            // Split input by operators to get last number part
            const lastNumber = inputValue.split(config.Regex.b).pop();

            // If last number already contains a dot, block it
            if (lastNumber.includes('.')) return;

            setCalculatorState(prev => ({
                ...prev,
                data: prev.data + '.',
                lastResult: null
            }));
            return;
        }

        //handle to replace oldvalue with new value
        if (calculatorState.lastResult !== null) {
            const operators = ['+', '-', '*', '/', '%'];

            if (operators.includes(value)) {
                // If value is operator, then it will continue to it's last result
                setCalculatorState((previousState) => ({
                    ...previousState,
                    data: previousState.lastResult + value,
                    lastResult: null
                }));
            } else {
                // Otherwise, replace the result with new value
                setCalculatorState((previousState) => ({
                    ...previousState,
                    data: value,
                    lastResult: null
                }));
            }
            return;
        }

        // Alphabet accept na kare
        if (config.Regex.alphabet.test(value)) {
            return;
        }

        // agar operator do baar use kiya (eg:++) to error message show kare
        if (operatorPattern.test(calculatorState.data + value)) {
            alert(config.message.invalid);
            return;
        }
        if (calculatorState.data === "" && startWithOperator.includes(value)) {
            alert(config.message.invalid);
            return;
        }

        setCalculatorState((previousState) => ({
            ...previousState,
            data: finalValue,
        }));
    };

    //Textfiled k logics handle kr raha hai
    const handleTextFieldChange = (event) => {
        const triggerValue = event.target.value;

        //Agar value empty ho ya value k baad operator laga ho (eg:12+= no return) ya 1/100 mile to return kuch nahi hoga
        if (triggerValue.trim() === "" || config.Regex.dataStr.test(triggerValue) || config.Regex.checkDataStr.test(triggerValue)) {
            alert(config.message.invalid);
            return;
        }

        handleCursorUpdate(event, setCalculatorState);
    }

    return (
        <>
            <Box>
                <Header navigate={navigate} />
            </Box>
            <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                <Box sx={{ backgroundColor: backgroundColor, borderRadius: '8px', border: '2px solid', borderColor: borderColor, width: { xs: '90vw', sm: '50vw', md: '50vw', lg: '25vw' }, mt: 2 }}>
                    <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                        {calculatorState.mode === 'dark' ? (<h1 style={{ color: '#fff' }}>Calculator</h1>) : (<h1 style={{ color: '#000' }}>Calculator</h1>)}</Box>
                    <Box width={'100%'} display={'flex'} justifyContent={'center'} mb={2}>
                        <Box width={'325px'}>
                            {textFieldsData.map((item) => (
                                <CustomTextField
                                    fullWidth={false}
                                    label={item.label}
                                    type={item.type}
                                    value={calculatorState.data}
                                    sx={{ marginBottom: 1, backgroundColor: 'white', '& .MuiInputBase-input': { textAlign: 'right', fontSize: 'clamp(20px, 4vw, 23px)' }, borderRadius: '4px' }}
                                    variant={item.variant}
                                    onChange={(event) => handleTextFieldChange(event)}
                                    onClick={(event) => handleCursorUpdate(event, setCalculatorState)}
                                    onKeyUp={(event) => handleCursorUpdate(event, setCalculatorState)}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Box>
                        <Box>
                            {CalculatorData.map((row, rowIndex) => (
                                <Stack
                                    direction="row" spacing={{ xs: 0.8, sm: 1, md: 2 }} justifyContent="center" mb={rowIndex === CalculatorData.length - 1 ? 2 : 1} key={rowIndex}>
                                    {row.map((button, buttonIndex) => (
                                        <CustomButton
                                            isCalcButton={true}
                                            key={buttonIndex}
                                            value={button.value}
                                            icon={button.value === "toggle" ? (calculatorState.mode === 'dark' ? <WbSunnyIcon /> : <DarkModeIcon />) : null}
                                            onClick={() => handleKeyPress(button.value)}
                                            backgroundColor={
                                                button.value === "toggle" ? operatorButtonColor : buttonColor &&
                                                    operatorButtons.includes(button.value) ? operatorButtonColor : buttonColor}
                                            textColor={textColor}
                                            isIconButton={button.isIconButton}
                                            sx={{ p: { xs: 1 }, width: { xs: '30px', sm: '65px', md: '70px', lg: '70px' }, height: { xs: '40px', sm: '55px', md: '60px', lg: '60px' } }}
                                        />
                                    ))}
                                </Stack>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Calculator;