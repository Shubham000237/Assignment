import React, { useState } from 'react';
import { Box, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import { ErrorValidations } from '../../Helpers';
import { config, LoginFieldsData } from '../../Utils';
import localStorageHelper from '../../Helpers/LocalStorageHelper/LocalStorageHelper';
import './LoginStyle.css'
import CustomTextField from '../../Components/TextField/CustomTextField';
import CustomButton from '../../Components/Button/CustomButton';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    showPassword: false,
    error: ''
  });
  const getRegisteredUsers = () => {
    return localStorageHelper.getItem("users", []);
  };
  //Error validation work according to the saved credentials in localStorage
  const handleChange = (e) => {
    const { name, value } = e.target;
    const registeredUsers = getRegisteredUsers();
    let emailError = '';
    let passwordError = '';
    if (name === "email") {
      const userExists = registeredUsers.some(user => user.email?.trim().toLowerCase() === value.trim().toLowerCase());
      emailError = userExists ? '' : config.message.loginEmail;
    }
    if (name === "password" && credentials.email) {
      const user = registeredUsers.find(user => user.email?.trim().toLowerCase() === credentials.email?.trim().toLowerCase());
      if (user && user.password !== value) {
        passwordError = config.message.loginPassword;
      }
    }
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
      emailError,
      passwordError
    }));
  };
  //Toggle the eye icon
  
  const handleClickShowPassword = () => {
    setCredentials((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  //Login the page when saved credentials updated in the textfields
  const handleLogin = (e) => {
    e.preventDefault();
    const registeredUsers = getRegisteredUsers();
    let existingUsers = localStorageHelper.getItem("users") || [];
    const user = registeredUsers.find(user => user.email?.trim().toLowerCase() === credentials.email?.trim().toLowerCase());
    const formErrors = ErrorValidations.checkForm(credentials, true);
    
    let userIndex = existingUsers.findIndex(
      (user) =>
        user.email?.trim().toLowerCase() === credentials.email.trim().toLowerCase() &&
        user.password?.trim() === credentials.password.trim()
    );
    
    const loggedInUser = {
      name: user?.name,
      email: user?.email,
      userIndex: userIndex,
    };
    
    if (!user) {
      setCredentials((prev) => ({
        ...prev,
        emailError: config.message.loginEmail,
        passwordError: ''
      }));
      return;
    }
    
    if (user.password !== credentials.password) {
      setCredentials((prev) => ({
        ...prev,
        emailError: '',
        passwordError: config.message.loginPassword
      }));
    
      return;
    }

    if (formErrors.email || formErrors.password) {
      return;
    }
    
    if (userIndex === -1) {
      return;
    }

    // Update active status
    existingUsers[userIndex] = { ...user, loggedInUser: true };
    localStorageHelper.setItem("users", existingUsers);
    // Store session data properly
    localStorageHelper.setItem("loggedInUser", loggedInUser);
    navigate("/home");
  };

  // Disable login button if fields are empty or incorrect
  const isDisabled =
    !credentials.email?.trim() ||
    // !credentials.password?.trim() ||
    credentials.emailError 
    // || credentials.passwordError;

  return (
    <Box
      className="loginLayout"
    >
      <Box
        className="loginLayoutDesign"
      >
        <Typography variant="h5" align="center" gutterBottom className="loginText">
          Login
        </Typography>
        {LoginFieldsData.map((field) => (
          <Box key={field.name} sx={{ mb: 2 }}>
            {field.name === 'password' ? (
              <TextField
                label={field.label}
                fullWidth
                type={credentials.showPassword ? 'text' : 'password'}
                variant="outlined"
                name={field.name}
                value={credentials.password}
                onChange={handleChange}
                error={field.name === 'email' ? !!credentials.emailError : !!credentials.passwordError}
                helperText={field.name === 'email' ? credentials.emailError : credentials.passwordError}
                margin="normal"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className="IconDesign"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {credentials.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <CustomTextField
                label={field.label}
                fullWidth={field.fullWidth}
                type={field.type}
                variant="outlined"
                name={field.name}
                value={credentials[field.name] || ''}
                onChange={handleChange}
                error={field.name === 'email' ? !!credentials.emailError : !!credentials.passwordError}
                helperText={field.name === 'email' ? credentials.emailError : credentials.passwordError}
                margin="normal"
                className="IconDesign"
              />
            )}
          </Box>
        ))}
        <CustomButton
          onClick={(e)=>handleLogin(e)}
          variant="contained"
          fullWidth
          className="loginButtonDesign"
          sx={{textTransform:'none'}}
          disabled={isDisabled}
        >
          Login
        </CustomButton>
        <Typography
          variant="body2"
          align="center"
          className="text"
          mt={1}
        >
          <small>
            {config.message.noAccount},{' '}
            <strong  onClick={() => navigate('/')} style={{ color: 'darkgreen', cursor: 'pointer', textDecoration:'none' }}>{config.message.newAccount}</strong>
          </small>
        </Typography>
      </Box>
    </Box>
  );
};
export default Login;