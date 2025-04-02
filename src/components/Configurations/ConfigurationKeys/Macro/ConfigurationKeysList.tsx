import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {UserConfigurationRole} from "../../../../app/Interfaces/State/configurationsGeneralTypes.ts";
import {getConfigurationKeysAsync} from "../../../../app/storeSlices/configurationKeysSlice.ts";
import {Alert, AlertTitle, Box, CircularProgress, Pagination} from "@mui/material";
import Grid from "@mui/material/Grid";
import ConfigurationKeyMetaItem from "./ConfigurationKeyMetaItem.tsx";

interface ConfigurationKeysListProps {
    keysPerPage: number,
    configurationId: number,
    configurationRole: UserConfigurationRole
}

function ConfigurationKeysList({keysPerPage, configurationId, configurationRole}: ConfigurationKeysListProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {error, isLoading, configurationKeys} = useAppSelector((state) => state.configuration_keys);

    const dispatch = useAppDispatch();

    const totalProducts = configurationKeys.length;
    const totalPages = Math.ceil(totalProducts / keysPerPage);
    const startIndex = (currentPage - 1) * keysPerPage;
    const endIndex = startIndex + keysPerPage;

    const pageConfigurationKeys = configurationKeys.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchKeys = async () => {
            await dispatch(getConfigurationKeysAsync({configuration_id: configurationId})).unwrap();
        }

        fetchKeys().catch(console.error);
        setCurrentPage(1);
    }, [dispatch, configurationId]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        event.stopPropagation();
        setCurrentPage(page);
    };

    if (isLoading) {
        return (
            <Box minHeight="30vh" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress color="secondary"/>
            </Box>
        );
    }

    if (error) {
        return (
            <Box minHeight="20vh" display="flex" justifyContent="center" alignItems="center">
                <Alert
                    severity="error"
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        maxWidth: 600
                    }}
                >
                    <AlertTitle>Unable to load configuration keys.</AlertTitle>
                    {error}
                </Alert>
            </Box>
        );
    }


    if (!error && !isLoading && configurationKeys.length === 0){
        return (
            <Box  minHeight="20vh" display="flex" justifyContent="center" alignItems="center">
                <Alert
                    severity="info"
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        maxWidth: 600
                    }}
                >
                    <AlertTitle>Configuration doesn't have keys.</AlertTitle>
                </Alert>
            </Box>
        );
    }


    return (
        <>
            <Grid
                container
                spacing={1}
                sx={{
                    flexGrow: 1,
                    overflow: 'auto',
                    pb: 1
                }}
            >
                {pageConfigurationKeys.map((key) => (
                    <ConfigurationKeyMetaItem
                        key={key.id}
                        configurationKey={key}
                        configurationId={configurationId}
                        configurationRole={configurationRole}
                    />
                ))}
            </Grid>

            <Box
                sx={{
                    position: 'sticky',
                    bottom: 0,
                    display: 'flex',
                    justifyContent: "center",
                    backgroundColor: 'background.default',
                    zIndex: 1,
                    py: 1,
                    borderTop: '1px solid',
                    borderColor: 'divider'
                }}
            ><Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="secondary"
                sx={{
                    '& .MuiPaginationItem-root': {
                        color: 'text.primary',
                        '&.Mui-selected': {
                            fontWeight: 'bold',
                        }
                    }
                }}
            />
            </Box>
        </>
    );
}

export default ConfigurationKeysList;