import {Alert, Divider} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {UserConfigurationRole} from "../../../app/Interfaces/State/configurationsGeneralTypes.ts";
import ConfigurationUsersList from "./Macro/ConfigurationUsersList.tsx";
import AddUserToConfigurationSection from "./Macro/AddUserToConfigurationSection.tsx";
import {useEffect} from "react";
import {clearEditUserError, clearEditUserSuccess} from "../../../app/storeSlices/configurationUsersSlice.ts";

interface ConfigurationUsersSectionProps {
    configurationId: number,
    configurationRole: UserConfigurationRole
}

function ConfigurationUsersSection({configurationId, configurationRole}: ConfigurationUsersSectionProps) {
    const {error, editUserSuccess, editUserError} = useAppSelector((state) => state.configuration_users);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (editUserSuccess || editUserError) {
            const timer = setTimeout(() => {
                dispatch(clearEditUserSuccess());
                dispatch(clearEditUserError());
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [editUserSuccess, editUserError, dispatch]);

    return (
        <>
            { (!error) && (
                <>
                    {
                        (configurationRole == UserConfigurationRole.Admin) &&
                        <AddUserToConfigurationSection
                            configurationId={configurationId}
                        />
                    }

                    { editUserSuccess && (
                        <Alert severity="success" sx={{ my: 2 }}>
                            {editUserSuccess}
                        </Alert>
                    )}

                    { editUserError && (
                        <Alert severity="warning" sx={{ my: 2 }}>
                            {editUserError}
                        </Alert>
                    )}

                    <Divider sx={{ width: '100%', my: 2, borderBottomWidth: '2px'}}/>

                </>
            )
            }

            <ConfigurationUsersList
                usersPerPage={10}
                configurationId={configurationId}
                configurationRole={configurationRole}
            />
        </>
    );
}

export default ConfigurationUsersSection;