import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { checkForm, localStorageHelper } from '../../Helpers';
import {CustomTextField, CustomButton } from '../../Components';
import { config, FormFieldsData } from "../../Utils";
import './SignUpStyle.css'

const SignUp = () => {
    const navigate = useNavigate();
    
    const [inputData, setInputData] = useState(() => {
        const initialState = FormFieldsData.reduce((e, field) => {
            e[field.name] = "";
            return e;
        }, {});
        return {
            ...initialState,
            errors: {},
        };
    });
    
    // Handle input change and validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((prev) => {
            const updatedState = { ...prev, [name]: value };
            const fieldErrors = checkForm(updatedState);

            return {
                ...updatedState,
                errors: { ...prev.errors, [name]: fieldErrors[name] },
            };
        });
    };

    //handleSubmit function
    const handleSubmit = (e) => {
        let existingUsers = localStorageHelper.getItem("users") || [];
        const formErrors = checkForm(inputData);
        const userExists = existingUsers.some(
            (user) => user.email.trim().toLowerCase() === inputData.email.trim().toLowerCase()
        );
        
        const newUser = {
            ...inputData,
            email: inputData.email.trim().toLowerCase(),
            loggedInUser: true,
        };

        if (e && e.preventDefault) {
            e.preventDefault();
        }
        
        if (Object.values(formErrors).some((error) => error !== "")) {
            return;
        }

        if (userExists) {
            alert(config.message.userExists);
            return;
        }

        existingUsers.push(newUser);
        localStorageHelper.setItem("users", existingUsers);
        localStorageHelper.setItem("loggedInUser", newUser);
        navigate("/home");
    };

    const isValid = () => {
        const formErrors = checkForm(inputData);
        return !Object.values(formErrors).some((error) => error !== '');
    }

    return (
        <Box className="formLayout">
            <Box className="formLayoutDesign">
                <Typography variant="h5" className="textDesign">
                    Registration Form
                </Typography>
                <Box alignItems="center">
                    {FormFieldsData.map((field) => (
                        <Box key={field.name} mb={2}>
                            {field.name === "password" || field.name === "confirmpassword" ? (
                                <CustomTextField
                                    label={field.label}
                                    name={field.name}
                                    value={inputData[field.name] || ""}
                                    onChange={(e)=>handleChange(e)}
                                    error={!!inputData.errors[field.name]}
                                    helperText={inputData.errors[field.name] || ""}
                                    isPasssword={true}
                                />
                            ) : (
                                <CustomTextField
                                    label={field.label}
                                    type={field.type}
                                    variant={field.variant}
                                    name={field.name}
                                    value={inputData[field.name] || ""}
                                    onChange={handleChange}
                                    error={!!inputData.errors[field.name]}
                                    helperText={inputData.errors[field.name]}
                                    multiline={field.multiline || false}
                                    inputProps={field.name === "mobile" ? { maxLength: 10, pattern: "^[0-9]{10}$" } : {}}
                                    fullWidth={true}
                                />
                            )}
                        </Box>
                    ))}
                    <CustomButton variant="contained" onClick={handleSubmit} disabled={!isValid()} className="submitButton" sx={{textTransform:'none'}}>
                        Submit
                    </CustomButton>
                    <Typography variant="body2" align="center" className="text" mt={1}>
                        {config.message.haveAccount},{' '}
                        <strong style={{ color:'darkgreen', cursor: 'pointer', textDecoration:'none' }} onClick={() => navigate('/login')}>
                            {config.message.account}
                        </strong>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;