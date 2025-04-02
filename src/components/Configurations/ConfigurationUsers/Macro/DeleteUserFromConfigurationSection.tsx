import { useState} from "react";
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
    clearDeleteUserError, clearDeleteUserSuccess,
    deleteUserFromConfigurationAsync,
    getConfigurationUsersAsync
} from "../../../../app/storeSlices/configurationUsersSlice.ts";
import {ConfigurationMember} from "../../../../app/Interfaces/State/configurationUsersTypes.ts";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function DeleteUserFromConfigurationSection({configurationId, configurationUser }: {configurationId: number, configurationUser: ConfigurationMember}) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const {isDeleteUserLoading, deleteUserSuccess, deleteUserError} = useAppSelector((state) => state.configuration_users);
    const dispatch = useAppDispatch();

    const handleDeleteUserFromConfig = async () => {
        let isRequestValid: boolean = true;
        try {
            await dispatch(deleteUserFromConfigurationAsync({
                configuration_id: configurationId,
                user_id: configurationUser.id
            })).unwrap();
        } catch (error) {
            console.error(error);
            isRequestValid = false;
        }

        if (isRequestValid) {
            await dispatch(getConfigurationUsersAsync({configuration_id: configurationId}));
        }
    };

    const handleClose = () => {
        dispatch(clearDeleteUserError());
        dispatch(clearDeleteUserSuccess());
        setDeleteDialogOpen(false);
    };

    const handleOpen = () => {
        dispatch(clearDeleteUserError());
        dispatch(clearDeleteUserSuccess());
        setDeleteDialogOpen(true);
    }

    return (
        <>
            <IconButton
                color="error"
                onClick={handleOpen}
                size="small"
                disabled={ isDeleteUserLoading }
            >
                <PersonRemoveIcon/>
            </IconButton>

            <Dialog open={deleteDialogOpen} onClose={handleClose} maxWidth="sm">
                <DialogTitle>Confirm configuration member deletion</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {deleteUserError && (
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                {deleteUserError}
                            </Alert>
                        )}

                        {deleteUserSuccess && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                {deleteUserSuccess}
                            </Alert>
                        )}

                    </Box>

                    <DialogContentText sx={{ fontSize: '1.05rem' }}>
                        Are you sure you want to delete {configurationUser ? configurationUser.username : "this user"} from configuration?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {!deleteUserSuccess ? (
                        <>
                            <Button
                                onClick={handleClose}
                                color="secondary"
                                disabled={isDeleteUserLoading}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDeleteUserFromConfig}
                                color="error"
                                variant="contained"
                                disabled={isDeleteUserLoading}
                                startIcon={isDeleteUserLoading&& <CircularProgress size={20} color="inherit" />}
                            >
                                {isDeleteUserLoading ? 'Deleting...' : 'Delete'}
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

export default DeleteUserFromConfigurationSection;