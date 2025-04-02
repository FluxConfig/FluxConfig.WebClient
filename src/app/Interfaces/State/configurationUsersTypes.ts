
export interface ConfigurationUsersState {
    configurationUsers: ConfigurationMember[],
    error: string | null,
    isLoading: boolean,
    editUserSuccess: string | null,
    editUserError: string | null,
    isEditUserLoading: boolean,
    addUserSuccess: string | null,
    addUserError: string | null,
    isAddUserLoading: boolean,
    deleteUserError: string | null,
    deleteUserSuccess: string | null,
    isDeleteUserLoading: boolean
}

export interface ConfigurationMember {
    id: number,
    username: string,
    email: string,
    role: string
}