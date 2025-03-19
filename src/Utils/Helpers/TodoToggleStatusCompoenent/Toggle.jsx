import React from "react";
import { ToggleButtonGroup, ToggleButton, } from "@mui/material";

export default function Toggle({ status, setStatus }) {

    const handleChange = (_, newUpdateStatus) => {
        if (newUpdateStatus !== null) {
            setStatus(newUpdateStatus);
        }
    };
    const toggleLayout = {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 1,
        mb: 2,
    }
    const textLayout =
    {
        fontSize: { xs: "20px", sm: "18px", md: "18px" },
        p: 1,
        border: 'none',
        textTransform: 'none'
    }

    return (
        <>
            <ToggleButtonGroup
                color="primary"
                value={status}
                exclusive
                onChange={handleChange}
                aria-label="Task Filter"
                sx={toggleLayout}
            >
                <ToggleButton sx={textLayout} value="all">
                    All
                </ToggleButton>
                <ToggleButton sx={textLayout} value="pending">
                    Pending
                </ToggleButton>
                <ToggleButton sx={textLayout} value="completed">
                    Completed
                </ToggleButton>
            </ToggleButtonGroup>
        </>
    )
}