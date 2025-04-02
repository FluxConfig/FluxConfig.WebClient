import {UserConfigurationRole} from "../../../app/Interfaces/State/configurationsGeneralTypes.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useEffect} from "react";
import {Alert, Divider} from "@mui/material";
import {clearDeleteKeySuccess} from "../../../app/storeSlices/configurationKeysSlice.ts";
import AddConfigurationKeySection from "./Macro/AddConfigurationKeySection.tsx";
import ConfigurationKeysList from "./Macro/ConfigurationKeysList.tsx";

interface ConfigurationKeysSectionProps {
    configurationId: number,
    configurationRole: UserConfigurationRole
}

function ConfigurationKeysSection({configurationId, configurationRole}: ConfigurationKeysSectionProps) {
    const {error, deleteKeySuccess} = useAppSelector((state) => state.configuration_keys);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (deleteKeySuccess) {
            const timer = setTimeout(() => {
                dispatch(clearDeleteKeySuccess());
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [deleteKeySuccess, dispatch]);

    return (
        <>
            { (!error) && (
                <>
                    {
                        (configurationRole == UserConfigurationRole.Admin) &&
                        <AddConfigurationKeySection
                            configurationId={configurationId}
                        />
                    }

                    { deleteKeySuccess && (
                        <Alert severity="success" sx={{ my: 2 }}>
                            {deleteKeySuccess}
                        </Alert>
                    )}


                    <Divider sx={{ width: '100%', my: 2, borderBottomWidth: '2px'}}/>

                </>
            )
            }

            <ConfigurationKeysList
                keysPerPage={5}
                configurationId={configurationId}
                configurationRole={configurationRole}
            />
        </>
    );
}

export default ConfigurationKeysSection;