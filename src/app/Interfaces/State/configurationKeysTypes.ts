
export interface ConfigurationKeysState {
    configurationKeys: ConfigurationKey[],
    error: string | null,
    isLoading: boolean,
    addKeyError: string | null,
    addKeySuccess: string | null,
    isAddKeyLoading: boolean,
    deleteKeySuccess: string | null,
    deleteKeyError: string | null,
    isDeleteKeyLoading: boolean
}


export interface ConfigurationKey {
    id: string,
    role_permission: string,
    expiration_date: string
}