import {Link, Navigate, useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import React, {useEffect, useState} from "react";
import {
    clearDeleteSuccess,
    clearError,
    getConfigurationAsync
} from "../../app/storeSlices/configurationsGeneralSlice.ts";
import {Alert, Box, Button, CircularProgress, Container, Divider, Paper, Tab, Tabs, Typography} from "@mui/material";
import {mapConfigRoleTypEnumToString} from "../../app/Mappers/enumMappers.ts";
import {UserConfigurationRole} from "../../app/Interfaces/State/configurationsGeneralTypes.ts";
import ConfigurationSettingsSection from "./ConfigurationSettings/ConfigurationSettingsSection.tsx";
import ConfigurationUsersSection from "./ConfigurationUsers/ConfigurationUsersSection.tsx";
import ConfigurationKeysSection from "./ConfigurationKeys/ConfigurationKeysSection.tsx";
import ConfigurationTagsSection from "./ConfigurationTags/ConfigurationTagsSection.tsx";

type ConfigurationIdRouteParams = {
    configurationId: string
}

function ConfigurationPage() {
    const {configurationId} = useParams<ConfigurationIdRouteParams>();
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const {selectedConfiguration, error, deleteSuccess, isLoading} = useAppSelector((state) => state.configurations_general);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const configurationIdNum = parseInt(configurationId || '', 10);

    useEffect(() => {
        const fetchUser = async () => {
            await dispatch(getConfigurationAsync({id: configurationIdNum})).unwrap();
        }

        fetchUser().catch(console.error);
    }, [dispatch, configurationIdNum]);

    useEffect(() => {
        dispatch(clearError());
        dispatch(clearDeleteSuccess());
    }, [dispatch]);


    if (isNaN(configurationIdNum)) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        event.stopPropagation();
        setSelectedTab(newValue);
    };

    const renderTabContent = () => {
        switch(selectedTab) {
            case 0:
                return <ConfigurationTagsSection
                    configurationId={configurationIdNum}
                    configurationRole={selectedConfiguration ? selectedConfiguration.user_role : UserConfigurationRole.Member}
                />
            case 1:
                return <ConfigurationKeysSection
                    configurationId={configurationIdNum}
                    configurationRole={selectedConfiguration ? selectedConfiguration.user_role : UserConfigurationRole.Member}
                />
            case 2:
                return <ConfigurationUsersSection
                    configurationId={configurationIdNum}
                    configurationRole={selectedConfiguration ? selectedConfiguration.user_role : UserConfigurationRole.Member}
                />
            case 3:
                return <ConfigurationSettingsSection
                    configurationId={configurationIdNum}
                />
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="md" sx={{ my: 2, minHeight: '95vh' }}>
            <Paper elevation={3} sx={{
                p: 4,
                borderRadius: 4
            }}>

                {
                    isLoading &&
                    (
                        <Box minHeight="30vh" display="flex" justifyContent="center" alignItems="center">
                            <CircularProgress color="secondary"/>
                        </Box>
                    )
                }

                { error && (
                    <Alert severity="warning" sx={{ my: 2 }}>
                        {error}
                    </Alert>
                )}

                { deleteSuccess && (
                    <>
                        <Alert severity="success" sx={{ my: 2 }}>
                            {deleteSuccess}
                        </Alert>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
                            <Button
                                component={Link}
                                to="/"
                                variant="outlined"
                                color="secondary"
                                sx={{
                                    textTransform: 'none',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    py: 1,
                                    px: 2,
                                    '&:hover': {
                                        borderColor: 'text.primary',
                                        backgroundColor: 'action.hover'
                                    }
                                }}
                            >
                                <Typography variant="body1">
                                    Back to configurations
                                </Typography>
                            </Button>
                        </Box>
                    </>
                )}

                {
                    (isLoading === false && selectedConfiguration) && (

                        <>
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mb: 2
                            }}>
                                <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                                    {selectedConfiguration.name}
                                </Typography>

                                <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>
                                    {mapConfigRoleTypEnumToString(selectedConfiguration.user_role)}
                                </Typography>
                            </Box>

                            <Divider sx={{ width: '100%', mb: 3, mt: 2, borderBottomWidth: '2px'}}/>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>
                                    <b>Description:</b> {selectedConfiguration.description}
                                </Typography>
                            </Box>

                            <Divider sx={{ width: '100%', my: 3, borderBottomWidth: '2px' }} />

                            <Tabs
                                value={selectedTab}
                                onChange={handleTabChange}
                                variant="fullWidth"
                                indicatorColor="secondary"
                                textColor="secondary"
                            >
                                <Tab label="Tags" />
                                <Tab label="API Keys" />
                                <Tab label="Members" />
                                {selectedConfiguration.user_role === UserConfigurationRole.Admin && (
                                    <Tab label="Settings" />
                                )}
                            </Tabs>

                            <Box sx={{ pt: 2 }}>
                                {renderTabContent()}
                            </Box>
                        </>
                    )
                }

            </Paper>
        </Container>
    );
}

export default ConfigurationPage;

