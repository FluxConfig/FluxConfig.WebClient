
export interface ConfigurationsGeneralState {
    userConfigurations: ServiceConfiguration[],
    isLoading: boolean,
    error: string | null,
    success: string | null
}

export interface ServiceConfiguration {
    id: number,
    name: string,
    user_role: string
}