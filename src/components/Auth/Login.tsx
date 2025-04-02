import React, {useEffect, useState} from "react";
import {LoginCredentials} from "../../app/Interfaces/Contracts/userAuthContracts.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {clearError, loginAsync} from "../../app/storeSlices/userCredentialsSlice.ts";
import AuthLayout from "./Macro/AuthLayout.tsx";
import {
    Alert,
    AlertTitle,
    Box,
    Button,
    Checkbox,
    CircularProgress,
    Divider,
    FormControlLabel,
    FormGroup
} from "@mui/material";
import AuthTextField from "./Macro/AuthTextFiled.tsx";
import AuthBottomLink from "./Macro/AuthBottomLink.tsx";
import AuthLogo from "./Macro/AuthLogo.tsx";

function Login() {
    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>(
        {
            email: '',
            password: '',
            remember_user: false
        }
    );
    const dispatch = useAppDispatch();
    const { user, isLoading, error } = useAppSelector((store) => store.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>){
        setLoginCredentials({
            ...loginCredentials,
            [e.target.name]: e.target.value
        })

        if (error && (loginCredentials.email || loginCredentials.password)) {
            dispatch(clearError());
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        e.stopPropagation();

        await dispatch(loginAsync(loginCredentials));
    }

    function handleRemeberMeChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLoginCredentials({
            ...loginCredentials,
            [e.target.name]: e.target.checked
        });
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
                     gap: 2
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
                        <AlertTitle>Sign-in Failed.</AlertTitle>
                        {error}
                    </Alert>
                )}

                <AuthTextField
                    variant="outlined"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={loginCredentials.email}
                    onChange={handleOnChange}
                    disabled={isLoading}
                />
                <AuthTextField
                    variant="outlined"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="password"
                    value={loginCredentials.password}
                    onChange={handleOnChange}
                    disabled={isLoading}
                />

                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                name="remember_user"
                                checked={loginCredentials.remember_user}
                                onChange={handleRemeberMeChange}
                                color="secondary"
                                disabled={isLoading}
                            />
                        }
                        label="Remember me"
                        sx={{
                            my: -1,
                            '& .MuiFormControlLabel-label': {
                                fontSize: '0.9rem',
                                color: 'text.secondary'
                            }
                        }}
                    />
                </FormGroup>


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
                        || !loginCredentials.email.trim()
                        || !loginCredentials.password.trim()}
                >
                    {isLoading ? <CircularProgress size={20} color="secondary"/> : "Sign In"}
                </Button>
                <Divider sx={{ width: '100%', my: 1 }}>or</Divider>
                <AuthBottomLink
                    linkPath="/sign-up"
                    linkText="Don't have an account? Sign Up"
                />
            </Box>
        </AuthLayout>
    );
}

export default Login;