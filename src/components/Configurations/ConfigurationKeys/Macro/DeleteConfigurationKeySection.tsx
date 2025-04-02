import {ConfigurationKey} from "../../../../app/Interfaces/State/configurationKeysTypes.ts";
import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle, IconButton
} from "@mui/material";
import {
    clearDeleteKeyError, clearDeleteKeySuccess,
    deleteConfigurationKeyAsync,
    getConfigurationKeysAsync
} from "../../../../app/storeSlices/configurationKeysSlice.ts";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

function DeleteConfigurationKeySection({configurationId, configurationKey}: {configurationId: number, configurationKey: ConfigurationKey}) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const {isDeleteKeyLoading, deleteKeySuccess, deleteKeyError} = useAppSelector((state) => state.configuration_keys);
    const dispatch = useAppDispatch();

    const handleDeleteUserFromConfig = async () => {
        let isRequestValid: boolean = true;
        try {
            await dispatch(deleteConfigurationKeyAsync({
                configuration_id: configurationId,
                key_id: configurationKey.id
            })).unwrap();
        } catch (error) {
            console.error(error);
            isRequestValid = false;
        }

        if (isRequestValid) {
            await dispatch(getConfigurationKeysAsync({configuration_id: configurationId}));
        }
    };

    const handleClose = () => {
        dispatch(clearDeleteKeyError());
        dispatch(clearDeleteKeySuccess());
        setDeleteDialogOpen(false);
    };

    const handleOpen = () => {
        dispatch(clearDeleteKeyError());
        dispatch(clearDeleteKeySuccess());
        setDeleteDialogOpen(true);
    }

    return (
        <>
            <IconButton
                color="error"
                onClick={handleOpen}
                disabled={ isDeleteKeyLoading }
                size="small"
            >
                <DeleteRoundedIcon/>
            </IconButton>

            <Dialog open={deleteDialogOpen} onClose={handleClose} maxWidth="sm">
                <DialogTitle>Confirm api key deletion</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {deleteKeyError && (
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                {deleteKeyError}
                            </Alert>
                        )}

                        {deleteKeySuccess && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                {deleteKeySuccess}
                            </Alert>
                        )}

                    </Box>

                    <DialogContentText sx={{ fontSize: '1.05rem' }}>
                        Are you sure you want to delete this API key?
                        <br/>
                        This action is permanent and cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {!deleteKeySuccess ? (
                        <>
                            <Button
                                onClick={handleClose}
                                color="secondary"
                                disabled={isDeleteKeyLoading}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDeleteUserFromConfig}
                                color="error"
                                variant="contained"
                                disabled={isDeleteKeyLoading}
                                startIcon={isDeleteKeyLoading&& <CircularProgress size={20} color="inherit" />}
                            >
                                {isDeleteKeyLoading? 'Deleting...' : 'Delete'}
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
    );
}

export default DeleteConfigurationKeySection;