import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import {deleteConfigurationTagAsync} from "../../../../app/storeSlices/configurationTagsSlice.ts";
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

interface DeleteConfigurationTagSectionProps {
    configurationId: number,
    tagId: number,
}

function DeleteConfigurationTagSection({configurationId, tagId}: DeleteConfigurationTagSectionProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const {isTagSettingsLoading, selectedConfigurationTag} = useAppSelector((state) => state.configuration_tags);
    const dispatch = useAppDispatch();

    const handleDeleteConfiguration = async () => {
        try {
            if (selectedConfigurationTag) {
                await dispatch(deleteConfigurationTagAsync({configuration_id: configurationId, tag_id: tagId})).unwrap();
            }
        } catch (error) {
            console.error('Configuration tag deletion failed:', error);
        } finally {
            setDeleteDialogOpen(false);
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
                disabled={ isTagSettingsLoading }
                startIcon={<DeleteRoundedIcon/>}
                sx={{
                    py: 1,
                    px: 2,
                }}
            >
                Delete
            </Button>

            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                aria-labelledby="delete-account-dialog"
            >
                <DialogTitle id="delete-account-dialog" sx={{ fontWeight: 600 }}>
                    Confirm configuration tag deletion
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontSize: '1.05rem' }}>
                        Are you sure you want to delete {selectedConfigurationTag? selectedConfigurationTag.tag : "this"} tag? <br/>
                        This action is permanent and cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        color="secondary"
                        disabled={isTagSettingsLoading}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDeleteConfiguration}
                        color="error"
                        variant="contained"
                        disabled={isTagSettingsLoading}
                        startIcon={isTagSettingsLoading && <CircularProgress size={20} color="inherit" />}
                    >
                        {isTagSettingsLoading ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default DeleteConfigurationTagSection;