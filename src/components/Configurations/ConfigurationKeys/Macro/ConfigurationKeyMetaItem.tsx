import {UserConfigurationRole} from "../../../../app/Interfaces/State/configurationsGeneralTypes.ts";
import {ConfigurationKey} from "../../../../app/Interfaces/State/configurationKeysTypes.ts";
import {Alert, Box, Card, CardContent, IconButton, Snackbar, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {useState} from "react";
import DeleteConfigurationKeySection from "./DeleteConfigurationKeySection.tsx";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';


interface ConfigurationKeyMetaItemProps {
    configurationKey: ConfigurationKey,
    configurationId: number,
    configurationRole: UserConfigurationRole
}

function ConfigurationKeyMetaItem({configurationKey, configurationId, configurationRole}: ConfigurationKeyMetaItemProps) {
    const [showKeyId, setShowKeyId] = useState<boolean>(false);
    const [showCopiedAlert, setShowCopiedAlert] = useState<boolean>(false);
    const formattedDate = configurationKey.expiration_date.split('T')[0];

    const handleCopyKey = async () => {
        try {
            await navigator.clipboard.writeText(configurationKey.id);
            setShowCopiedAlert(true);
        } catch (err) {
            console.error('Failed to copy key:', err);
        }
    };

    return (
        <Grid
            key={configurationKey.id}
            size={{
                xs:12
            }}
        >
            <Card sx={{
                display: 'flex',
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                '&:hover': {
                    boxShadow: 1
                }
            }}>
                <CardContent sx={{
                    flexGrow: 1,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    py: 2,
                    px: 3
                }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {showKeyId && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontFamily: 'monospace',
                                        color: 'text.secondary'
                                    }}
                                >
                                    {configurationKey.id}
                                </Typography>
                                <IconButton
                                    size="small"
                                    onClick={handleCopyKey}
                                    sx={{ p: 0.5 }}
                                >
                                    <ContentCopyIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        )}
                        <Typography variant="body1">
                            <b>Permissions:</b> {configurationKey.role_permission}
                        </Typography>
                        <Typography variant="body1">
                            <b>Expires:</b> {formattedDate}
                        </Typography>
                    </Box>

                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        alignItems: 'flex-end'
                    }}>
                        <IconButton
                            // variant="outlined"
                            size="small"
                            color="secondary"
                            onClick={() => setShowKeyId(!showKeyId)}
                            // sx={{ width: '100px' }}
                        >
                            {!showKeyId ?
                                <VisibilityIcon/>
                                :
                                <VisibilityOffIcon/>
                            }
                        </IconButton>

                        {
                            (configurationRole === UserConfigurationRole.Admin) &&
                            <DeleteConfigurationKeySection
                                configurationKey={configurationKey}
                                configurationId={configurationId}
                            />
                        }

                    </Box>

                </CardContent>
            </Card>

            <Snackbar
                open={showCopiedAlert}
                autoHideDuration={5000}
                onClose={() => setShowCopiedAlert(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert
                    severity="success"
                    variant="outlined"
                    onClose={() => setShowCopiedAlert(false)}
                    sx={{ width: '100%' }}
                >
                    Key copied to clipboard!
                </Alert>
            </Snackbar>
        </Grid>
    )
}

export default ConfigurationKeyMetaItem;