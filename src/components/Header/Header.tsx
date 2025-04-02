import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import {useAppSelector} from "../../app/hooks.ts";
import { Link } from "react-router-dom";
import LogoIcon from "../Icons/LogoIcon.tsx";
import HeaderAccountMenu from "./HeaderAccountMenu.tsx";

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
                                backgroundColor: 'rgba(255, 255, 255, 0.08)'
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