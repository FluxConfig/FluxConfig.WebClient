import {Container, Typography, Paper, Divider} from '@mui/material';
import ConfigurationsList from "./Macro/ConfigurationsList.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import React,{useEffect, useState} from "react";
import {getUserConfigurationsAsync} from "../../app/storeSlices/configurationsGeneralSlice.ts";


function ConfigurationsPage() {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const {userConfigurations, error, isLoading} = useAppSelector((state) => state.configurations_general);

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
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    Configurations
                </Typography>

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

export default ConfigurationsPage;