import {UserConfigurationRole} from "../../../../app/Interfaces/State/configurationsGeneralTypes.ts";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {getConfigurationUsersAsync} from "../../../../app/storeSlices/configurationUsersSlice.ts";
import {Alert, AlertTitle, Box, CircularProgress, Pagination} from "@mui/material";
import Grid from "@mui/material/Grid";
import ConfigurationUserMetaItem from "./ConfigurationUserMetaItem.tsx";


interface ConfigurationUsersListProps {
    usersPerPage: number,
    configurationId: number,
    configurationRole: UserConfigurationRole
}

function ConfigurationUsersList({usersPerPage, configurationId, configurationRole}: ConfigurationUsersListProps) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {isLoading, configurationUsers, error} = useAppSelector((state) => state.configuration_users);

    const dispatch = useAppDispatch();

    const totalProducts = configurationUsers.length;
    const totalPages = Math.ceil(totalProducts / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    const pageConfigurationUsers = configurationUsers.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchUsers = async () => {
            await dispatch(getConfigurationUsersAsync({configuration_id: configurationId})).unwrap();
        }

        fetchUsers().catch(console.error);
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

    if (configurationUsers.length === 0){
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
                    <AlertTitle>Configuration doesn't have any member.</AlertTitle>
                </Alert>
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
                    <AlertTitle>Unable to load configuration members.</AlertTitle>
                    {error}
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
                {pageConfigurationUsers.map((user) => (
                    <ConfigurationUserMetaItem
                        key={user.id}
                        configurationUser={user}
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

export default ConfigurationUsersList;