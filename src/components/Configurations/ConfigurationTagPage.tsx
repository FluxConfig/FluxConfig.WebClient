import { Link, Navigate, useLocation, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {clearDeleteTagSuccess, getConfigurationTagAsync} from "../../app/storeSlices/configurationTagsSlice.ts";
import {getConfigurationAsync} from "../../app/storeSlices/configurationsGeneralSlice.ts";
import {Alert, Box, CircularProgress, Container, Divider, Paper, Typography, Tabs, Tab, Button, Link as MuiLink} from "@mui/material";
import {UserConfigurationRole} from "../../app/Interfaces/State/configurationsGeneralTypes.ts";
import ConfigurationTagSettingsSection
    from "./ConfigurationTags/ConfigurationTagSettings/ConfigurationTagSettingsSection.tsx";


type ConfigurationTagRouteParams = {
    tagId: string
}

function ConfigurationTagPage() {
    const {tagId} = useParams<ConfigurationTagRouteParams>();
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const { isLoading: isLoadingTag, error: tagError, selectedConfigurationTag, deleteTagSuccess } =
        useAppSelector((state) => state.configuration_tags);
    const { isLoading: isLoadingConfig, error: configError, selectedConfiguration } =
        useAppSelector((state) => state.configurations_general);


    const dispatch = useAppDispatch();
    const location = useLocation();

    const tagIdNum = parseInt(tagId || '', 10);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tagResult = await dispatch(
                    getConfigurationTagAsync({ tag_id: tagIdNum })
                ).unwrap();

                if (tagResult) {
                    await dispatch(
                        getConfigurationAsync({ id: tagResult.configuration_id })
                    ).unwrap();
                }
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        if(!isNaN(tagIdNum)) {
            fetchData().catch(console.error);
        }

    }, [dispatch, tagIdNum]);

    useEffect(() => {
        dispatch(clearDeleteTagSuccess());
    }, [dispatch]);

    if (isNaN(tagIdNum)) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        event.stopPropagation();
        setSelectedTab(newValue);
    };

    const renderTabContent = () => {
        switch(selectedTab) {
            case 2:
                return <ConfigurationTagSettingsSection
                    configurationId={selectedConfigurationTag!.configuration_id}
                    tagId={tagIdNum}
                />
            default:
                return null;
        }
    };

    return (
        <Container maxWidth="md" sx={{ my: 2, minHeight: '95vh' }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>

                {(isLoadingTag || isLoadingConfig) && (
                    <Box minHeight="30vh" display="flex" justifyContent="center" alignItems="center">
                        <CircularProgress color="secondary" />
                    </Box>
                )}

                {(tagError || configError) && (
                    <Alert severity="error" sx={{ my: 2 }}>
                        {tagError || configError}
                    </Alert>
                )}

                { deleteTagSuccess && (
                    <>
                        <Alert severity="success" sx={{ my: 2 }}>
                            {deleteTagSuccess}
                        </Alert>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start'}}>
                            <Button
                                component={Link}
                                to= {selectedConfiguration ? `/configurations/${selectedConfiguration.id}` : "/"}
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
                                    Back to configuration
                                </Typography>
                            </Button>
                        </Box>
                    </>
                )}

                {(!isLoadingConfig && !isLoadingTag && selectedConfigurationTag && selectedConfiguration) && (
                    <>
                        <Box sx={{ mb: 2 }}>
                            {/*<Button*/}
                            {/*    component={Link}*/}
                            {/*    to={`/configurations/${selectedConfigurationTag.configuration_id}`}*/}
                            {/*    variant="text"*/}
                            {/*    color="secondary"*/}
                            {/*    startIcon={<ArrowBackIcon />}*/}
                            {/*    sx={{*/}
                            {/*        mb: 1,*/}
                            {/*        px: 0,*/}
                            {/*        '&:hover': {*/}
                            {/*            backgroundColor: 'transparent',*/}
                            {/*            textDecoration: 'underline'*/}
                            {/*        }*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    Back to Configuration*/}
                            {/*</Button>*/}

                            <Typography variant="h5" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                                {selectedConfigurationTag.tag}
                            </Typography>

                            <Divider sx={{ my: 2, borderBottomWidth: 2 }} />

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                                <Typography variant="body1">
                                    <b>Configuration:</b>{" "}
                                    <MuiLink
                                        component={Link}
                                        to={`/configurations/${selectedConfigurationTag.configuration_id}`}
                                        color="inherit"
                                        underline="hover"
                                    >
                                        {selectedConfiguration.name}
                                    </MuiLink>
                                </Typography>

                                <Typography variant="body1">
                                    <b>Description:</b> {selectedConfigurationTag.description}
                                </Typography>
                                <Typography variant="body1">
                                    <b>Required Role:</b> {selectedConfigurationTag.required_role}
                                </Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 3, borderBottomWidth: 2 }} />

                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            indicatorColor="secondary"
                            textColor="secondary"
                        >
                            <Tab label="RealTime" />
                            <Tab label="Vault" />
                            { selectedConfiguration.user_role === UserConfigurationRole.Admin &&
                                <Tab label="Settings" />
                            }
                        </Tabs>

                        <Box sx={{ pt: 2 }}>
                            {renderTabContent()}
                        </Box>
                    </>
                )}
            </Paper>
        </Container>
    );
}

export default ConfigurationTagPage;