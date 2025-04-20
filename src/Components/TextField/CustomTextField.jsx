import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CustomTextField = ({
  label,
  placeholder,
  type,
  value,
  onChange,
  onClick,
  onKeyUp,
  variant,
  sx,
  name,
  error,
  helperText,
  margin,
  className,
  InputProps,
  isPasssword,
  key,
  onKeyDown,
  FormHelperTextProps
}) => {

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
        <TextField
          key={key}
          label={label}
          placeholder={placeholder}
          type={isPasssword? (showPassword ? "text" : "password"):(type)}
          value={value}
          onChange={onChange}
          onClick={onClick}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          variant={variant}
          sx={sx}
          fullWidth={true}
          name={name}
          error={error}
          helperText={helperText}
          margin={margin}
          className={className}
          FormHelperTextProps={FormHelperTextProps}
          InputProps={{
            ...InputProps,
            endAdornment: isPasssword ? (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : (
              InputProps?.endAdornment || null
            ),
          }}
        />
    </>
  );
};

export default CustomTextField;