import {Box, CircularProgress, Alert, AlertTitle, Pagination} from '@mui/material';
import Grid from '@mui/material/Grid';
import ConfigurationMetaItem from "./ConfigurationMetaItem.tsx";
import {ServiceConfiguration} from "../../../app/Interfaces/State/configurationsGeneralTypes.ts";
import React from "react";

interface ConfigurationListProps {
    userConfigurations: ServiceConfiguration[],
    error: string | null,
    isLoading: boolean,
    onPageChange: (event: React.ChangeEvent<unknown>, page: number) => void,
    configurationsPerPage: number,
    currentPage: number
}

function ConfigurationsList({userConfigurations, error, isLoading, onPageChange, configurationsPerPage, currentPage}: ConfigurationListProps) {
    const totalProducts = userConfigurations.length;
    const totalPages = Math.ceil(totalProducts / configurationsPerPage);
    const startIndex = (currentPage - 1) * configurationsPerPage;
    const endIndex = startIndex + configurationsPerPage;

    const currentPageConfigurations = userConfigurations.slice(startIndex, endIndex);

    if (isLoading) {
        return (
            <Box minHeight="80vh" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress color="secondary"/>
            </Box>
        );
    }

    if (error) {
        return (
            <Box minHeight="20vh" display="flex" justifyContent="center" alignItems="center">
                <Alert
                    severity="warning"
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        maxWidth: 600
                    }}
                >
                    <AlertTitle>Unable to load configurations</AlertTitle>
                    {error}
                </Alert>
            </Box>
        );
    }

    if (userConfigurations.length === 0){
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
                    <AlertTitle>User doesn't belong to any configuration.</AlertTitle>
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
                {currentPageConfigurations.map((config) => (
                    <ConfigurationMetaItem key={config.id} config={config} />
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
                onChange={onPageChange}
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

export default ConfigurationsList;