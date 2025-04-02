import React, {useState} from "react";
import {ChangePasswordRequest} from "../../app/Interfaces/Contracts/userCredentialsContracts.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {changePasswordAsync, clearError} from "../../app/storeSlices/userCredentialsSlice.ts";
import {Box, Button, CircularProgress, TextField} from "@mui/material";

function UpdatePasswordForm() {
    const [passwordForm, setPasswordForm] = useState<ChangePasswordRequest>({
        new_password: '',
        confirmNewPassword: ''
    });
    const dispatch = useAppDispatch();
    const { error, isLoading } = useAppSelector((state) => state.user);


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm({
            ...passwordForm,
            [e.target.name]: e.target.value
        });

        if (error) {
            dispatch(clearError())
        }
    };

    async function handleUpdatePassword() {
        let isRequestValid: boolean = true;
        try {
            await dispatch(changePasswordAsync(passwordForm)).unwrap();
        } catch (error) {
            console.error(error);
            isRequestValid = false;
        }

        if (isRequestValid) {
            setPasswordForm({
                new_password: '',
                confirmNewPassword: ''
            })
        }
    }

    return (
        <Box component="form">
            <TextField
                fullWidth
                type="password"
                label="New Password"
                name="new_password"
                variant="outlined"
                value={passwordForm.new_password}
                onChange={onInputChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                type="password"
                label="Confirm password"
                name="confirmNewPassword"
                variant="outlined"
                value={passwordForm.confirmNewPassword}
                onChange={onInputChange}
                sx={{ mb: 2 }}
            />

            <Button
                variant="contained"
                onClick={handleUpdatePassword}
                disabled={isLoading || !passwordForm.new_password}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Change'}
            </Button>
        </Box>
    );
}

export default UpdatePasswordForm;