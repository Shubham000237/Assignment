import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Helper } from '../../Utils/Helpers/Helper';
import TextFieldComponent from '../../Components/TextFieldComponent/TextFieldComponent';
import { FormFields } from '../../Utils/Helpers/ObjectList/FormFields';
import PasswordField from "../../Utils/Helpers/PasswordComponent/PasswordField";
import { config } from "../../Utils/Config/config";
import localStorageHelper from '../../Components/LocalStorageHelper/LocalStorageHelper'
import './SignUpStyle.css'

const SignUp = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(() => {
        const initialState = FormFields.reduce((e, field) => {
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
        setData((prev) => {
            const updatedState = { ...prev, [name]: value };
            const fieldErrors = Helper.checkForm(updatedState);

            return {
                ...updatedState,
                errors: { ...prev.errors, [name]: fieldErrors[name] },
            };
        });
    };

    //handleSubmit function
    const handleSubmit = (e) => {
        let existingUsers = localStorageHelper.getItem("users") || [];
        const formErrors = Helper.checkForm(data);
        const userExists = existingUsers.some(
            (user) => user.email.trim().toLowerCase() === data.email.trim().toLowerCase()
        );
        
        const newUser = {
            ...data,
            email: data.email.trim().toLowerCase(),
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
        const formErrors = Helper.checkForm(data);
        return !Object.values(formErrors).some((error) => error !== '');
    }

    return (
        <Box className="formLayout">
            <Box className="formLayoutDesign">
                <Typography variant="h5" className="textDesign">
                    Registration Form
                </Typography>
                <Box alignItems="center">
                    {FormFields.map((field) => (
                        <Box key={field.name} mb={2}>
                            {field.name === "password" || field.name === "confirmpassword" ? (
                                <PasswordField
                                    label={field.label}
                                    name={field.name}
                                    value={data[field.name] || ""}
                                    onChange={handleChange}
                                    error={!!data.errors[field.name]}
                                    helperText={data.errors[field.name] || " "}
                                />
                            ) : (
                                <TextFieldComponent
                                    label={field.label}
                                    type={field.type}
                                    variant={field.variant}
                                    name={field.name}
                                    value={data[field.name] || ""}
                                    onChange={handleChange}
                                    error={!!data.errors[field.name]}
                                    helperText={data.errors[field.name]}
                                    multiline={field.multiline || false}
                                    rows={field.rows || 1}
                                    inputProps={field.name === "mobile" ? { maxLength: 10, pattern: "^[0-9]{10}$" } : {}}
                                />
                            )}
                        </Box>
                    ))}
                    <Button variant="contained" onClick={handleSubmit} disabled={!isValid()} className="submitButton" sx={{textTransform:'none'}}>
                        Submit
                    </Button>
                    <Typography variant="body2" align="center" className="text" mt={1}>
                        {config.message.haveAccount},{' '}
                        <strong style={{ color: 'darkgreen', cursor: 'pointer', textDecoration:'none' }} onClick={() => navigate('/login')}>
                            {config.message.account}
                        </strong>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SignUp;