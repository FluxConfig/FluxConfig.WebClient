import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {deleteConfigurationAsync} from "../../../app/storeSlices/configurationsGeneralSlice.ts";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";

function DeleteConfigurationSection({configurationId}: {configurationId: number}) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const {isConfigurationSettingsLoading, selectedConfiguration} = useAppSelector((state) => state.configurations_general);
    const dispatch = useAppDispatch();

    const handleDeleteConfiguration = async () => {
        try {
            if (selectedConfiguration) {
                await dispatch(deleteConfigurationAsync({id: configurationId})).unwrap();
            }
        } catch (error) {
            console.error('Configuration deletion failed:', error);
        } finally {
            setDeleteDialogOpen(false);
        }
    };

    return (
        <>
            <Button
                variant="contained"
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
                disabled={ isConfigurationSettingsLoading }
                sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                        backgroundColor: 'error.dark'
                    }
                }}
            >
                Delete configuration
            </Button>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="delete-account-dialog"
            >
                <DialogTitle id="delete-account-dialog" sx={{ fontWeight: 600 }}>
                    Confirm configuration deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: '1.05rem' }}>
                        Are you sure you want to delete {selectedConfiguration ? selectedConfiguration.name : "this"} configuration? <br/>
                        This action is permanent and cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        color="secondary"
                        disabled={isConfigurationSettingsLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfiguration}
                        color="error"
                        variant="contained"
                        disabled={isConfigurationSettingsLoading}
                        startIcon={isConfigurationSettingsLoading && <CircularProgress size={20} color="inherit" />}
                    >
                        {isConfigurationSettingsLoading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteConfigurationSection;