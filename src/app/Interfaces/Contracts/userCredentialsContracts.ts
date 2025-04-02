import {SystemUser, SystemUserWithConfigs} from "../State/systemUsersAdminStateTypes.ts";

export interface ChangeEmailRequest {
    new_email: string
}

export interface ChangePasswordRequest {
    new_password: string
    confirmNewPassword: string
}

export interface ChangeUsernameRequest {
    new_username: string
}

export interface ChangeUserRoleRequest {
    user_id: number,
    role: string
}

export interface DeleteByAdminRequest {
    user_id: number
}

export type GetSystemUserResponse = SystemUser;

export interface GetUserMetaRequest {
    id: number
}

export type GetUserMetaResponse = SystemUserWithConfigs;
