import React from 'react';
import { TextField } from '@mui/material';

const CustomTextField = ({
  label,
  type,
  value,
  onChange,
  onClick,
  onKeyUp,
  variant,
  sx
}) => {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      onClick={onClick}
      onKeyUp={onKeyUp}
      variant={variant}
      sx={sx}
    />

  );
};

export default CustomTextField;