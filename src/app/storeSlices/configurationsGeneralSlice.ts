import {ConfigurationsGeneralState} from "../Interfaces/State/configurationsGeneralTypes.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ConfigurationsGeneralService} from "../services/ConfigurationsGeneralService.ts";
import {
    ChangeConfigurationDescriptionRequest,
    ChangeConfigurationNameRequest,
    CreateConfigurationRequest,
    DeleteConfigurationRequest,
    GetConfigurationRequest
} from "../Interfaces/Contracts/configurationsGeneralContracts.ts";

const initialState: ConfigurationsGeneralState =  {
    userConfigurations: [],
    selectedConfiguration: null,
    isLoading: false,
    isCreateConfLoading: false,
    isConfigurationSettingsLoading: false,
    error: null,
    createConfigurationError: null,
    success: null,
    deleteSuccess: null
}

export const getUserConfigurationsAsync = createAsyncThunk(
    'configurations/get-all',
    async (_, { rejectWithValue }) => {
        try {
            return await ConfigurationsGeneralService.getUserConfigurations();
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to load user configurations.");
        }
    }
);

export const getConfigurationAsync = createAsyncThunk(
    'configurations/get',
    async (request: GetConfigurationRequest, {rejectWithValue}) => {
        try {
            return await ConfigurationsGeneralService.getConfiguration(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to load configuration.");
        }
    }
)

export const deleteConfigurationAsync = createAsyncThunk(
    'configurations/delete',
    async (request: DeleteConfigurationRequest, {rejectWithValue}) => {
        try {
            return await ConfigurationsGeneralService.deleteConfiguration(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to delete configuration.");
        }
    }
)

export const createConfigurationAsync = createAsyncThunk(
    'configurations/create',
    async (request: CreateConfigurationRequest, {rejectWithValue}) => {
        try {
            return await ConfigurationsGeneralService.createConfiguration(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to create configuration.");
        }
    }
)

export const changeConfigurationNameAsync = createAsyncThunk(
    'configurations/change-name',
    async (request: ChangeConfigurationNameRequest, {rejectWithValue}) => {
        try {
            return await ConfigurationsGeneralService.changeConfigurationName(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to change configuration name.");
        }
    }
)

export const changeConfigurationDescriptionAsync = createAsyncThunk(
    'configurations/change-description',
    async (request: ChangeConfigurationDescriptionRequest, {rejectWithValue}) => {
        try {
            return await ConfigurationsGeneralService.changeConfigurationDescription(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to change configuration description.");
        }
    }
)

export const configurationsGeneralSlice = createSlice({
    name: "configurations",
    initialState: initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearCreateConfError: (state) => {
            state.createConfigurationError = null;
        },
        clearSuccess: (state) => {
            state.success = null;
        },
        clearDeleteSuccess: (state) => {
            state.deleteSuccess = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getUserConfigurationsAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserConfigurationsAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.userConfigurations = action.payload;
            })
            .addCase(getUserConfigurationsAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(getConfigurationAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getConfigurationAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.selectedConfiguration = action.payload;
            })
            .addCase(getConfigurationAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.selectedConfiguration = null;
            })
            .addCase(deleteConfigurationAsync.pending, (state) => {
                state.isConfigurationSettingsLoading = true;
                state.error = null;
                state.deleteSuccess = null;
            })
            .addCase(deleteConfigurationAsync.fulfilled, (state) => {
                state.isConfigurationSettingsLoading = false;
                state.error = null;
                state.deleteSuccess = "Configuration deleted"
                state.selectedConfiguration = null;
            })
            .addCase(deleteConfigurationAsync.rejected, (state, action) => {
                state.isConfigurationSettingsLoading = false;
                state.error = action.payload as string;
                state.deleteSuccess = null;
            })
            .addCase(changeConfigurationNameAsync.pending, (state) => {
                state.isConfigurationSettingsLoading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(changeConfigurationNameAsync.fulfilled, (state, action) => {
                state.isConfigurationSettingsLoading= false;
                state.error = null;
                state.success = "Configuration name changed"
                if (state.selectedConfiguration) {
                    state.selectedConfiguration.name = action.payload;
                }
            })
            .addCase(changeConfigurationNameAsync.rejected, (state, action) => {
                state.isConfigurationSettingsLoading = false;
                state.error = action.payload as string;
                state.success = null;
            })
            .addCase(changeConfigurationDescriptionAsync.pending, (state) => {
                state.isConfigurationSettingsLoading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(changeConfigurationDescriptionAsync.fulfilled, (state, action) => {
                state.isConfigurationSettingsLoading = false;
                state.error = null;
                state.success = "Description changed"
                if (state.selectedConfiguration) {
                    state.selectedConfiguration.description = action.payload;
                }
            })
            .addCase(changeConfigurationDescriptionAsync.rejected, (state, action) => {
                state.isConfigurationSettingsLoading = false;
                state.error = action.payload as string;
                state.success = null;
            })
            .addCase(createConfigurationAsync.pending, (state) => {
                state.isCreateConfLoading = true;
                state.createConfigurationError = null;
                state.success = null;
            })
            .addCase(createConfigurationAsync.fulfilled, (state) => {
                state.isCreateConfLoading = false;
                state.createConfigurationError = null;
                state.success = "Configuration created"
            })
            .addCase(createConfigurationAsync.rejected, (state, action) => {
                state.isCreateConfLoading = false;
                state.createConfigurationError = action.payload as string;
                state.success = null;
            })
    }
})

export const {clearError, clearSuccess, clearCreateConfError, clearDeleteSuccess} = configurationsGeneralSlice.actions;
export default configurationsGeneralSlice.reducer;