import {ConfigurationMember} from "../../../../app/Interfaces/State/configurationUsersTypes.ts";
import {UserConfigurationRole} from "../../../../app/Interfaces/State/configurationsGeneralTypes.ts";
import Grid from "@mui/material/Grid";
import {
    Box,
    Card,
    CardContent,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {
    changeConfigurationMemberRole,
    getConfigurationUsersAsync
} from "../../../../app/storeSlices/configurationUsersSlice.ts";
import {ChangeConfigurationUserRoleRequest} from "../../../../app/Interfaces/Contracts/configurationUsersContracts.ts";
import DeleteUserFromConfigurationSection from "./DeleteUserFromConfigurationSection.tsx";

interface ConfigurationUserMetaItemProps {
    configurationUser: ConfigurationMember,
    configurationId: number,
    configurationRole: UserConfigurationRole
}

function ConfigurationUserMetaItem({configurationUser, configurationId, configurationRole}: ConfigurationUserMetaItemProps) {
    const dispatch = useAppDispatch();
    const {isEditUserLoading} = useAppSelector((state) => state.configuration_users);


    const handleRoleChange = async (event: SelectChangeEvent) => {
        const newRole = event.target.value as string;
        if (configurationUser) {
            const request: ChangeConfigurationUserRoleRequest = {
                configuration_id: configurationId,
                user_id: configurationUser.id,
                new_role: newRole
            }

            let isRequestValid: boolean = true;
            try {
                await dispatch(changeConfigurationMemberRole(request)).unwrap();
            } catch (error) {
                console.error(error);
                isRequestValid = false;
            }

            if (isRequestValid) {
                await dispatch(getConfigurationUsersAsync({configuration_id: configurationId}));
            }
        }
    };

    return (
        <Grid
            key={configurationUser.id}
            size={{
                xs:12
            }}
        >
                <Card sx={{
                    display: 'flex',
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                }}>
                    <CardContent sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        py: 2,
                        px: 2
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    mr: 1
                                }}
                            >
                                {configurationUser.username}: {configurationUser.email}
                            </Typography>
                        </Box>

                        {
                            (configurationRole === UserConfigurationRole.Admin) ?
                                (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 2,
                                            width: '100%',
                                            justifyContent: 'space-between'
                                        }}
                                    >
                                        <FormControl size="small" sx={{ minWidth: 120, ml: 'auto' }}>
                                            <Select
                                                value={configurationUser.role}
                                                onChange={handleRoleChange}
                                                disabled={isEditUserLoading}
                                            >
                                                <MenuItem value="Member">Member</MenuItem>
                                                <MenuItem value="Admin">Admin</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <DeleteUserFromConfigurationSection
                                            configurationId={configurationId}
                                            configurationUser={configurationUser}
                                        />
                                    </Box>
                                )
                                :
                                    (
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontWeight: 500,
                                                    color: 'text.secondary'
                                                }}
                                            >
                                                {configurationUser.role}
                                            </Typography>
                                        </Box>
                                    )
                        }

                    </CardContent>
                </Card>
        </Grid>
    );
}

export default ConfigurationUserMetaItem;