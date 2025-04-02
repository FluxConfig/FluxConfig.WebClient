import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {
    changeConfigurationDescriptionAsync,
    clearError
} from "../../../app/storeSlices/configurationsGeneralSlice.ts";
import {Box, Button, CircularProgress, TextField} from "@mui/material";

function ChangeConfigurationDescriptionForm({configurationId}: {configurationId: number}) {
    const [newConfigurationDescription, setNewConfigurationDescription] = useState<string>('');
    const {error, isConfigurationSettingsLoading} = useAppSelector((state) => state.configurations_general);
    const dispatch = useAppDispatch();

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewConfigurationDescription(e.target.value);

        if (error) {
            dispatch(clearError())
        }
    };

    async function handleUpdateDescription() {
        let isRequestValid: boolean = true;
        try {
            await dispatch(changeConfigurationDescriptionAsync({
                new_description: newConfigurationDescription,
                id: configurationId
            })).unwrap();
        } catch (error) {
            console.error(error);
            isRequestValid = false;
        }

        if (isRequestValid) {
            setNewConfigurationDescription('');
        }
    }

    return (
        <Box component="form" >
            <TextField
                fullWidth
                label="New Description"
                variant="outlined"
                value={newConfigurationDescription}
                onChange={onInputChange}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                onClick={handleUpdateDescription}
                disabled={isConfigurationSettingsLoading|| !newConfigurationDescription}
            >
                {isConfigurationSettingsLoading ? <CircularProgress size={24} /> : 'Change'}
            </Button>
        </Box>
    );

}

export default ChangeConfigurationDescriptionForm;