
export interface ConfigurationTagsState {
    configurationTags: ConfigurationTagMeta[],
    selectedConfigurationTag: ConfigurationTag | null,
    isLoading: boolean,
    error: string | null,
    isTagSettingsLoading: boolean,
    tagSettingsSuccess: string | null,
    tagSettingsError: string | null,
    isCreateTagLoading: boolean,
    createTagSuccess: string | null,
    createTagError: string | null,
    deleteTagSuccess: string | null
}

export interface ConfigurationTagMeta {
    id: number,
    tag: string,
    required_role: string
}

export interface ConfigurationTag {
    id: number,
    configuration_id: number,
    tag: string,
    description: string,
    configuration_name: string,
    required_role: string
}