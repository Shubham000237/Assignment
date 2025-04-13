import React from 'react'
import { Button } from '@mui/material';

const CustomButton = ({
    variant,
    fullWidth,
    className,
    onClick,
    sx,
    disabled,
    
    type,
    children
}) => {
  return (
    <Button
    onClick={onClick}
    className={className}
    variant={variant}
    type={type}
    sx={sx}
    fullWidth={fullWidth}
    disabled={disabled}
    >{children}
    </Button>
  )
}

export default CustomButton