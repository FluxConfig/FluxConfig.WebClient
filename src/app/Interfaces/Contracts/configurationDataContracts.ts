import {ConfigurationDataType, ConfigurationDataUnit} from "../State/configurationDataState.ts";

export interface LoadConfigurationDataRequest {
    configuration_id: number,
    tag_id: number,
    data_type: ConfigurationDataType
}

export type LoadConfigurationDataResponse = ConfigurationDataUnit;

export type ConfigurationDataUnitWithoutId = Omit<ConfigurationDataUnit, 'id'>;

export interface UpdateConfigurationDataRequest {
    configuration_id: number,
    tag_id: number,
    data_type: ConfigurationDataType,
    data: ConfigurationDataUnit[]
}