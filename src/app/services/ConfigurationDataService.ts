import {
    ConfigurationDataUnitWithoutId,
    LoadConfigurationDataRequest,
    LoadConfigurationDataResponse, UpdateConfigurationDataRequest
} from "../Interfaces/Contracts/configurationDataContracts.ts";
import api, {ApiError, FluxConfigManagementError, newAbortSignal, ProcessError} from "./api.ts";
import {AxiosError} from "axios";
import {mapConfigDataTypEnumToString} from "../Mappers/enumMappers.ts";

export const ConfigurationDataService = {

    async loadConfigurationData(request: LoadConfigurationDataRequest): Promise<LoadConfigurationDataResponse[]> {
        try {
            const response = await api.get<LoadConfigurationDataResponse[]>(
                `/configurations/data/load?TagId=${request.tag_id}&DataType=${mapConfigDataTypEnumToString(request.data_type)}`,
                {
                    signal: newAbortSignal(5000),
                    headers: {
                        'x-conf-id': request.configuration_id
                    }
                }
            )

            return response.data;
        }
        catch (error) {
            if (error instanceof FluxConfigManagementError) {
                throw error;
            }

            const customErrorHandler = (errorResponse: AxiosError<ApiError>) => {
                if (errorResponse.response) {
                    if (errorResponse.response.status === 404) {
                        throw new FluxConfigManagementError("Configuration tag doesn't exist.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    },

    async updateConfigurationData(request: UpdateConfigurationDataRequest) {
        const hasEmptyKeys = request.data.some(item => !item.key?.trim());
        if (hasEmptyKeys) {
            throw new FluxConfigManagementError("Configuration value key should not be empty.");
        }

        try {


            const newArray: ConfigurationDataUnitWithoutId[] = request.data.map(({ id, ...rest }) => rest);

            const response = await api.post(
                "/configurations/data/update",
                {
                    tag_id: request.tag_id,
                    data_type: mapConfigDataTypEnumToString(request.data_type),
                    data: newArray
                },
                {
                    signal: newAbortSignal(5000),
                    headers: {
                        'x-conf-id': request.configuration_id
                    }
                }
            )

            return response.data;
        }
        catch (error) {
            if (error instanceof FluxConfigManagementError) {
                throw error;
            }

            const customErrorHandler = (errorResponse: AxiosError<ApiError>) => {
                if (errorResponse.response) {
                    if (errorResponse.response.status === 404) {
                        throw new FluxConfigManagementError("Configuration tag doesn't exist.");
                    } else if (errorResponse.response.status === 400) {
                        throw new FluxConfigManagementError(errorResponse.response.data.message);
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    }
}