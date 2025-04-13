import React from 'react';
import { TextField, Box } from '@mui/material';

const CustomTextField = ({
  label,
  type,
  name,
  value,
  onChange,
  onKeyDown,
  variant,
  fullWidth,
  required,
  multiline,
  rows,
  error,
  helperText,
  slotProps,
  inputProps
}) => {
  return (
    <Box display="flex" flexDirection="column" mb={2}>
      <TextField
        label={label}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        variant={variant}
        fullWidth={fullWidth}
        required={required}
        multiline={multiline}
        rows={rows}
        error={error}
        helperText={helperText}
        slotProps={slotProps}
        inputProps={inputProps}
      />
    </Box>
  );
};

export default CustomTextField;