import {
    CreateConfigurationKeyRequest, DeleteConfigurationKeyRequest,
    GetConfigurationKeyResponse,
    GetConfigurationKeysRequest
} from "../Interfaces/Contracts/configurationKeysContracts.ts";
import api, {ApiError, FluxConfigManagementError, newAbortSignal, ProcessError} from "./api.ts";
import {AxiosError} from "axios";
import {validateUserConfigurationRoleStringEnum} from "./validators.ts";

export const ConfigurationKeysService = {

    async getConfigurationKeys(request: GetConfigurationKeysRequest): Promise<GetConfigurationKeyResponse[]> {
        try {
            const response = await api.get<GetConfigurationKeyResponse[]>(
                "/configurations/keys/get-all",
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

            throw ProcessError(error);
        }
    },

    async createConfigurationKey(request: CreateConfigurationKeyRequest) {
        try {
            validateUserConfigurationRoleStringEnum(request.role_permission);

            const response = await api.post(
                "/configurations/keys/create",
                {
                    role_permission: request.role_permission,
                    expiration_date: request.expiration_date
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
                        throw new FluxConfigManagementError("Configuration doesn't exist.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    },

    async deleteConfigurationKey(request: DeleteConfigurationKeyRequest) {
        try {
            const response = await api.delete(
                "/configurations/keys/delete",
                {
                    data: {
                        id: request.key_id
                    },
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
                        throw new FluxConfigManagementError("Configuration key doesn't exist.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    }
}