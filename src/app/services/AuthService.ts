import api, {
    ApiError,
    FluxConfigManagementError,
    mapRoleStringEnumToType,
    ProcessError
} from "./api.ts";
import {AxiosError} from "axios";
import {
    CheckAuthResponse, CheckAuthResponseRaw,
    LoginCredentials,
    LoginResponse,
    LoginResponseRaw,
    RegisterCredentials, sessionKey
} from "../Interfaces/Contracts/userAuthContracts.ts";
import {validateEmail, validatePassword, validateUsername} from "./validators.ts";


function validateLoginRequest(request: LoginCredentials) {
    if (!request.email.trim()) {
        throw new FluxConfigManagementError("Email is required");
    } else if (!request.password.trim()) {
        throw new FluxConfigManagementError("Password is required")
    }
}

function validateRegisterRequest(request: RegisterCredentials) {
    validateUsername(request.username);

    validateEmail(request.email);

    validatePassword(request.password, request.confirmPassword);
}

function deleteCookie(name: string) {
    const date = new Date();
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    document.cookie = name+"=; expires="+date.toUTCString()+"; path=/";
}

export const AuthService = {

    async login(request: LoginCredentials): Promise<LoginResponse> {
        try
        {
            validateLoginRequest(request);

            const response = await api.post<LoginResponseRaw>(
                "/auth/login",
                request
            )

            const rawResponse: LoginResponseRaw =  response.data;

            return {
                username: rawResponse.username,
                email: rawResponse.email,
                id: rawResponse.id,
                role: mapRoleStringEnumToType(rawResponse.role)
            };
        }
        catch (error) {
            if (error instanceof FluxConfigManagementError) {
                throw error;
            }

            const loginErrorHandler = (errorResponse: AxiosError<ApiError>) => {
                if (errorResponse.response) {
                    if (errorResponse.response.status === 404) {
                        throw new FluxConfigManagementError("User doesnt exist.");
                    } else if (errorResponse.response.status === 400) {
                        throw new FluxConfigManagementError("Incorrect password provided.");
                    } else if (errorResponse.response.status === 500) {
                        throw new FluxConfigManagementError("Internal server error. Inspect FluxConfig Management api logs.");
                    }
                }
            }

            throw ProcessError(error, loginErrorHandler);
        }
    },

    async register(request: RegisterCredentials) {
        try
        {
            validateRegisterRequest(request);

            const response = await api.post(
                "/auth/register",
                {
                    username: request.username.trim(),
                    email: request.email.trim(),
                    password: request.password.trim()
                }
            )

            return response.data;
        }
        catch (error)
        {
            if (error instanceof FluxConfigManagementError) {
                throw error;
            }

            const registerErrorHandler = (errorResponse: AxiosError<ApiError>) => {
                if (errorResponse.response) {
                    if (errorResponse.response.status === 409) {
                        throw new FluxConfigManagementError(`User with email ${request.email.trim()} already exist.`);
                    } else if (errorResponse.response.status === 400) {
                        throw new FluxConfigManagementError("Invalid credentials format provided.");
                    } else if (errorResponse.response.status == 404) {
                        throw new FluxConfigManagementError("Unable to grant new role. Inspect FluxConfig Management api logs.")
                    }
                }
            }

            throw ProcessError(error, registerErrorHandler);
        }
    },

    async checkAuth(): Promise<CheckAuthResponse> {
        try {
            const response = await api.get<CheckAuthResponseRaw>(
                "/auth/check-auth", {
                    withCredentials: true
                }
            )

            const rawResponse =  response.data;

            return {
                email: rawResponse.email,
                id: rawResponse.id,
                username: rawResponse.username,
                role: mapRoleStringEnumToType(rawResponse.role)
            }
        } catch (error)
        {
            const checkAuthErrorHandler = (errorResponse: AxiosError<ApiError>) => {
                if (errorResponse.response) {
                    if (errorResponse.response.status === 404) {
                        throw new FluxConfigManagementError("User doesnt exist.");
                    }
                }
            }

            throw ProcessError(error, checkAuthErrorHandler);
        }
    },

    async logout() {
        try {
            const response = await api.delete(
                "/auth/logout"
            );

            return response.data;
        } catch (error) {
            deleteCookie(sessionKey);

            throw ProcessError(error);
        }
    }
};
