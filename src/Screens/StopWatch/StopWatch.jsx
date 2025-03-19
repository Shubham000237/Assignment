import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button} from "@mui/material";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { StopWatchContainer } from '../../Components/StopWatchContainer/StopWatchContainer';


export const StopWatch = () => {
    const navigate = useNavigate();
    
    return (
        <>
            <Box sx={{ 
                 p: "1vh",
                 backgroundColor: "#074b88",
                 boxSizing: "border-box"
                 }}
                 >
                <Button onClick={() => navigate("/home")} sx={{ color: "white", textTransform: "none", fontSize: "1.8vh" }}>
                    <ArrowBackIosIcon sx={{ fontSize: "1.5vh" }} /> Back
                </Button>
            </Box>
            <StopWatchContainer/>
        </>
    );
};