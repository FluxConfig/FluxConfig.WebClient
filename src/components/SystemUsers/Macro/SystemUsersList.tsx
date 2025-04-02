import {Box, CircularProgress, Alert, AlertTitle, Pagination} from '@mui/material';
import Grid from '@mui/material/Grid';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import React, {useEffect, useState} from "react";
import {getAllUsersAsync} from "../../../app/storeSlices/systemUsersSlice.ts";
import SystemUserMetaItem from "./SystemUserMetaItem.tsx";


function SystemUsersList({usersPerPage}: {usersPerPage: number}) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {systemUsers, error, isLoading} = useAppSelector((state) => state.system_users);

    const dispatch = useAppDispatch();

    const totalProducts = systemUsers.length;
    const totalPages = Math.ceil(totalProducts / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    const pageSystemUsers = systemUsers.slice(startIndex, endIndex);

    useEffect(() => {
        const fetchUsers = async () => {
            await dispatch(getAllUsersAsync()).unwrap();
        }

        fetchUsers().catch(console.error);
        setCurrentPage(1);
    }, [dispatch]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        event.stopPropagation();
        setCurrentPage(page);
    };

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
                    severity="error"
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        maxWidth: 600
                    }}
                >
                    <AlertTitle>Unable to load system users.</AlertTitle>
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
                {pageSystemUsers.map((user) => (
                    <SystemUserMetaItem key={user.id} user={user} />
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

export default SystemUsersList;