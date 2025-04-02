import {useEffect, useState} from "react";
import {RegisterCredentials, RegisterCredentialsViolations} from "../../app/Interfaces/Contracts/userAuthContracts.ts";
import {clearError, loginAsync, registerAsync } from "../../app/storeSlices/userCredentialsSlice.ts";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import AuthLayout from "./Macro/AuthLayout.tsx";
import AuthLogo from "./Macro/AuthLogo.tsx";
import {Alert, Divider, Box, AlertTitle, Button, CircularProgress,} from "@mui/material";
import AuthTextField from "./Macro/AuthTextFiled.tsx";
import AuthBottomLink from "./Macro/AuthBottomLink.tsx";

function Register() {
    const [registerCredentials, setRegisterCredentials] = useState<RegisterCredentials>(
        {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    );

    const [credentialsViolation, setCredentialsViolation] = useState<RegisterCredentialsViolations>({
        username: null,
        email: null,
        password: null
    });

    const dispatch = useAppDispatch();
    const { user, isLoading, error } = useAppSelector((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        setRegisterCredentials({
            ...registerCredentials,
            [e.target.name]: e.target.value
        });

        setCredentialsViolation({
            ...credentialsViolation,
            [e.target.name === "confirmPassword" ? "password" : e.target.name]: null
        })

        if (error) {
            dispatch(clearError());
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();

        if (!isValidCredentials()) {
            return;
        }

        let isRegisterValid: boolean = true;
        try {
            await dispatch(registerAsync(registerCredentials)).unwrap();
        } catch (error) {
            console.error(error);
            isRegisterValid = false;
        }

        if (isRegisterValid) {
            await dispatch(loginAsync({
                email: registerCredentials.email,
                password: registerCredentials.password,
                remember_user: true
            }));
        }
    }


    function isValidCredentials(): boolean {
        const credViolations: RegisterCredentialsViolations = {
            username: null,
            email: null,
            password: null
        };

        if (!registerCredentials.username.trim()) {
            credViolations.username = "Username is required"
        } else if (registerCredentials.username.length < 8) {
            credViolations.username = "Username must contain at least 8 characters"
        } else if (registerCredentials.username.length > 50) {
            credViolations.username = "Username must contain at most 50 characters"
        }

        if (!registerCredentials.email.trim()) {
            credViolations.email = "Email address is required"
        } else if (registerCredentials.email.length > 100) {
            credViolations.email = "Email address must contain at most 100 characters"
        }

        if (!registerCredentials.password.trim()) {
            credViolations.password = "Password is required"
        } else if (registerCredentials.password.length < 8) {
            credViolations.password= "Password must contain at least 8 characters"
        } else if (registerCredentials.password.length > 50) {
            credViolations.password = "Password must contain at most 50 characters"
        } else if (registerCredentials.password !== registerCredentials.confirmPassword) {
            credViolations.password = "Password doesn't match Confirm password"
        }

        setCredentialsViolation(credViolations)

        return (!credViolations.email
            && !credViolations.password
            && !credViolations.username)
    }

    return (
        <AuthLayout>
            <AuthLogo/>
            <Box component="form"
                 onSubmit={handleSubmit}
                 sx={{
                     width: '95%',
                     display: 'flex',
                     flexDirection: 'column',
                     gap: 0
                 }}>
                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            '& .MuiAlert-message': {
                                overflow: 'hidden'
                            }
                        }}
                    >
                        <AlertTitle>Sign-up Failed.</AlertTitle>
                        {error}
                    </Alert>
                )}

                <AuthTextField
                    variant="outlined"
                    name="username"
                    label="Username"
                    id="username"
                    autoComplete="Username"
                    value={registerCredentials.username}
                    onChange={handleOnChange}
                    disabled={isLoading}
                    error={!!credentialsViolation.username}
                    helperText={credentialsViolation.username}
                />
                <AuthTextField
                    variant="outlined"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={registerCredentials.email}
                    onChange={handleOnChange}
                    disabled={isLoading}
                    error={!!credentialsViolation.email}
                    helperText={credentialsViolation.email}
                />
                <AuthTextField
                    variant="outlined"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    value={registerCredentials.password}
                    onChange={handleOnChange}
                    disabled={isLoading}
                    error={!!credentialsViolation.password}
                    helperText={credentialsViolation.password}
                />
                <AuthTextField
                    variant="outlined"
                    name="confirmPassword"
                    label="Confirm password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="password"
                    value={registerCredentials.confirmPassword}
                    onChange={handleOnChange}
                    disabled={isLoading}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        mt: 1,
                        py: 1.5,
                        fontSize: '1rem',
                    }}
                    disabled={isLoading
                        || !!credentialsViolation.email
                        || !!credentialsViolation.username
                        || !!credentialsViolation.password
                    }
                >
                    {isLoading ? <CircularProgress size={20} color="secondary"/> : "Sign Up"}
                </Button>
            </Box>
            <Divider sx={{ width: '100%', my: 1 }}>or</Divider>
            <AuthBottomLink
                linkPath="/sign-in"
                linkText="Already have an account? Sign In"
            />
        </AuthLayout>
    );
}

export default Register;