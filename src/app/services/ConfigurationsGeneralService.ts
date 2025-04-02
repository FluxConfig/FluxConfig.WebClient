import {
    ChangeConfigurationDescriptionRequest,
    ChangeConfigurationNameRequest, CreateConfigurationRequest,
    DeleteConfigurationRequest,
    GetConfigurationMetaResponse, GetConfigurationRequest,
    GetConfigurationResponse, GetConfigurationResponseRaw
} from "../Interfaces/Contracts/configurationsGeneralContracts.ts";
import api, {ApiError, FluxConfigManagementError, newAbortSignal, ProcessError} from "./api.ts";
import {mapConfigRoleStringEnumToType} from "../Mappers/enumMappers.ts";
import {AxiosError} from "axios";
import {validateConfigurationDescription, validateConfigurationName} from "./validators.ts";

export const ConfigurationsGeneralService =  {

    async getUserConfigurations(): Promise<GetConfigurationMetaResponse[]>{
        try {
            const response = await api.get<GetConfigurationMetaResponse[]>(
                "/configurations/get-all",
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
    },

    async getConfiguration(request: GetConfigurationRequest): Promise<GetConfigurationResponse> {
        try {
            const response = await api.get<GetConfigurationResponseRaw>(
                "/configurations/get",
                {
                    signal: newAbortSignal(5000),
                    headers: {
                        'x-conf-id': request.id
                    }
                }
            )

            const rawResponse = response.data;
            return {
              id: rawResponse.id,
              name: rawResponse.name,
              description: rawResponse.description,
              user_role: mapConfigRoleStringEnumToType(rawResponse.user_role)
            };
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

    async deleteConfiguration(request: DeleteConfigurationRequest) {
        try {
            const response = await api.delete(
                "/configurations/delete",
                {
                    signal: newAbortSignal(5000),
                    headers: {
                        'x-conf-id': request.id
                    }
                }
            )

            return response.data;
        }
        catch(error)
        {
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

    async changeConfigurationName(request: ChangeConfigurationNameRequest): Promise<string> {
        try {
            validateConfigurationName(request.new_name);

            const trimmedName = request.new_name.trim();

            await api.patch(
                "/configurations/change/name",
                {
                    new_name: trimmedName
                },
                {
                    signal: newAbortSignal(5000),
                    headers: {
                        'x-conf-id': request.id
                    }
                }
            )

            return trimmedName;
        }
        catch(error)
        {
            if (error instanceof FluxConfigManagementError) {
                throw error;
            }

            const customErrorHandler = (errorResponse: AxiosError<ApiError>) => {
                if (errorResponse.response) {
                    if (errorResponse.response.status === 400) {
                        throw new FluxConfigManagementError("Invalid configuration name");
                    } else if (errorResponse.response.status === 404) {
                        throw new FluxConfigManagementError("Configuration doesn't exist.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    },

    async changeConfigurationDescription(request: ChangeConfigurationDescriptionRequest): Promise<string> {
        try {
            validateConfigurationDescription(request.new_description);

            const trimmedDescription = request.new_description.trim();

             await api.patch(
                "/configurations/change/description",
                {
                    new_description: trimmedDescription
                },
                {
                    signal: newAbortSignal(5000),
                    headers: {
                        'x-conf-id': request.id
                    }
                }
            )

            return trimmedDescription;
        }
        catch(error)
        {
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

    async createConfiguration(request: CreateConfigurationRequest) {
        try {

            validateConfigurationName(request.name);
            validateConfigurationDescription(request.description);

            const trimmedRequest = {
                name: request.name.trim(),
                description: request.description.trim()
            }

            const response = await api.post(
                "/configurations/create",
                trimmedRequest,
                {
                    signal: newAbortSignal(5000),
                }
            )

            return response.data;
        }
        catch(error)
        {
            if (error instanceof FluxConfigManagementError) {
                throw error;
            }

            const customErrorHandler = (errorResponse: AxiosError<ApiError>) => {
                if (errorResponse.response) {
                    if (errorResponse.response.status === 400) {
                        throw new FluxConfigManagementError("Invalid configuration credentials.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    }
}