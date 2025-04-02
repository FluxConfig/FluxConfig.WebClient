import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header.tsx";

function AppLayout() {
    return (
        <>
            <Header />
            <Container
                maxWidth={false}
                component="main"
                sx={{
                    flex: 1,
                    // py: 3,
                    // px: { xs: 2, sm: 3 }
                }}
                disableGutters
            >
                <Outlet />
            </Container>
        </>
    );
}

export default AppLayout;