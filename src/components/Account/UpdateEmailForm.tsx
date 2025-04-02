import { Box, Button, CircularProgress, TextField} from "@mui/material";
import React, { useState} from "react";
import {changeEmailAsync, clearError} from "../../app/storeSlices/userCredentialsSlice.ts";
import {ChangeEmailRequest} from "../../app/Interfaces/Contracts/userCredentialsContracts.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";

function UpdateEmailForm() {
    const [emailForm, setEmailForm] = useState<ChangeEmailRequest>({
        new_email: ''
    });
    const dispatch = useAppDispatch();
    const { error, isLoading } = useAppSelector((state) => state.user);


    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailForm(
            {
                new_email: e.target.value
            }
        );

        if (error) {
            dispatch(clearError())
        }
    };

    async function handleUpdateEmail() {

        let isRequestValid: boolean = true;
        try {
            await dispatch(changeEmailAsync(emailForm)).unwrap();
        } catch (error) {
            console.error(error);
            isRequestValid = false;
        }

        if (isRequestValid) {
            setEmailForm({
                new_email: ''
            })
        }
    }

    return (
        <Box component="form" >
            <TextField
                fullWidth
                label="New Email"
                variant="outlined"
                value={emailForm.new_email}
                onChange={onInputChange}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                onClick={handleUpdateEmail}
                disabled={isLoading || !emailForm.new_email}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Change'}
            </Button>
        </Box>
    );
}

export default UpdateEmailForm;