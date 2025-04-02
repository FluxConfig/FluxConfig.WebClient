import {ConfigurationKey} from "../State/configurationKeysTypes.ts";

export interface GetConfigurationKeysRequest {
    configuration_id: number
}

export type GetConfigurationKeyResponse = ConfigurationKey;

export interface DeleteConfigurationKeyRequest {
    configuration_id: number,
    key_id: string
}

export interface CreateConfigurationKeyRequest {
    configuration_id: number,
    role_permission: string,
    expiration_date: string
}