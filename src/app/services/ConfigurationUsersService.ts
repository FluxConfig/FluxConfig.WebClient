import {
    AddUserToConfigurationRequest, ChangeConfigurationUserRoleRequest, DeleteConfigurationUserRequest,
    GetConfigurationUserResponse,
    GetConfigurationUsersRequest
} from "../Interfaces/Contracts/configurationUsersContracts.ts";
import api, {ApiError, FluxConfigManagementError, newAbortSignal, ProcessError} from "./api.ts";
import {AxiosError} from "axios";
import {validateUserConfigurationRoleStringEnum} from "./validators.ts";

export const ConfigurationUsersService = {

    async getConfigurationUsers(request: GetConfigurationUsersRequest): Promise<GetConfigurationUserResponse[]> {
        try {

            const response = await api.get<GetConfigurationUserResponse[]>(
                "/configurations/user/get-all",
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

    async  addUserToConfiguration(request: AddUserToConfigurationRequest) {
        try {
            const trimmedEmail = request.user_email;

            const response = await api.post(
                "/configurations/user/add-to-config",
                {
                    user_email: trimmedEmail
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
                        throw new FluxConfigManagementError(`User with email ${errorResponse.response.data.exceptions[0]} doesn't exist.`);
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    },

    async deleteUserFromConfiguration(request: DeleteConfigurationUserRequest) {
        try {
            const response = await api.delete(
                "/configurations/user/delete",
                {
                    data: {
                        user_id: request.user_id
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

            throw ProcessError(error);
        }
    },

    async changeConfigurationUserRole(request: ChangeConfigurationUserRoleRequest) {
        try {
            validateUserConfigurationRoleStringEnum(request.new_role);

            const response = await api.patch(
                "/configurations/user/change-role",
                {
                    user_id: request.user_id,
                    new_role: request.new_role
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
                        throw new FluxConfigManagementError("User doesn't belong to configuration.");
                    } else if (errorResponse.response.status === 400) {
                        throw new FluxConfigManagementError("Admin can't change his own role.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }

    }
}