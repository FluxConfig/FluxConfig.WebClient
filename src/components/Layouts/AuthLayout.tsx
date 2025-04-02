import {Box, Container, Paper, useTheme} from "@mui/material";
import React from "react";


function AuthLayout({children}: { children: React.ReactNode }) {
    const theme = useTheme();

    return (
        <Container
            component="main"
            maxWidth="sm"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: '100%',
                    maxWidth: 450,
                    p: theme => theme.spacing(3.5, 4),
                    [theme.breakpoints.down('sm')]: {
                        p: theme => theme.spacing(2.5, 3),
                        mx: 2
                    }
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    {children}
                </Box>
            </Paper>
        </Container>
    );
}

export default AuthLayout;