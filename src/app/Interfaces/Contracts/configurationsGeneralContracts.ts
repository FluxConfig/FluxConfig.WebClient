import {ServiceConfiguration, ServiceConfigurationMeta} from "../State/configurationsGeneralTypes.ts";

export type GetConfigurationMetaResponse = ServiceConfigurationMeta;

export type GetConfigurationResponse = ServiceConfiguration;

export interface GetConfigurationResponseRaw {
    id: number,
    name: string,
    description: string,
    user_role: string
}

export interface GetConfigurationRequest {
    id: number
}

export interface CreateConfigurationRequest {
    name: string,
    description: string
}

export interface DeleteConfigurationRequest {
    id: number
}

export interface ChangeConfigurationNameRequest {
    id: number,
    new_name: string
}

export interface ChangeConfigurationDescriptionRequest {
    id: number,
    new_description: string
}