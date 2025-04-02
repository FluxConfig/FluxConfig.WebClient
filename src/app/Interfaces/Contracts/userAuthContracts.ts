import {User } from "../State/userStateTypes.ts";

export interface LoginCredentials {
    email: string,
    password: string
}

export interface RegisterCredentials {
    username: string,
    email: string,
    password: string
    confirmPassword: string
}

export interface RegisterCredentialsViolations {
    username: string | null,
    email: string | null,
    password: string | null,
}

export type LoginResponse = User;

export interface LoginResponseRaw {
    id: number,
    email: string
    username: string,
    role: string
}

export type CheckAuthResponse = User;

export interface CheckAuthResponseRaw {
    id: number,
    email: string
    username: string,
    role: string
}


export const sessionKey = "fcm-session-id";
export const apiKeyHeader = "x-api-key"