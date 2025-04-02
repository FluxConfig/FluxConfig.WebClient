import {ConfigurationMember} from "../State/configurationUsersTypes.ts";

export type GetConfigurationUserResponse = ConfigurationMember;

export interface GetConfigurationUsersRequest {
    configuration_id: number
}

export interface DeleteConfigurationUserRequest {
    configuration_id: number,
    user_id: number
}

export interface ChangeConfigurationUserRoleRequest {
    configuration_id: number,
    user_id: number,
    new_role: string
}

export interface AddUserToConfigurationRequest {
    configuration_id: number,
    user_email: string
}