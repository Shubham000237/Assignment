import React from 'react';
import { Button, IconButton } from '@mui/material';

const ReusableCalculatorButtons = ({
    value,
    onClick,
    backgroundColor,
    textColor,
    icon = null,
    isIconButton = false,
    sx = {},
}) => {
    return (
        <Button
            variant="contained"
            onClick={onClick} //handling this depend upon parent component
            sx={{
                backgroundColor,
                color: textColor,
                padding: 1,
                fontSize: 'clamp(8px, 3vw, 20px)',
                ...sx,
            }}
        >
            {isIconButton && icon ? <IconButton sx={{ color: textColor }}>{icon}</IconButton> : icon || value}
        </Button>
    );
};

export { ReusableCalculatorButtons };