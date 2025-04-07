import React from "react";
import { Box, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

export const Header = ({navigate}) => {
    return (
        <Box sx={{ p: "1vh", backgroundColor: "#074b88", boxSizing: "border-box" }}>
            <Button onClick={() => navigate("/home")} sx={{ color: "white", textTransform: "none", fontSize: "1.8vh" }}>
                <ArrowBackIosIcon sx={{ fontSize: "1.5vh" }} /> Back
            </Button>
        </Box>
    )
}