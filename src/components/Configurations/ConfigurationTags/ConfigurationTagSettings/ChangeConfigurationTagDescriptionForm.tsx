import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {Box, Button, CircularProgress, TextField} from "@mui/material";
import {changeTagDescriptionAsync, clearTagSettingsError} from "../../../../app/storeSlices/configurationTagsSlice.ts";

interface ChangeConfigurationTagDescriptionFormProps {
    configurationId: number,
    tagId: number,
}

function ChangeConfigurationTagDescriptionForm({configurationId, tagId}: ChangeConfigurationTagDescriptionFormProps) {
    const [newTagDescription, setNewTagDescription] = useState<string>('');
    const {tagSettingsError, isTagSettingsLoading} = useAppSelector((state) => state.configuration_tags);
    const dispatch = useAppDispatch();

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTagDescription(e.target.value);

        if (tagSettingsError) {
            dispatch(clearTagSettingsError())
        }
    };

    async function handleUpdateDescription() {
        let isRequestValid: boolean = true;
        try {
            await dispatch(changeTagDescriptionAsync({
                configuration_id: configurationId,
                tag_id: tagId,
                new_description: newTagDescription
            })).unwrap();
        } catch (error) {
            console.error(error);
            isRequestValid = false;
        }

        if (isRequestValid) {
            setNewTagDescription('');
        }
    }

    return (
        <Box component="form" >
            <TextField
                fullWidth
                label="New Description"
                variant="outlined"
                value={newTagDescription}
                onChange={onInputChange}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                onClick={handleUpdateDescription}
                disabled={isTagSettingsLoading || !newTagDescription}
            >
                {isTagSettingsLoading? <CircularProgress size={24} /> : 'Change'}
            </Button>
        </Box>
    );
}

export default ChangeConfigurationTagDescriptionForm;