import React, { useState} from "react";
import {CreateConfigurationRequest} from "../../../app/Interfaces/Contracts/configurationsGeneralContracts.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {
    clearCreateConfError,
    clearSuccess,
    createConfigurationAsync, getUserConfigurationsAsync
} from "../../../app/storeSlices/configurationsGeneralSlice.ts";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";

function CreateConfigurationSection() {
    const [formData, setFormData] = useState<CreateConfigurationRequest>(
        { name: '', description: '' }
    );
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const { isCreateConfLoading, createConfigurationError, success } = useAppSelector((state) => state.configurations_general);
    const dispatch = useAppDispatch();


    async function handleSubmit(){

        let isRequestValid: boolean = true;
        try {
            await dispatch(createConfigurationAsync(formData)).unwrap();
        } catch (error) {
            console.error(error);
            isRequestValid = false;
        }

        if (isRequestValid) {
            await dispatch(getUserConfigurationsAsync());
        }
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

        if (createConfigurationError) {
            dispatch(clearCreateConfError());
        }
    }

    const handleClose = () => {
        setFormData({ name: '', description: '' });
        dispatch(clearCreateConfError());
        dispatch(clearSuccess());
        setDialogOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={() => setDialogOpen(true)}
                color="success"
                sx={{
                    '&:hover': {
                        backgroundColor: 'success.dark'
                    }
                }}
            >
                Create
            </Button>

            <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Configuration</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {createConfigurationError && (
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                {createConfigurationError}
                            </Alert>
                        )}

                        {success && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                {success}
                            </Alert>
                        )}

                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleOnChange}
                            disabled={isCreateConfLoading || !!success}
                        />

                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleOnChange}
                            disabled={isCreateConfLoading || !!success}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    {!success ? (
                        <>
                            <Button
                                onClick={handleClose}
                                color="secondary"
                                disabled={isCreateConfLoading}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                color="success"
                                variant="contained"
                                disabled={isCreateConfLoading}
                                startIcon={isCreateConfLoading && <CircularProgress size={20} color="inherit" />}
                            >
                                {isCreateConfLoading ? 'Creating...' : 'Create'}
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

export default CreateConfigurationSection;