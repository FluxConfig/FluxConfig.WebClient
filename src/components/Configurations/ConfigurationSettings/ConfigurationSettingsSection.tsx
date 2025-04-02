import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import { clearError, clearSuccess } from "../../../app/storeSlices/configurationsGeneralSlice.ts";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Divider,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChangeConfigurationNameForm from "./ChangeConfigurationNameForm.tsx";
import ChangeConfigurationDescriptionForm from "./ChangeConfigurationDescriptionForm.tsx";
import DeleteConfigurationSection from "./DeleteConfigurationSection.tsx";

function ConfigurationSettingsSection({configurationId}: {configurationId: number}) {
    const [expanded, setExpanded] = useState<string | false>(false);
    const {error, success} = useAppSelector((state) => state.configurations_general);
    const dispatch = useAppDispatch();

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        event.stopPropagation();
        setExpanded(isExpanded ? panel : false);
        dispatch(clearError());
        dispatch(clearSuccess());
    };

    return (
                <>
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

                <Divider sx={{ width: '100%', my: 2, borderBottomWidth: '2px'}}/>

                <Accordion
                    expanded={expanded === 'name'}
                    onChange={handleAccordionChange('name')}
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
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>Change name</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ChangeConfigurationNameForm
                            configurationId={configurationId}
                        />
                    </AccordionDetails>
                </Accordion>

                <Accordion
                    expanded={expanded === 'description'}
                    onChange={handleAccordionChange('description')}
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
                        <Typography variant="h6" sx={{ fontWeight: 400 }}>Change description</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ChangeConfigurationDescriptionForm
                            configurationId={configurationId}
                        />
                    </AccordionDetails>
                </Accordion>


                <Divider sx={{ width: '100%', my: 2, borderBottomWidth: '2px' }}/>

                    <DeleteConfigurationSection
                        configurationId={configurationId}
                    />
                </>
    );
}

export default ConfigurationSettingsSection;