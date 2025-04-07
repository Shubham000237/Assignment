import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Header} from '../../Components/HeaderSection/Header';
import { StopWatchContainer } from '../../Components/StopWatchContainer/StopWatchContainer';


export const StopWatch = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header navigate={navigate} />
            <StopWatchContainer/>
        </>
    );
};