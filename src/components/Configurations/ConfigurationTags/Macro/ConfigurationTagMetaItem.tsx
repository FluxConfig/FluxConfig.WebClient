import {ConfigurationTagMeta} from "../../../../app/Interfaces/State/configurationTagsTypes.ts";
import Grid from "@mui/material/Grid";
import {Box, Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function ConfigurationTagMetaItem({tag}: {tag: ConfigurationTagMeta}) {
    return (
        <Grid
            key={tag.id}
            size={{
                xs:12
            }}
        >
            <CardActionArea
                component={Link}
                to={`/configurations/tags/${tag.id}`}
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
                                {tag.tag}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontSize: "1rem",
                                    fontWeight: 500,
                                    color: 'text.secondary'
                                }}
                            >
                                Required : {tag.required_role}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </CardActionArea>
        </Grid>
    );
}

export default ConfigurationTagMetaItem;