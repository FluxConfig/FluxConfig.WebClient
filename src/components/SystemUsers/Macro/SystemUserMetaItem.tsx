import {SystemUser} from "../../../app/Interfaces/State/systemUsersAdminStateTypes.ts";
import Grid from "@mui/material/Grid";
import {Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import { Link } from "react-router-dom";


function SystemUserMetaItem({user}: {user: SystemUser}) {
    return (
        <Grid
            key={user.id}
            size={{
                xs:12
            }}
        >
            <CardActionArea
                component={Link}
                to={`/users/${user.id}`}
            >
                <Card sx={{
                    display: 'flex',
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        borderColor: "#333333",
                    }
                }}>
                    <CardContent sx={{
                        flexGrow: 1,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        py: 2,
                        px: 1
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    mr: 1
                                }}
                            >
                                {user.email}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight: 500,
                                    color: 'text.secondary'
                                }}
                            >
                                {user.role}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}

export default SystemUserMetaItem;