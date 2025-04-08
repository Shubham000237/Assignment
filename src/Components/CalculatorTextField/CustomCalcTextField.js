import React from 'react';
import { TextField, Box } from '@mui/material';

const CustomCalcTextField = ({
  label,
  type,
  value,
  onChange,
  onClick,
  onKeyUp,
  variant
}) => {
  return (
    <Box display="flex" flexDirection="column" mb={2}>
      <TextField
        label={label}
        type={type}
        value={value}
        onChange={onChange}
        onClick={onClick}
        onKeyUp={onKeyUp}
        variant={variant}
        sx={{
          maxWidth: '400px',
          marginBottom: 1,
          ml: { sm: 0.5, md: 5 },
          backgroundColor: 'white',
          input: {
            textAlign: 'right',
            fontSize: 'clamp(16px, 2vw, 24px)'
          },
          borderRadius: '4px'
        }}
      />
    </Box>
  );
};

export default CustomCalcTextField;