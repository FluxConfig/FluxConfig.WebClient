
export interface ConfigurationsGeneralState {
    userConfigurations: ServiceConfigurationMeta[],
    selectedConfiguration: ServiceConfiguration | null,
    isLoading: boolean,
    isCreateConfLoading: boolean,
    isConfigurationSettingsLoading: boolean,
    error: string | null,
    createConfigurationError: string | null
    success: string | null,
    deleteSuccess: string | null
}

export interface ServiceConfigurationMeta {
    id: number,
    name: string,
    user_role: string
}

export enum UserConfigurationRole {
    "Member",
    "Admin"
}

export interface ServiceConfiguration {
    id: number,
    name: string,
    description: string,
    user_role: UserConfigurationRole
}