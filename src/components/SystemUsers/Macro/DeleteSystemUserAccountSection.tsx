import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {deleteUserAccountAsync} from "../../../app/storeSlices/systemUsersSlice.ts";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";


function DeleteSystemUserAccountSection({userId}: {userId: number}) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { deleteUserIsLoading, selectedUser } = useAppSelector((state) => state.system_users);
    const dispatch = useAppDispatch();

    const handleDeleteAccount = async () => {
        try {
            if (selectedUser) {
                await dispatch(deleteUserAccountAsync({user_id: userId})).unwrap();
            }
        } catch (error) {
            console.error('Account deletion failed:', error);
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
                    disabled={ deleteUserIsLoading }
                    size="small"
                    sx={{
                        py: 1.5,
                        px: 2,
                        '&:hover': {
                            backgroundColor: 'error.dark'
                        }
                    }}
                >
                    Delete user
                </Button>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="delete-account-dialog"
            >
                <DialogTitle id="delete-account-dialog" sx={{ fontWeight: 600 }}>
                    Confirm user deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: '1.05rem' }}>
                        Are you sure you want to delete {selectedUser ? selectedUser.username : "this"} account? <br/>
                        This action is permanent and cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        color="secondary"
                        disabled={deleteUserIsLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteAccount}
                        color="error"
                        variant="contained"
                        disabled={deleteUserIsLoading}
                        startIcon={deleteUserIsLoading && <CircularProgress size={20} color="inherit" />}
                    >
                        {deleteUserIsLoading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteSystemUserAccountSection;