import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack } from "@mui/material";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestoreIcon from '@mui/icons-material/Restore';
import { stopWatchButton } from '../../Utils/Helpers/SignUpAndLoginData/ArrayOfObject';
import { stopWatchLabels } from '../../Utils/Helpers/SignUpAndLoginData/ArrayOfObject';
import './StopWatchStyle.css';

export const StopWatchContainer = () => {
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState(false);

    const timeformat = (time) => ("0" + time).slice(-2)
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)

    useEffect(() => {
        let interval;
        if (status) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else if (!status && time !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [status, time]);

    const iconMap = {
        PlayArrowIcon: PlayArrowIcon,
        PauseIcon: PauseIcon,
        RestoreIcon: RestoreIcon,
    };

    return (
        <>
            <Box className="stopwatch-heading"><h2>Stop-Watch</h2></Box>
            <Box className="container">
                {stopWatchLabels.map((e, index) => (
                    <Box key={index} className="section">
                        <Typography ml={e.margin} className="label">{e.label}</Typography>
                        <br /><span className="digits">{timeformat(eval(e.key))}{index < 2 ? ":" : ""}</span>
                    </Box>
                ))}
            </Box>
            <Stack direction="row" spacing={4} justifyContent={"center"} className='iconComponentContainer'>
                {stopWatchButton.map((e) => {
                    const IconComponent = iconMap[e.icon];
                    return (

                        <Typography onClick={() => e.action(setStatus, setTime)}><IconComponent style={{ fontSize: "clamp(30px, 8vw, 57px)", minWidth: '40px', color: 'black', cursor: 'pointer' }} /></Typography>
                    )
                })}
            </Stack>
        </>
    );
};