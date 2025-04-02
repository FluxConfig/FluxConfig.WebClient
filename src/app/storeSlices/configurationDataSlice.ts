import {ConfigurationDataState} from "../Interfaces/State/configurationDataState.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    LoadConfigurationDataRequest,
    UpdateConfigurationDataRequest
} from "../Interfaces/Contracts/configurationDataContracts.ts";
import {ConfigurationDataService} from "../services/ConfigurationDataService.ts";

const initialState: ConfigurationDataState = {
    selectedConfigurationData: [],
    error: null,
    isLoading: false,
    isUpdateDataLoading: false,
    updateDataError: null,
    updateDataSuccess: null
}

export const loadConfigurationDataAsync = createAsyncThunk(
    'configurationData/load',
    async (request: LoadConfigurationDataRequest, {rejectWithValue} ) => {
        try {
            return await ConfigurationDataService.loadConfigurationData(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to load configuration data.");
        }
    }
)


export const updateConfigurationDataAsync = createAsyncThunk(
    'configurationData/update',
    async (request: UpdateConfigurationDataRequest, {rejectWithValue} ) => {
        try {
            return await ConfigurationDataService.updateConfigurationData(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to update configuration data.");
        }
    }
)

export const configurationDataSlice = createSlice({
    name: "configurationData",
    initialState: initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearUpdateDateError: (state) => {
            state.updateDataError = null;
        },
        clearUpdateDataSuccess: (state) => {
            state.updateDataSuccess = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadConfigurationDataAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loadConfigurationDataAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.selectedConfigurationData = action.payload;
            })
            .addCase(loadConfigurationDataAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.selectedConfigurationData = [];
            })
            .addCase(updateConfigurationDataAsync.pending, (state) => {
                state.isUpdateDataLoading = true;
                state.updateDataSuccess = null;
                state.updateDataError = null;
            })
            .addCase(updateConfigurationDataAsync.fulfilled, (state) => {
                state.isUpdateDataLoading = false;
                state.updateDataError = null;
                state.updateDataSuccess = "Configuration data updated"
            })
            .addCase(updateConfigurationDataAsync.rejected, (state, action) => {
                state.isUpdateDataLoading = false;
                state.updateDataSuccess = null;
                state.updateDataError = action.payload as string;
            })
    }
})

export const {clearUpdateDateError, clearUpdateDataSuccess, clearError} = configurationDataSlice.actions;
export default configurationDataSlice.reducer;