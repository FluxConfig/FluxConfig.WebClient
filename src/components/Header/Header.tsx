import {AppBar, Box, Button, Container, Divider, Toolbar, Typography} from "@mui/material";
import {useAppSelector} from "../../app/hooks.ts";
import { Link } from "react-router-dom";
import LogoIcon from "../Icons/LogoIcon.tsx";
import HeaderAccountMenu from "./HeaderAccountMenu.tsx";
import {UserGlobalRole} from "../../app/Interfaces/State/userStateTypes.ts";

function Header() {
    const { user } = useAppSelector((state) => state.user);

    return (
        <AppBar
            position="sticky"
            sx={{
                borderBottom: '2px solid',
                borderColor: "divider",
                backgroundColor: "primary"
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button
                        component={Link}
                        to="/"
                        variant="text"
                        color="inherit"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textTransform: 'none',
                            '&:hover': {
                                backgroundColor: 'rgba(0, 0, 0, 0.04)'
                            },
                            '& .MuiTypography-root': {
                                fontSize: { xs: '1rem', sm: '1.25rem' }
                            }
                        }}
                    >
                        <LogoIcon sx={{
                            width: 52,
                            height: 52,
                            '& svg': {
                                width: '100%',
                                height: '100%'
                            },
                            margin: '-8px',
                            flexShrink: 0
                        }} />
                        <Typography variant="h5">
                            FluxConfig
                        </Typography>
                    </Button>

                    { (user && user.role === UserGlobalRole.Admin) &&
                        <>
                            <Divider
                                orientation="vertical"
                                variant="middle"
                                flexItem
                                sx={{
                                    mx: 1,
                                    borderColor: 'divider'
                                }}
                            />
                            <Button
                                component={Link}
                                to="/system-users"
                                variant="text"
                                sx={{
                                    textTransform: 'none',
                                    color: 'text.primary',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                    },
                                    mr: 2
                                }}
                            >
                                Users
                            </Button>
                        </>
                    }

                    <Box sx={{
                        ml: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: [1, 1.5]
                    }}>
                        {user &&
                            <HeaderAccountMenu/>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;