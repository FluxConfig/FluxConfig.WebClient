import React, {useState} from "react";
import {ChangeUsernameRequest} from "../../app/Interfaces/Contracts/userCredentialsContracts.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {changeUsernameAsync, clearError} from "../../app/storeSlices/userCredentialsSlice.ts";
import { Box, Button, CircularProgress, TextField} from "@mui/material";

function UpdateUsernameForm() {
    const [usernameForm, setUsernameForm] = useState<ChangeUsernameRequest>({
        new_username: ''
    });
    const dispatch = useAppDispatch();
    const { error, isLoading } = useAppSelector((state) => state.user);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsernameForm(
            {
                new_username: e.target.value
            }
        );

        if (error) {
            dispatch(clearError())
        }
    };

    async function handleUpdateUsername() {

        let isRequestValid: boolean = true;
        try {
            await dispatch(changeUsernameAsync(usernameForm)).unwrap();
        } catch (error) {
            console.error(error);
            isRequestValid = false;
        }

        if (isRequestValid) {
            setUsernameForm({
                new_username: ''
            })
        }
    }

    return (
        <Box component="form" >
            <TextField
                fullWidth
                label="New Username"
                variant="outlined"
                value={usernameForm.new_username}
                onChange={onInputChange}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                onClick={handleUpdateUsername}
                disabled={isLoading || !usernameForm.new_username}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Change'}
            </Button>
        </Box>
    );
}

export default UpdateUsernameForm;