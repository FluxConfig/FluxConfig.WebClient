import {ConfigurationUsersState} from "../Interfaces/State/configurationUsersTypes.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    AddUserToConfigurationRequest, ChangeConfigurationUserRoleRequest, DeleteConfigurationUserRequest,
    GetConfigurationUsersRequest
} from "../Interfaces/Contracts/configurationUsersContracts.ts";
import {ConfigurationUsersService} from "../services/ConfigurationUsersService.ts";

const initialState: ConfigurationUsersState = {
    configurationUsers: [],
    error: null,
    isLoading: false,
    editUserSuccess: null,
    editUserError: null,
    isEditUserLoading: false,
    addUserSuccess: null,
    addUserError: null,
    isAddUserLoading: false,
    deleteUserError: null,
    deleteUserSuccess: null,
    isDeleteUserLoading: false
}

export const getConfigurationUsersAsync = createAsyncThunk(
    'configurationUsers/get',
    async (request: GetConfigurationUsersRequest, {rejectWithValue}) => {
        try {
            return await ConfigurationUsersService.getConfigurationUsers(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to get configuration members.");
        }
    }
)

export const addUserToConfigurationAsync = createAsyncThunk(
    'configurationUsers/add-to-config',
    async (request: AddUserToConfigurationRequest, {rejectWithValue}) => {
        try {
            return await ConfigurationUsersService.addUserToConfiguration(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to add member to configuration.");
        }
    }
)

export const deleteUserFromConfigurationAsync = createAsyncThunk(
    'configurationUsers/delete',
    async (request: DeleteConfigurationUserRequest, {rejectWithValue}) => {
        try {
            return await ConfigurationUsersService.deleteUserFromConfiguration(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to delete member from configuration.");
        }
    }
)

export const changeConfigurationMemberRole = createAsyncThunk(
    'configurationUsers/change-role',
    async (request: ChangeConfigurationUserRoleRequest, {rejectWithValue}) => {
        try {
            return await ConfigurationUsersService.changeConfigurationUserRole(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to change configuration member role.");
        }
    }
)

export const configurationUsersSlice = createSlice({
    name: "configurationUsers",
    initialState: initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        clearEditUserSuccess: (state) => {
            state.editUserSuccess = null
        },
        clearAddUserError: (state) => {
            state.addUserError = null
        },
        clearAddUserSuccess: (state) => {
            state.addUserSuccess = null;
        },
        clearEditUserError: (state) => {
            state.editUserError = null;
        },
        clearDeleteUserError: (state) => {
            state.deleteUserError = null;
        },
        clearDeleteUserSuccess: (state) => {
            state.deleteUserSuccess = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getConfigurationUsersAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getConfigurationUsersAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.configurationUsers = action.payload;
            })
            .addCase(getConfigurationUsersAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.editUserSuccess = null;
                state.configurationUsers = []
            })
            .addCase(addUserToConfigurationAsync.pending, (state) => {
                state.isAddUserLoading = true;
                state.addUserError= null;
                state.addUserSuccess = null;
            })
            .addCase(addUserToConfigurationAsync.fulfilled, (state) => {
                state.isAddUserLoading= false;
                state.addUserError = null;
                state.addUserSuccess = "User added to configuration as Member."
            })
            .addCase(addUserToConfigurationAsync.rejected, (state, action) => {
                state.isAddUserLoading = false;
                state.addUserError = action.payload as string;
                state.addUserSuccess = null;
            })
            .addCase(deleteUserFromConfigurationAsync.pending, (state) => {
                state.isDeleteUserLoading= true;
                state.deleteUserError =  null;
                state.deleteUserSuccess = null;
            })
            .addCase(deleteUserFromConfigurationAsync.fulfilled, (state) => {
                state.isDeleteUserLoading = false;
                state.deleteUserError = null;
                state.deleteUserSuccess = "User deleted from configuration."
                state.editUserSuccess = "User deleted from configuration."
            })
            .addCase(deleteUserFromConfigurationAsync.rejected, (state, action) => {
                state.isDeleteUserLoading = false;
                state.deleteUserError = action.payload as string;
                state.deleteUserSuccess = null;
            })
            .addCase(changeConfigurationMemberRole.pending, (state) => {
                state.isEditUserLoading= true;
                state.editUserError =  null;
                state.editUserSuccess = null;
            })
            .addCase(changeConfigurationMemberRole.fulfilled, (state) => {
                state.isEditUserLoading= false;
                state.editUserError= null;
                state.editUserSuccess = "User role changed."
            })
            .addCase(changeConfigurationMemberRole.rejected, (state, action) => {
                state.isEditUserLoading = false;
                state.editUserError = action.payload as string;
                state.editUserSuccess = null;
            })
    }
})


export const {
    clearError, clearEditUserSuccess, clearAddUserSuccess, clearAddUserError,
    clearEditUserError, clearDeleteUserSuccess, clearDeleteUserError} = configurationUsersSlice.actions;
export default configurationUsersSlice.reducer;