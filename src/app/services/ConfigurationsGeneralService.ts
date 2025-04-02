import {GetConfigurationMetaResponse} from "../Interfaces/Contracts/configurationsGeneralContracts.ts";
import api, {FluxConfigManagementError, newAbortSignal, ProcessError} from "./api.ts";

export const ConfigurationsGeneralService =  {

    async getUserConfigurations(): Promise<GetConfigurationMetaResponse[]>{
        try {
            const response = await api.get<GetConfigurationMetaResponse[]>(
                "configurations/get-all",
                {
                    signal: newAbortSignal(5000)
                }
            )

            return response.data;
        }
        catch (error) {
            if (error instanceof FluxConfigManagementError) {
                throw error;
            }

            throw ProcessError(error);
        }
    }
}