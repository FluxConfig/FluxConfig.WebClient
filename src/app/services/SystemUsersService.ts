import {
    ChangeEmailRequest,
    ChangePasswordRequest,
    ChangeUsernameRequest,
    ChangeUserRoleRequest,
    DeleteByAdminRequest,
    GetSystemUserResponse,
    GetUserMetaRequest,
    GetUserMetaResponse
} from "../Interfaces/Contracts/userCredentialsContracts.ts";
import api, {ApiError, FluxConfigManagementError, ProcessError} from "./api.ts";
import {AxiosError} from "axios";
import {validateEmail, validatePassword, validateUsername, validateUserSystemRoleStringEnum} from "./validators.ts";


export const SystemUsersService = {

    async changeEmail(request: ChangeEmailRequest): Promise<string> {
        try {

            validateEmail(request.new_email);
            const trimmedEmail = request.new_email.trim();

            await api.patch(
                "user/change/email",
                {
                    new_email: trimmedEmail
                }
            )

            return trimmedEmail;
        }
        catch (error) {
            if (error instanceof FluxConfigManagementError) {
                throw error;
            }

            const customErrorHandler = (errorResponse: AxiosError<ApiError>) => {
                if (errorResponse.response) {
                    if (errorResponse.response.status === 404) {
                        throw new FluxConfigManagementError("User doesnt exist.");
                    } else if (errorResponse.response.status === 400) {
                        throw new FluxConfigManagementError("Invalid new email format.");
                    } else if (errorResponse.response.status === 409) {
                        throw new FluxConfigManagementError("Email is already taken.")
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    },

    async changePassword(request: ChangePasswordRequest) {
        try {
            validatePassword(request.new_password, request.confirmNewPassword);

            const response = await api.patch(
                "/user/change/password",
                {
                    new_password: request.new_password.trim()
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
                        throw new FluxConfigManagementError("User doesnt exist.");
                    } else if (errorResponse.response.status === 400) {
                        throw new FluxConfigManagementError("New password must be different from current password.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    },

    async changeUsername(request: ChangeUsernameRequest): Promise<string> {
        try {
            validateUsername(request.new_username);

            const trimmedUsername = request.new_username.trim();

            await api.patch(
                "/user/change/username",
                {
                    new_username: trimmedUsername
                }
            )

            return trimmedUsername;
        }
        catch (error) {
            if (error instanceof FluxConfigManagementError) {
                throw error;
            }

            const customErrorHandler = (errorResponse: AxiosError<ApiError>) => {
                if (errorResponse.response) {
                    if (errorResponse.response.status === 404) {
                        throw new FluxConfigManagementError("User doesnt exist.");
                    } else if (errorResponse.response.status === 400) {
                        throw new FluxConfigManagementError("Invalid new username format.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    },

    async deleteSelfAccount() {
        try {
            const response = await api.delete(
                "/user/delete"
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
                        throw new FluxConfigManagementError("User doesnt exist.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    },

    async deleteOtherAccount(request: DeleteByAdminRequest) {
        try {
            const response = await api.delete(
                "/user/admin/delete",
                {
                    data: request
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
                        throw new FluxConfigManagementError("User doesnt exist.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    },

    async changeUserRole(request: ChangeUserRoleRequest): Promise<string> {
        try {
            validateUserSystemRoleStringEnum(request.role);

            await api.patch(
                "/user/admin/change-user-role",
                request
            )

            return request.role;
        }
        catch (error) {
            if (error instanceof FluxConfigManagementError) {
                throw error;
            }

            const customErrorHandler = (errorResponse: AxiosError<ApiError>) => {
                if (errorResponse.response) {
                    if (errorResponse.response.status === 404) {
                        throw new FluxConfigManagementError("User doesnt exist.");
                    } else if (errorResponse.response.status === 400) {
                        throw new FluxConfigManagementError("Unable to change admin role.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    },

    async getAllUsers(): Promise<GetSystemUserResponse[]> {
        try {
            const response = await api.get<GetSystemUserResponse[]>(
                "/user/admin/get-users"
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

    async getUserMeta(request: GetUserMetaRequest): Promise<GetUserMetaResponse> {
        try {
            const response = await api.get<GetUserMetaResponse>(
                `/user/admin/get-user?Id=${request.id}`
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
                        throw new FluxConfigManagementError("User doesnt exist.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    }
}