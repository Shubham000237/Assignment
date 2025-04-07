import React from 'react';
import './Calculator.css';
import { useNavigate } from 'react-router-dom';

import { Header } from '../../Components';
import {ReusableCalculator} from '../../Components/CalculatorButton/ReusableCalculator'

const Calculator = () => {
    const navigate = useNavigate();
        return (
        <>
            <Header navigate={navigate}/>
                <ReusableCalculator />
        </>
    );
};

export default Calculator;