import React from "react";
import { Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";

import {CustomButton} from "../../Components";

const Header = () => {

    const navigate = useNavigate();

    return (
        <Box sx={{ p: "1vh", backgroundColor: "#074b88", boxSizing: "border-box" }}>
          <CustomButton
            onClick={() => navigate("/home")}
            sx={{ color: "white", textTransform: "none", fontSize: "1.8vh" }}
          >
            <ArrowBackIosIcon sx={{ fontSize: "1.5vh" }} /> Back
          </CustomButton>
        </Box>
      )
}
export {Header}