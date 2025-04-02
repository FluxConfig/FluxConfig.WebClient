import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {deleteAccountAsync} from "../../app/storeSlices/userCredentialsSlice.ts";
import {useNavigate} from "react-router-dom";
import {
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    CircularProgress
} from "@mui/material";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

function DeleteAccountSection() {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const { isLoading } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        try {
            await dispatch(deleteAccountAsync()).unwrap();
            navigate('/sign-in');
        } catch (error) {
            console.error('Account deletion failed:', error);
        } finally {
            setDeleteDialogOpen(false);
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => setDeleteDialogOpen(true)}
                    disabled={isLoading}
                    startIcon={<DeleteRoundedIcon/>}
                    sx={{
                        py: 1.5,
                        px: 2,
                    }}
                >
                    Delete Account
                </Button>
            </Box>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="delete-account-dialog"
            >
                <DialogTitle id="delete-account-dialog" sx={{ fontWeight: 600 }}>
                    Confirm account deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: '1.05rem' }}>
                        Are you sure you want to delete your account? <br/>
                        This action is permanent and cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        color="secondary"
                        disabled={isLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteAccount}
                        color="error"
                        variant="contained"
                        disabled={isLoading}
                        startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteAccountSection;