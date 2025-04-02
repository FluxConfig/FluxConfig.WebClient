export interface AuthState {
    user: User | null,
    isLoading: boolean,
    isAuthCheckLoading: boolean
    error: string | null,
    success: string | null
}

export interface User {
    id: number,
    email: string,
    username: string,
    role: UserGlobalRole
}

export enum UserGlobalRole {
    Member,
    Trusted,
    Admin
}