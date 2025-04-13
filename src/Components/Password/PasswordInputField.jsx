import React, { useState } from "react";
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordInputField = ({ label, value, name, onChange, error, helperText }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <FormControl variant="outlined" fullWidth error={!!error}>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <OutlinedInput
                id={name}
                type={showPassword ? "text" : "password"}
                name={name}
                value={value}
                onChange={onChange}  // Validation happens onChange, not on toggle
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={handleTogglePassword} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
            />
            {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
    );
};

export default PasswordInputField;