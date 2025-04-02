import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import React, { useState } from "react";
import {
    addConfigurationKeyAsync,
    clearAddKeyError,
    clearAddKeySuccess,
    getConfigurationKeysAsync
} from "../../../../app/storeSlices/configurationKeysSlice.ts";
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
    MenuItem, SelectChangeEvent
} from "@mui/material";

function CreateConfigurationKeySection({ configurationId }: { configurationId: number }) {
    const [rolePermission, setRolePermission] = useState<string>('Member');
    const [expirationDate, setExpirationDate] = useState<string>('');
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const { isAddKeyLoading, addKeyError, addKeySuccess } = useAppSelector((state) => state.configuration_keys);
    const dispatch = useAppDispatch();

    async function handleSubmit() {
        let isRequestValid = true;
        try {
            await dispatch(addConfigurationKeyAsync({
                configuration_id: configurationId,
                role_permission: rolePermission,
                expiration_date: expirationDate
            })).unwrap();
        } catch (error) {
            console.error(error);
            isRequestValid = false;
        }

        if (isRequestValid) {
            await dispatch(getConfigurationKeysAsync({ configuration_id: configurationId }));
        }
    }

    const handleRoleChange = (event: SelectChangeEvent) => {
        setRolePermission(event.target.value as string);
        if (addKeyError) {
            dispatch(clearAddKeyError());
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExpirationDate(e.target.value);
        if (addKeyError)  {
            dispatch(clearAddKeyError());
        }
    };

    const handleClose = () => {
        setRolePermission('Member');
        setExpirationDate('');
        dispatch(clearAddKeySuccess());
        dispatch(clearAddKeyError());
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
                Create Key
            </Button>

            <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Create New Key</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {addKeyError && (
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                {addKeyError}
                            </Alert>
                        )}

                        {addKeySuccess && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                {addKeySuccess}
                            </Alert>
                        )}

                        <FormControl fullWidth size="small">
                            <InputLabel>Role Permission</InputLabel>
                            <Select
                                value={rolePermission}
                                onChange={handleRoleChange}
                                label="Role Permission"
                                disabled={isAddKeyLoading || !!addKeySuccess}
                            >
                                <MenuItem value="Member">Member</MenuItem>
                                <MenuItem value="Admin">Admin</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            fullWidth
                            label="Expiration Date"
                            type="date"
                            focused={true}
                            value={expirationDate}
                            onChange={handleDateChange}
                            disabled={isAddKeyLoading || !!addKeySuccess}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    {!addKeySuccess ? (
                        <>
                            <Button
                                onClick={handleClose}
                                color="secondary"
                                disabled={isAddKeyLoading}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                color="success"
                                variant="contained"
                                disabled={isAddKeyLoading || !expirationDate}
                                startIcon={isAddKeyLoading && <CircularProgress size={20} color="inherit" />}
                            >
                                {isAddKeyLoading ? 'Creating...' : 'Create Key'}
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

export default CreateConfigurationKeySection;