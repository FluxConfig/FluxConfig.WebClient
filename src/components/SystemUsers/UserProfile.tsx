import {Navigate, useLocation, useParams} from "react-router-dom";
import {
    Alert,
    Box,
    Paper,
    Container,
    Typography,
    Divider,
    SelectChangeEvent,
    FormControl,
    Select,
    MenuItem,
    CircularProgress
} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
    changeUserRoleAsync,
    clearError,
    clearSuccess,
    getUserMetaAsync
} from "../../app/storeSlices/systemUsersSlice.ts";
import ConfigurationsList from "../Configurations/GeneralMacro/ConfigurationsList.tsx";
import {ChangeUserRoleRequest} from "../../app/Interfaces/Contracts/userCredentialsContracts.ts";
import DeleteSystemUserAccountSection from "./Macro/DeleteSystemUserAccountSection.tsx";

type UserIdRouteParams = {
    userId: string
}

function UserProfile() {
    const {userId} = useParams<UserIdRouteParams>();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {selectedUser, success,  error, isLoading, isChangeRoleLoading} = useAppSelector((state) => state.system_users);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const userIdNum = parseInt(userId || '', 10);

    useEffect(() => {
        const fetchUser = async () => {
            await dispatch(getUserMetaAsync({id: userIdNum})).unwrap();
        }

        fetchUser().catch(console.error);
        setCurrentPage(1);
    }, [dispatch, userIdNum]);

    useEffect(() => {
        dispatch(clearError());
        dispatch(clearSuccess());
    }, [dispatch]);


    if (isNaN(userIdNum)) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    const handleRoleChange = async (event: SelectChangeEvent) => {
        const newRole = event.target.value as string;
        if (selectedUser) {
            const request: ChangeUserRoleRequest = {
                user_id: userIdNum,
                role: newRole
            };
            await dispatch(changeUserRoleAsync(request));
        }
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        event.stopPropagation();
        setCurrentPage(page);
    };

    return (
        <Container maxWidth="md" sx={{ my: 2, minHeight: '95vh' }}>
            <Paper elevation={3} sx={{
                p: 4,
                borderRadius: 4
            }}>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                }}>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        System member
                    </Typography>

                    {(!isLoading && selectedUser) &&
                        <DeleteSystemUserAccountSection
                            userId={userIdNum}
                        />
                    }
                </Box>

                <Divider sx={{ width: '100%', my: 2, borderBottomWidth: '2px'}}/>

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

                { success && (
                    <Alert severity="success" sx={{ my: 2 }}>
                        {success}
                    </Alert>
                )}

                {
                    (!isLoading && selectedUser) && (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>
                                <b>Username:</b> {selectedUser.username}
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>
                                <b>Email:</b> {selectedUser.email}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>
                                    <b>Role:</b>
                                </Typography>
                                <FormControl size="small" sx={{ minWidth: 120 }}>
                                    <Select
                                        value={selectedUser.role}
                                        onChange={handleRoleChange}
                                        disabled={isChangeRoleLoading}
                                    >
                                        <MenuItem value="Admin">Admin</MenuItem>
                                        <MenuItem value="Trusted">Trusted</MenuItem>
                                        <MenuItem value="Member">Member</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                    )
                }

                {
                    (!isLoading && selectedUser) && (
                        <>
                            <Divider sx={{ width: '100%', my: 2, borderBottomWidth: '2px'}}/>

                            <Box sx={{ mb: 3 }}>
                                <Typography variant="h6" gutterBottom sx={{
                                    fontWeight: 600,
                                    fontSize: '1.25rem',
                                    mb: 2
                                }}>
                                    User Configurations
                                </Typography>
                                <ConfigurationsList
                                    userConfigurations={selectedUser.configurations}
                                    error={null}
                                    isLoading={isLoading}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                    configurationsPerPage={5}
                                />
                            </Box>
                        </>
                    )
                }

            </Paper>
        </Container>
    );


}

export default UserProfile;