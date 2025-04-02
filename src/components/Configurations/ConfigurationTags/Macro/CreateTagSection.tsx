import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import React, { useState } from "react";
import {
    createConfigurationTagAsync,
    clearCreateTagError,
    clearCreateTagSuccess,
    getConfigurationTagsMetaAsync
} from "../../../../app/storeSlices/configurationTagsSlice.ts";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function CreateConfigurationTagSection({ configurationId }: { configurationId: number }) {
    const [tagData, setTagData] = useState({
        tag: '',
        description: '',
        required_role: 'Member'
    });
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const { isCreateTagLoading, createTagError, createTagSuccess } = useAppSelector((state) => state.configuration_tags);
    const dispatch = useAppDispatch();

    async function handleSubmit() {
        const request = {
            configuration_id: configurationId,
            ...tagData
        };

        let isRequestValid = true;
        try {
            await dispatch(createConfigurationTagAsync(request)).unwrap();
        } catch (error) {
            console.error(error);
            isRequestValid = false;
        }

        if (isRequestValid) {
            await dispatch(getConfigurationTagsMetaAsync({ configuration_id: configurationId }));
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        const { name, value } = e.target;
        setTagData(prev => ({
            ...prev,
            [name]: value
        }));

        if (createTagError) {
            dispatch(clearCreateTagError());
        }
    };

    const handleClose = () => {
        setTagData({ tag: '', description: '', required_role: 'Member' });
        dispatch(clearCreateTagSuccess());
        dispatch(clearCreateTagError());
        setDialogOpen(false);
    };

    return (
        <>
            <Button
                variant="outlined"
                onClick={() => setDialogOpen(true)}
                color="success"
                startIcon={<AddIcon/>}
            >
                Create
            </Button>

            <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Create new tag</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {createTagError && (
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                {createTagError}
                            </Alert>
                        )}

                        {createTagSuccess && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                {createTagSuccess}
                            </Alert>
                        )}

                        <TextField
                            fullWidth
                            label="Name"
                            name="tag"
                            value={tagData.tag}
                            onChange={handleChange}
                            disabled={isCreateTagLoading || !!createTagSuccess}
                        />

                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            multiline
                            rows={3}
                            value={tagData.description}
                            onChange={handleChange}
                            disabled={isCreateTagLoading || !!createTagSuccess}
                        />

                        <FormControl fullWidth size="small">
                            <InputLabel>Required Role</InputLabel>
                            <Select
                                name="required_role"
                                value={tagData.required_role}
                                onChange={handleChange}
                                label="Required Role"
                                disabled={isCreateTagLoading || !!createTagSuccess}
                            >
                                <MenuItem value="Member">Member</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    {!createTagSuccess ? (
                        <>
                            <Button
                                onClick={handleClose}
                                color="secondary"
                                disabled={isCreateTagLoading}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                color="success"
                                variant="contained"
                                disabled={isCreateTagLoading || !tagData.tag}
                                startIcon={isCreateTagLoading && <CircularProgress size={20} color="inherit" />}
                            >
                                {isCreateTagLoading ? 'Creating...' : 'Create Tag'}
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={handleClose}
                            color="secondary"
                        >
                            Close
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    )
}

export default CreateConfigurationTagSection;