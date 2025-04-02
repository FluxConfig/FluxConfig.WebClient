import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {Accordion, AccordionDetails, AccordionSummary, Alert, Divider, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {clearTagSettingsError, clearTagSettingsSuccess} from "../../../../app/storeSlices/configurationTagsSlice.ts";
import ChangeConfigurationTagDescriptionForm from "./ChangeConfigurationTagDescriptionForm.tsx";
import DeleteConfigurationTagSection from "./DeleteConfigurationTagSection.tsx";
import ChangeConfigurationTagRequiredRoleForm from "./ChangeConfigurationTagRequiredRoleForm.tsx";

interface ConfigurationTagSettingsSectionProps {
    configurationId: number,
    tagId: number,
}

function ConfigurationTagSettingsSection({configurationId, tagId}: ConfigurationTagSettingsSectionProps) {
    const [expanded, setExpanded] = useState<string | false>(false);
    const {tagSettingsError, tagSettingsSuccess} = useAppSelector((state) => state.configuration_tags);
    const dispatch = useAppDispatch();

    const handleAccordionChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        event.stopPropagation();
        setExpanded(isExpanded ? panel : false);
        dispatch(clearTagSettingsError());
        dispatch(clearTagSettingsSuccess());
    };

    return (
        <>
            { tagSettingsError && (
                <Alert severity="warning" sx={{ my: 2 }}>
                    {tagSettingsError}
                </Alert>
            )}

            { tagSettingsSuccess && (
                <Alert severity="success" sx={{ my: 2 }}>
                    {tagSettingsSuccess}
                </Alert>
            )}

            <Divider sx={{ width: '100%', my: 2, borderBottomWidth: '2px'}}/>

            <Accordion
                expanded={expanded === 'description'}
                onChange={handleAccordionChange('description')}
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
                        display: 'none'
                    },
                    boxShadow: 2
                }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontWeight: 400 }}>Change description</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ChangeConfigurationTagDescriptionForm
                        configurationId={configurationId}
                        tagId={tagId}
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion
                expanded={expanded === 'role'}
                onChange={handleAccordionChange('role')}
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
                    mt: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    '&:before': {
                        display: 'none'
                    },
                    boxShadow: 2
                }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" sx={{ fontWeight: 400 }}>Change required role</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ChangeConfigurationTagRequiredRoleForm
                        configurationId={configurationId}
                        tagId={tagId}
                    />
                </AccordionDetails>
            </Accordion>


            <Divider sx={{ width: '100%', my: 2, borderBottomWidth: '2px' }}/>

            <DeleteConfigurationTagSection
                configurationId={configurationId}
                tagId={tagId}
            />
        </>
    );
}

export default ConfigurationTagSettingsSection;