import {ConfigurationKeysState} from "../Interfaces/State/configurationKeysTypes.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    CreateConfigurationKeyRequest, DeleteConfigurationKeyRequest,
    GetConfigurationKeysRequest
} from "../Interfaces/Contracts/configurationKeysContracts.ts";
import {ConfigurationKeysService} from "../services/ConfigurationKeysService.ts";

const initialState: ConfigurationKeysState = {
    configurationKeys: [],
    error: null,
    isLoading: false,
    addKeyError: null,
    addKeySuccess: null,
    isAddKeyLoading: false,
    deleteKeyError: null,
    deleteKeySuccess: null,
    isDeleteKeyLoading: false
}

export const getConfigurationKeysAsync = createAsyncThunk(
    'configurationKeys/get',
    async (request: GetConfigurationKeysRequest, {rejectWithValue}) => {
        try {
            return await ConfigurationKeysService.getConfigurationKeys(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to get configuration keys.");
        }
    }
)

export const addConfigurationKeyAsync = createAsyncThunk(
    'configurationKeys/add',
    async (request: CreateConfigurationKeyRequest, {rejectWithValue}) => {
        try {
            return await ConfigurationKeysService.createConfigurationKey(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to create configuration key.");
        }
    }
)

export const deleteConfigurationKeyAsync = createAsyncThunk(
    'configurationKeys/delete',
    async (request: DeleteConfigurationKeyRequest, {rejectWithValue}) => {
        try {
            return await ConfigurationKeysService.deleteConfigurationKey(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to delete configuration key.");
        }
    }
)

export const configurationKeysSlice = createSlice({
    name: "configurationKeys",
    initialState: initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        clearAddKeyError: (state) => {
            state.addKeyError = null;
        },
        clearAddKeySuccess: (state) => {
            state.addKeySuccess = null;
        },
        clearDeleteKeyError: (state) => {
            state.deleteKeyError = null;
        },
        clearDeleteKeySuccess: (state) => {
            state.deleteKeySuccess = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getConfigurationKeysAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getConfigurationKeysAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.configurationKeys = action.payload;
            })
            .addCase(getConfigurationKeysAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.configurationKeys = [];
            })
            .addCase(addConfigurationKeyAsync.pending, (state) => {
                state.isAddKeyLoading = true;
                state.addKeyError = null;
                state.addKeySuccess = null;
            })
            .addCase(addConfigurationKeyAsync.fulfilled, (state) => {
                state.isAddKeyLoading = false;
                state.addKeyError = null;
                state.addKeySuccess = "Configuration key created."
            })
            .addCase(addConfigurationKeyAsync.rejected, (state, action) =>  {
                state.isAddKeyLoading = false;
                state.addKeyError = action.payload as string;
                state.addKeySuccess = null;
            })
            .addCase(deleteConfigurationKeyAsync.pending, (state) => {
                state.isDeleteKeyLoading = true;
                state.deleteKeyError = null;
                state.deleteKeySuccess = null;
            })
            .addCase(deleteConfigurationKeyAsync.fulfilled, (state) => {
                state.isDeleteKeyLoading = false;
                state.deleteKeyError = null;
                state.deleteKeySuccess= "Configuration key deleted."
            })
            .addCase(deleteConfigurationKeyAsync.rejected, (state, action) =>  {
                state.isDeleteKeyLoading = false;
                state.deleteKeyError = action.payload as string;
                state.deleteKeySuccess= null;
            })
    }
})

export const {clearAddKeyError, clearDeleteKeyError, clearDeleteKeySuccess, clearAddKeySuccess, clearError} = configurationKeysSlice.actions
export default configurationKeysSlice.reducer;