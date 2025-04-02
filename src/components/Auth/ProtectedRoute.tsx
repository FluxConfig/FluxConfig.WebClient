import {useAppSelector} from "../../app/hooks.ts";
import {Box, CircularProgress} from "@mui/material";
import {Navigate, Outlet, useLocation} from "react-router-dom";

function ProtectedRoute() {
    const { user, isAuthCheckLoading } = useAppSelector((state) => state.user);
    const location = useLocation();

    if (isAuthCheckLoading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
            >
                <CircularProgress color="secondary"/>
            </Box>
        );
    }

    if (!user) {
        return <Navigate to="/sign-in" state={{ from: location }} replace />;
    }

    return (
        <Outlet/>
    )
}

export default ProtectedRoute;