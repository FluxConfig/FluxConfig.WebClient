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
import api, {ApiError, FluxConfigManagementError, newAbortSignal, ProcessError} from "./api.ts";
import {AxiosError} from "axios";
import {validateEmail, validatePassword, validateUsername, validateUserSystemRoleStringEnum} from "./validators.ts";
import {deleteCookie} from "./AuthService.ts";
import {sessionKey} from "../Interfaces/Contracts/userAuthContracts.ts";


export const SystemUsersService = {

    async changeEmail(request: ChangeEmailRequest): Promise<string> {
        try {

            validateEmail(request.new_email);
            const trimmedEmail = request.new_email.trim();

            await api.patch(
                "user/change/email",
                {
                    new_email: trimmedEmail
                },
                {
                    signal: newAbortSignal(5000)
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
                        throw new FluxConfigManagementError("Invalid email format.");
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
                },
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
                },
                {
                    signal: newAbortSignal(5000)
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
                "/user/delete",
                {
                    signal: newAbortSignal(5000)
                }
            )
            deleteCookie(sessionKey);

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
                    data: request,
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
                request,
                {
                    signal: newAbortSignal(5000)
                }
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
                "/user/admin/get-users",
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

    async getUserMeta(request: GetUserMetaRequest): Promise<GetUserMetaResponse> {
        try {
            const response = await api.get<GetUserMetaResponse>(
                `/user/admin/get-user?Id=${request.id}`,
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
                        throw new FluxConfigManagementError("User doesnt exist.");
                    }
                }
            }

            throw ProcessError(error, customErrorHandler);
        }
    }
}