
export interface ConfigurationDataState {
    selectedConfigurationData: ConfigurationDataUnit[],
    isLoading: boolean,
    error: string | null,
    isUpdateDataLoading: boolean,
    updateDataError: string | null,
    updateDataSuccess: string | null
}

export enum ConfigurationDataType {
    RealTime,
    Vault
}

export interface ConfigurationDataUnit {
    id: number,
    key: string,
    value: string,
    type: string
}