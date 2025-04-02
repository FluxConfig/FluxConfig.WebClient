import {Container, Typography, Paper, Divider, Box} from '@mui/material';
import ConfigurationsList from "./Macro/ConfigurationsList.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import React,{useEffect, useState} from "react";
import {getUserConfigurationsAsync} from "../../app/storeSlices/configurationsGeneralSlice.ts";
import {UserGlobalRole} from "../../app/Interfaces/State/userStateTypes.ts";
import CreateConfigurationSection from "./Macro/CreateConfigurationSection.tsx";


function UserConfigurationsPage() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {userConfigurations, error, isLoading} = useAppSelector((state) => state.configurations_general);
    const {user} = useAppSelector((state) => state.user);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchConfigurations = async () => {
            await dispatch(getUserConfigurationsAsync()).unwrap();
        }

        fetchConfigurations().catch(console.error);
        setCurrentPage(1);
    }, [dispatch]);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        event.stopPropagation();
        setCurrentPage(page);
    };

    return (
        <Container maxWidth="lg" sx={{ my: 2, minHeight: '95vh' }}>
            <Paper elevation={3}
                   sx={{
                       p: 4,
                       borderRadius: 2 }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 2
                }}>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                        Configurations
                    </Typography>

                    {
                        (user && user.role >= UserGlobalRole.Trusted) &&
                        <CreateConfigurationSection/>
                    }

                </Box>

                <Divider sx={{ width: '100%', my: 2, borderBottomWidth: '2px'}}/>

                <ConfigurationsList
                    userConfigurations={userConfigurations}
                    error={error}
                    isLoading={isLoading}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                    configurationsPerPage={10}
                />
            </Paper>
        </Container>
    );
}

export default UserConfigurationsPage;