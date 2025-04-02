import {
    ChangeConfigurationTagDescriptionRequest,
    ChangeConfigurationTagRequiredRoleRequest, CreateConfigurationTagRequest,
    DeleteConfigurationTagRequest,
    GetConfigurationTagMetaResponse, GetConfigurationTagRequest, GetConfigurationTagResponse,
    GetConfigurationTagsMetaRequest
} from "../Interfaces/Contracts/configurationTagsContracts.ts";
import api, {ApiError, FluxConfigManagementError, newAbortSignal, ProcessError} from "./api.ts";
import {AxiosError} from "axios";
import {validateUserConfigurationRoleStringEnum} from "./validators.ts";

export const ConfigurationTagsService = {

    async getConfigurationTagsMeta(request: GetConfigurationTagsMetaRequest): Promise<GetConfigurationTagMetaResponse[]>
    {
        try {
            const response = await api.get<GetConfigurationTagMetaResponse[]>(
                "/configurations/tags/get-all",
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

    async getConfigurationTag(request: GetConfigurationTagRequest): Promise<GetConfigurationTagResponse>
    {
        try {
            const response = await api.get<GetConfigurationTagResponse>(
                `/configurations/tags/get?TagId=${request.tag_id}`,
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

    async deleteConfigurationTag(request: DeleteConfigurationTagRequest)
    {
        try {
            const response = await api.delete(
                "/configurations/tags/delete",
                {
                    data: {
                        tag_id: request.tag_id
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
                        throw new FluxConfigManagementError("Configuration tag doesn't exist.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    },

    async changeConfigurationTagRequiredRole(request: ChangeConfigurationTagRequiredRoleRequest): Promise<string>
    {
        try {
            validateUserConfigurationRoleStringEnum(request.new_role);

             await api.patch(
                "/configurations/tags/change/role",
                {
                    tag_id: request.tag_id,
                    new_role: request.new_role
                },
                {
                    signal: newAbortSignal(5000),
                    headers: {
                        'x-conf-id': request.configuration_id
                    }
                }
            )

            return request.new_role;
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

    async changeConfigurationTagDescription(request: ChangeConfigurationTagDescriptionRequest): Promise<string>
    {
        try {
            const trimmedDescription = request.new_description.trim();

            await api.patch(
                "/configurations/tags/change/description",
                {
                    tag_id: request.tag_id,
                    new_description: trimmedDescription
                },
                {
                    signal: newAbortSignal(5000),
                    headers: {
                        'x-conf-id': request.configuration_id
                    }
                }
            )

            return trimmedDescription;
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

    async createConfigurationTag(request: CreateConfigurationTagRequest)
    {
        try {
            validateUserConfigurationRoleStringEnum(request.required_role);

            const trimmedTag = request.tag.trim();
            const trimmedDescription = request.description.trim();

            const response = await api.post(
                "/configurations/tags/create",
                {
                    tag: trimmedTag,
                    description: trimmedDescription,
                    required_role: request.required_role
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
                    } else if (errorResponse.response.status === 400) {
                        throw new FluxConfigManagementError("Invalid configuration tag parameters.");
                    } else if (errorResponse.response.status === 409) {
                        throw new FluxConfigManagementError("Configuration tag already exists.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    },
}