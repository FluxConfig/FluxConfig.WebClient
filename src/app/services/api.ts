import axios, {AxiosError} from "axios";
import {apiKeyHeader} from "../Interfaces/Contracts/userAuthContracts.ts";
import {UserGlobalRole} from "../Interfaces/State/userStateTypes.ts";

const fcmApiUrl: string = import.meta.env.VITE_FCM_BASE_URL;
const fcInternalKey = import.meta.env.VITE_FC_API_KEY;

const api = axios.create({
    baseURL: `${fcmApiUrl}/api/fcm`,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
})

api.interceptors.request.use(
    (config) => {
        if (fcInternalKey) {
            config.headers[apiKeyHeader] = fcInternalKey;
        }
        return config;
    },
    (error) => {
    console.error('Request error:', error);

    return Promise.reject(error);
});

export interface ApiError {
    status_code: number,
    message: string,
    exceptions: string[]
}

export class FluxConfigManagementError extends Error {
    constructor(public message: string) {
        super(message);
        this.name = "FluxConfigManagementError";
    }
}

export function newAbortSignal(timeoutMs: number) {
    const abortController = new AbortController();
    setTimeout(() => abortController.abort(), timeoutMs || 0);

    return abortController.signal;
}

export function ProcessError(error: unknown, endpointCustomHandler?: (errorResponse: AxiosError<ApiError>) => void ) {
    if (axios.isAxiosError(error)) {
        const axError = error as AxiosError<ApiError>;

        if (endpointCustomHandler) {
            endpointCustomHandler(axError);
        }

        if (axError.response) {
            if (axError.response.status === 500) {
                throw new FluxConfigManagementError("Internal server error. Inspect FluxConfig Management api logs.");
            } else if (axError.response.status === 401) {
                throw new FluxConfigManagementError(axError.response.data.message);
            }
        }
        if (axError.request) {
            throw new FluxConfigManagementError("Couldn't establish connection to the server. Check your internet connection.")
        } else {
            throw new FluxConfigManagementError("Unable to make a request:" + axError.message)
        }
    }

    throw new FluxConfigManagementError(error instanceof Error ? error.message : "Unexpected error occurred.");
}

export function mapRoleStringEnumToType(enumStringValue: string ): UserGlobalRole {
    switch (enumStringValue) {
        case "Member": return UserGlobalRole.Member;
        case "Trusted": return UserGlobalRole.Trusted;
        case "Admin": return UserGlobalRole.Admin;
        default: throw new FluxConfigManagementError(`Invalid role type returned from FluxConfig.Management api: ${enumStringValue}`);
    }
}

export default api;