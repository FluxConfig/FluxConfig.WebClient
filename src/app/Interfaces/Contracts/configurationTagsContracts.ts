import {ConfigurationTag, ConfigurationTagMeta} from "../State/configurationTagsTypes.ts";

export interface GetConfigurationTagsMetaRequest {
    configuration_id: number
}

export type GetConfigurationTagMetaResponse = ConfigurationTagMeta;

export interface GetConfigurationTagRequest {
    tag_id: number
}

export type GetConfigurationTagResponse = ConfigurationTag;

export interface DeleteConfigurationTagRequest {
    configuration_id: number,
    tag_id: number
}

export interface ChangeConfigurationTagRequiredRoleRequest {
    configuration_id: number,
    tag_id: number,
    new_role: string
}

export interface ChangeConfigurationTagDescriptionRequest {
    configuration_id: number,
    tag_id: number,
    new_description: string
}

export interface CreateConfigurationTagRequest {
    configuration_id: number,
    tag: string,
    description: string,
    required_role: string
}