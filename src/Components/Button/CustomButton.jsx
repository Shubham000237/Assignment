import React from 'react'
import { Button, IconButton } from '@mui/material';

const CustomButton = ({
  value,
  variant,
  fullWidth,
  className,
  backgroundColor,
  onClick,
  textColor,
  icon = null,
  sx,
  isIconButton = false,
  disabled,
  type,
  children,
  color,
  isCalcButton
}) => {
  const computedSx = isCalcButton
  ? {
      backgroundColor,
      color: textColor,
      fontSize: 'clamp(8px, 3vw, 20px)',
      ...sx,
    }
  : sx;
  return (
    <>
       <Button
        onClick={onClick}
        className={className}
        variant={variant}
        type={type}
        sx={computedSx}
        fullWidth={fullWidth}
        disabled={disabled}
        color={color}
      >{isIconButton && icon ? <IconButton sx={{ color: textColor }}>{icon}</IconButton> : icon || value || children}
      </Button>
    </>
  )
}

export default CustomButton