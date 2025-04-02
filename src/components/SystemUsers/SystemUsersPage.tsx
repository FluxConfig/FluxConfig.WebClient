import {useAppSelector} from "../../app/hooks.ts";
import {Container, Divider, Paper, Typography} from "@mui/material";
import SystemUsersList from "./Macro/SystemUsersList.tsx";

function SystemUsersPage() {
    const { error, isLoading } = useAppSelector((state) => state.system_users);

    return (
        <Container maxWidth="lg" sx={{ my: 2, minHeight: '95vh' }}>
            <Paper elevation={3}
                   sx={{
                       p: 4,
                       borderRadius: 2 }}>

                { (!error && !isLoading) && (
                    <>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                            System users
                        </Typography>
                        <Divider sx={{ width: '100%', my: 2, borderBottomWidth: '2px'}}/>
                    </>
                    )
                }

                <SystemUsersList
                    usersPerPage={10}
                />
            </Paper>
        </Container>
    );
}

export default SystemUsersPage;