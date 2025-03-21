import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestoreIcon from '@mui/icons-material/Restore';

import { stopWatchLabels } from '../../Utils/Helpers/SignUpAndLoginData/ArrayOfObject';
import './StopWatchStyle.css';

export const StopWatchContainer = () => {
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState(false);

    const timeformat = (e) => ("0" + e).slice(-2)
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)

    useEffect(() => {
        if (status === true) {
            var interval = setInterval(() => {
                setTime(prevState => prevState + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [status, time]);

    const timeVal = { hours, minutes, seconds };
    const togglePlayPause = () => setStatus((prevStatus) => !prevStatus);

    return (
        <>
            <Box className="stopwatch-heading"><h2>Stop-Watch</h2></Box>
            <Box className="container">
                {stopWatchLabels.map((e, index) => {
                    return (
                        <Box key={index}>
                            <Typography ml={4} className="label">{e.label}</Typography>
                            <br /><span className="digits">{timeformat(timeVal[e.key])}{index < 2 ? ":" : ""}</span>
                        </Box>
                    )
                })}
            </Box>
            <Stack direction="row" spacing={4} className='iconComponentContainer'>
                <Box onClick={togglePlayPause}>
                    {status ? (<PauseIcon style={{ fontSize: "clamp(30px, 8vw, 57px)", minWidth: '40px', color: 'black', cursor: 'pointer' }}/>)
                    : 
                    (<PlayArrowIcon style={{ fontSize: "clamp(30px, 8vw, 57px)", minWidth: '40px', color: 'black', cursor: 'pointer' }}/>)}
                    
                </Box>
                <Typography onClick={() => { setStatus(false); setTime(0); }}>
                    <RestoreIcon style={{ fontSize: "clamp(30px, 8vw, 57px)", minWidth: '40px', color: 'black', cursor: 'pointer' }} />
                </Typography>
            </Stack>
        </>
    );
};