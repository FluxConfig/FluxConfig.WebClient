import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {changeConfigurationNameAsync, clearError} from "../../../app/storeSlices/configurationsGeneralSlice.ts";
import {Box, Button, CircularProgress, TextField} from "@mui/material";

function ChangeConfigurationNameForm({configurationId}: {configurationId: number}){
    const [newConfigurationName, setNewConfigurationName] = useState<string>('');
    const {error, isConfigurationSettingsLoading} = useAppSelector((state) => state.configurations_general);
    const dispatch = useAppDispatch();

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewConfigurationName(e.target.value);

        if (error) {
            dispatch(clearError())
        }
    };

    async function handleUpdateName() {

        let isRequestValid: boolean = true;
        try {
            await dispatch(changeConfigurationNameAsync({
                new_name: newConfigurationName,
                id: configurationId
            })).unwrap();
        } catch (error) {
            console.error(error);
            isRequestValid = false;
        }

        if (isRequestValid) {
            setNewConfigurationName('');
        }
    }

    return (
        <Box component="form" >
            <TextField
                fullWidth
                label="New Name"
                variant="outlined"
                value={newConfigurationName}
                onChange={onInputChange}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                onClick={handleUpdateName}
                disabled={isConfigurationSettingsLoading || !newConfigurationName}
            >
                {isConfigurationSettingsLoading ? <CircularProgress size={24} /> : 'Change'}
            </Button>
        </Box>
    );
}

export default ChangeConfigurationNameForm;