import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks.ts";
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {
    changeTagRequiredRoleAsync,
    clearTagSettingsError
} from "../../../../app/storeSlices/configurationTagsSlice.ts";
import { ChangeConfigurationTagRequiredRoleRequest } from "../../../../app/Interfaces/Contracts/configurationTagsContracts.ts";

interface ChangeConfigurationTagRequiredRoleFormProps {
    configurationId: number,
    tagId: number,
}

function ChangeConfigurationTagRequiredRoleForm({ configurationId, tagId }: ChangeConfigurationTagRequiredRoleFormProps) {
    const [newRole, setNewRole] = useState<string>('Member');
    const { tagSettingsError, isTagSettingsLoading } = useAppSelector((state) => state.configuration_tags);
    const dispatch = useAppDispatch();

    const handleRoleChange = (e: SelectChangeEvent) => {
        setNewRole(e.target.value);
        if (tagSettingsError) {
            dispatch(clearTagSettingsError());
        }
    };

    async function handleUpdateRole() {
        const request: ChangeConfigurationTagRequiredRoleRequest = {
            configuration_id: configurationId,
            tag_id: tagId,
            new_role: newRole
        };

        let isRequestValid = true;
        try {
            await dispatch(changeTagRequiredRoleAsync(request)).unwrap();
        } catch (error) {
            console.error(error);
            isRequestValid = false;
        }

        if (isRequestValid) {
            setNewRole('Member');
        }
    }

    return (
        <Box component="form">
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>New Required Role</InputLabel>
                <Select
                    value={newRole}
                    onChange={handleRoleChange}
                    label="New Required Role"
                    disabled={isTagSettingsLoading}
                >
                    <MenuItem value="Member">Member</MenuItem>
                    <MenuItem value="Admin">Admin</MenuItem>
                </Select>
            </FormControl>

            <Button
                variant="contained"
                onClick={handleUpdateRole}
                disabled={isTagSettingsLoading}
            >
                {isTagSettingsLoading ? (
                    <CircularProgress size={24} color="inherit" />
                ) : 'Change'}
            </Button>
        </Box>
    );
}

export default ChangeConfigurationTagRequiredRoleForm;