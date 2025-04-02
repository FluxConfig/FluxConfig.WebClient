import {Card, CardContent, Typography, Box, CardActionArea} from '@mui/material';
import Grid from '@mui/material/Grid';
import {ServiceConfigurationMeta} from "../../../app/Interfaces/State/configurationsGeneralTypes.ts";
import {Link} from "react-router-dom";

interface ConfigurationItemProps {
    config: ServiceConfigurationMeta;
}

function ConfigurationMetaItem({ config }: ConfigurationItemProps) {
    return (
        <Grid
            key={config.id}
            size={{
                xs:12
            }}
        >
            <CardActionArea
                component={Link}
                to={`/configurations/${config.id}`}
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
                    px: 2
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: "1rem",
                                fontWeight: 500,
                                mr: 2
                            }}
                        >
                            {config.name}
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
                            {config.user_role}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            </CardActionArea>
        </Grid>
    );
}

export default ConfigurationMetaItem;