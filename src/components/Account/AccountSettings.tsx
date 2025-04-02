import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Alert,
    Divider,
    Box,
    Container,
    Paper,
    Typography
} from '@mui/material';
import {mapRoleTypEnumToString} from "../../app/services/api.ts";
import {UserGlobalRole} from "../../app/Interfaces/State/userStateTypes.ts";
import UpdateEmailForm from "./UpdateEmailForm.tsx";
import UpdateUsernameForm from "./UpdateUsernameForm.tsx";
import UpdatePasswordForm from "./UpdatePasswordForm.tsx";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, {useState} from "react";
import {clearError, clearSuccess} from "../../app/storeSlices/userCredentialsSlice.ts";
import DeleteAccountSection from "./DeleteAccountSection.tsx";

const AccountSettings = () => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const dispatch = useAppDispatch();
    const { user, error, success } = useAppSelector((state) => state.user);

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        event.stopPropagation();
        setExpanded(isExpanded ? panel : false);
        dispatch(clearError());
        dispatch(clearSuccess());
    };

    return (
        <Container maxWidth="md" sx={{ my: 2, minHeight: '95vh' }}>
            <Paper elevation={3} sx={{
                p: 4,
                borderRadius: 4
            }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    Account Settings
                </Typography>

                <Divider sx={{ width: '100%', my: 2, borderBottomWidth: '2px'}}/>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>
                        <b>Username:</b> {user?.username}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>
                        <b>Email:</b> {user?.email}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: '1.1rem' }}>
                        <b>Role:</b> {mapRoleTypEnumToString(user?.role || UserGlobalRole.Member)}
                    </Typography>
                </Box>


                <Divider sx={{ width: '100%', my: 2, borderBottomWidth: '2px' }}/>

                { error && (
                    <Alert severity="warning" sx={{ my: 2 }}>
                        {error}
                    </Alert>
                )}

                { success && (
                    <Alert severity="success" sx={{ my: 2 }}>
                        {success}
                    </Alert>
                )}

                <Accordion
                    expanded={expanded === 'email'}
                    onChange={handleAccordionChange('email')}
                    sx={{
                        backgroundColor: 'background.paper',
                        color: 'text.primary',
                        borderRadius: 2,

                        '&:not(.Mui-expanded):hover': {
                            backgroundColor: 'action.hover',
                        },

                        '&.Mui-expanded': {
                            backgroundColor: 'background.paper',
                        },

                        border: '1px solid',
                        borderColor: 'divider',
                        '&:before': {
                            display: 'none',
                        },
                        boxShadow: 2
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>Change email</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateEmailForm/>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    expanded={expanded === 'username'}
                    onChange={handleAccordionChange('username')}
                    sx={{
                        backgroundColor: 'background.paper',
                        color: 'text.primary',
                        borderRadius: 2,
                        mt: 2,
                        '&:not(.Mui-expanded):hover': {
                            backgroundColor: 'action.hover',
                        },

                        '&.Mui-expanded': {
                            backgroundColor: 'background.paper',
                        },

                        border: '1px solid',
                        borderColor: 'divider',
                        '&:before': {
                            display: 'none'
                        },
                        boxShadow: 2
                    }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>Change username</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdateUsernameForm/>
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    expanded={expanded === 'password'}
                    onChange={handleAccordionChange('password')}
                    sx={{
                        backgroundColor: 'background.paper',
                        color: 'text.primary',
                        borderRadius: 2,
                        mt: 2,
                        '&:not(.Mui-expanded):hover': {
                            backgroundColor: 'action.hover',
                        },
                        '&.Mui-expanded': {
                            backgroundColor: 'background.paper',
                        },
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:before': {
                            display: 'none'
                        },
                        boxShadow: 2
                    }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>Change password</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <UpdatePasswordForm/>
                    </AccordionDetails>
                </Accordion>

                <Divider sx={{ width: '100%', my: 2, borderBottomWidth: '2px' }}/>

                <DeleteAccountSection/>

            </Paper>
        </Container>
    );
};

export default AccountSettings;