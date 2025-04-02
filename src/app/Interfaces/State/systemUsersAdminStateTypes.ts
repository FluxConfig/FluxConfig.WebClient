import {ServiceConfiguration} from "./configurationsGeneralTypes.ts";

export interface AdminSystemUsersState{
    selectedUser: SystemUserWithConfigs | null,
    systemUsers: SystemUser[],
    error: string | null,
    isLoading: boolean,
    success: string | null,
    deleteUserIsLoading: boolean
}

export interface SystemUser {
    id: number,
    email: string,
    username: string,
    role: string,
}

export interface SystemUserWithConfigs extends SystemUser{
    configurations: ServiceConfiguration[]
}