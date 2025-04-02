import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import React, {useState} from "react";
import {
    addUserToConfigurationAsync, clearAddUserError, clearAddUserSuccess,
    getConfigurationUsersAsync
} from "../../../../app/storeSlices/configurationUsersSlice.ts";
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

function AddUserToConfigurationSection({configurationId}: {configurationId: number}) {
    const [userEmail, setUserEmail] = useState<string>('')
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const {isAddUserLoading, addUserError, addUserSuccess} = useAppSelector((state) => state.configuration_users)

    const dispatch = useAppDispatch();

    async function handleSubmit(){

        let isRequestValid: boolean = true;
        try {
            await dispatch(addUserToConfigurationAsync({
                configuration_id: configurationId,
                user_email: userEmail
            })).unwrap();
        } catch (error) {
            console.error(error);
            isRequestValid = false;
        }

        if (isRequestValid) {
            await dispatch(getConfigurationUsersAsync({configuration_id: configurationId}));
        }
    }

    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>){
        setUserEmail(e.target.value)

        if (addUserError) {
            dispatch(clearAddUserError());
        }
    }

    const handleClose = () => {
        setUserEmail('');
        dispatch(clearAddUserSuccess());
        dispatch(clearAddUserError());
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
                Invite
            </Button>

            <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle>Invite new member</DialogTitle>
                <DialogContent>
                    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {addUserError && (
                            <Alert severity="warning" sx={{ mb: 2 }}>
                                {addUserError}
                            </Alert>
                        )}

                        {addUserSuccess && (
                            <Alert severity="success" sx={{ mb: 2 }}>
                                {addUserSuccess}
                            </Alert>
                        )}

                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            value={userEmail}
                            onChange={handleOnChange}
                            disabled={isAddUserLoading || !!addUserSuccess}
                        />

                    </Box>
                </DialogContent>
                <DialogActions>
                    {!addUserSuccess ? (
                        <>
                            <Button
                                onClick={handleClose}
                                color="secondary"
                                disabled={isAddUserLoading}>
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                color="success"
                                variant="contained"
                                disabled={isAddUserLoading}
                                startIcon={isAddUserLoading&& <CircularProgress size={20} color="inherit" />}
                            >
                                {isAddUserLoading ? 'Inviting...' : 'Invite'}
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

export default AddUserToConfigurationSection;