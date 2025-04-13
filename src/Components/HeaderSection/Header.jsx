import React from "react";
import { Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CustomButton from "../Button/CustomButton";

const Header = ({navigate}) => {
    return (
        <Box sx={{ p: "1vh", backgroundColor: "#074b88", boxSizing: "border-box" }}>
            <CustomButton onClick={() => navigate("/home")} sx={{ color: "white", textTransform: "none", fontSize: "1.8vh" }}>
                <ArrowBackIosIcon sx={{ fontSize: "1.5vh" }} /> Back
            </CustomButton>
        </Box>
    )
}
export default Header;