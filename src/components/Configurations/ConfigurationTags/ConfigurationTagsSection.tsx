import {useAppSelector} from "../../../app/hooks.ts";
import {UserConfigurationRole} from "../../../app/Interfaces/State/configurationsGeneralTypes.ts";
import { Divider } from "@mui/material";
import ConfigurationTagsMetaList from "./Macro/ConfigurationTagsMetaList.tsx";
import CreateTagSection from "./Macro/CreateTagSection.tsx";

interface ConfigurationTagsSectionProps {
    configurationId: number,
    configurationRole: UserConfigurationRole
}

function ConfigurationTagsSection({configurationId, configurationRole}: ConfigurationTagsSectionProps) {
    const { error } = useAppSelector((state) => state.configuration_tags);

    return (
        <>
            { (!error) && (
                <>
                    {
                        (configurationRole == UserConfigurationRole.Admin)
                            &&
                        <CreateTagSection
                            configurationId={configurationId}
                        />
                    }

                    <Divider sx={{ width: '100%', my: 2, borderBottomWidth: '2px'}}/>
                </>
            )
            }

            <ConfigurationTagsMetaList
                tagsPerPage={10}
                configurationId={configurationId}
            />
        </>
    );
}

export default ConfigurationTagsSection;