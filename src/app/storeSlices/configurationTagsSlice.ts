import {ConfigurationTagsState} from "../Interfaces/State/configurationTagsTypes.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ChangeConfigurationTagDescriptionRequest,
    ChangeConfigurationTagRequiredRoleRequest,
    CreateConfigurationTagRequest,
    DeleteConfigurationTagRequest,
    GetConfigurationTagRequest,
    GetConfigurationTagsMetaRequest
} from "../Interfaces/Contracts/configurationTagsContracts.ts";
import {ConfigurationTagsService} from "../services/ConfigurationTagsService.ts";

const initialState: ConfigurationTagsState = {
    configurationTags: [],
    selectedConfigurationTag: null,
    isLoading: false,
    error: null,
    isTagSettingsLoading: false,
    tagSettingsError: null,
    tagSettingsSuccess: null,
    isCreateTagLoading: false,
    createTagError: null,
    createTagSuccess: null,
    deleteTagSuccess: null
}

export const getConfigurationTagsMetaAsync = createAsyncThunk(
    'configurationTags/get-all',
    async (request: GetConfigurationTagsMetaRequest, {rejectWithValue})=> {
        try {
            return await ConfigurationTagsService.getConfigurationTagsMeta(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to load configuration tags");
        }
    }
)

export const getConfigurationTagAsync = createAsyncThunk(
    'configurationTags/get',
    async (request: GetConfigurationTagRequest, {rejectWithValue})=> {
        try {
            return await ConfigurationTagsService.getConfigurationTag(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to load configuration tag");
        }
    }
)

export const deleteConfigurationTagAsync = createAsyncThunk(
    'configurationTags/delete',
    async (request: DeleteConfigurationTagRequest, {rejectWithValue})=> {
        try {
            return await ConfigurationTagsService.deleteConfigurationTag(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to delete configuration tag");
        }
    }
)

export const createConfigurationTagAsync = createAsyncThunk(
    'configurationTags/create',
    async (request: CreateConfigurationTagRequest, {rejectWithValue})=> {
        try {
            return await ConfigurationTagsService.createConfigurationTag(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to create configuration tag");
        }
    }
)

export const changeTagRequiredRoleAsync = createAsyncThunk(
    'configurationTags/change-role',
    async (request: ChangeConfigurationTagRequiredRoleRequest, {rejectWithValue})=> {
        try {
            return await ConfigurationTagsService.changeConfigurationTagRequiredRole(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to change configuration tag required role");
        }
    }
)

export const changeTagDescriptionAsync = createAsyncThunk(
    'configurationTags/change-description',
    async (request: ChangeConfigurationTagDescriptionRequest, {rejectWithValue})=> {
        try {
            return await ConfigurationTagsService.changeConfigurationTagDescription(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Failed to change configuration tag description");
        }
    }
)

export const configurationTagsSlice = createSlice({
    name: "configurationTags",
    initialState: initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearTagSettingsError: (state) => {
            state.tagSettingsError = null;
        },
        clearTagSettingsSuccess: (state) => {
            state.tagSettingsSuccess = null;
        },
        clearCreateTagError: (state) => {
            state.createTagError = null;
        },
        clearCreateTagSuccess: (state) => {
            state.createTagSuccess = null;
        },
        clearDeleteTagSuccess: (state) => {
            state.deleteTagSuccess = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getConfigurationTagsMetaAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getConfigurationTagsMetaAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.configurationTags = action.payload;
                state.error = null;
            })
            .addCase(getConfigurationTagsMetaAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.configurationTags = [];
            })
            .addCase(getConfigurationTagAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getConfigurationTagAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedConfigurationTag = action.payload;
                state.error = null;
            })
            .addCase(getConfigurationTagAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.selectedConfigurationTag = null;
            })
            .addCase(createConfigurationTagAsync.pending, (state) => {
                state.isCreateTagLoading = true;
                state.createTagError = null;
                state.createTagSuccess = null;
            })
            .addCase(createConfigurationTagAsync.fulfilled, (state) => {
                state.isCreateTagLoading = false;
                state.createTagError = null;
                state.createTagSuccess = "Configuration tag created."
            })
            .addCase(createConfigurationTagAsync.rejected, (state, action) => {
                state.isCreateTagLoading = false;
                state.createTagError = action.payload as string;
                state.createTagSuccess = null;
            })
            .addCase(deleteConfigurationTagAsync.pending, (state) => {
                state.isTagSettingsLoading = true;
                state.tagSettingsError = null;
                state.deleteTagSuccess = null;
            })
            .addCase(deleteConfigurationTagAsync.fulfilled, (state) => {
                state.isTagSettingsLoading = false;
                state.tagSettingsError = null;
                state.deleteTagSuccess= "Configuration tag deleted."
                state.selectedConfigurationTag = null;
            })
            .addCase(deleteConfigurationTagAsync.rejected, (state, action) => {
                state.isTagSettingsLoading = false;
                state.tagSettingsError = action.payload as string;
                state.deleteTagSuccess = null;
            })
            .addCase(changeTagDescriptionAsync.pending, (state) => {
                state.isTagSettingsLoading = true;
                state.tagSettingsError = null;
                state.tagSettingsSuccess = null;
            })
            .addCase(changeTagDescriptionAsync.fulfilled, (state, action) => {
                state.isTagSettingsLoading = false;
                state.tagSettingsError = null;
                state.tagSettingsSuccess= "Description changed."
                if (state.selectedConfigurationTag) {
                    state.selectedConfigurationTag.description = action.payload;
                }
            })
            .addCase(changeTagDescriptionAsync.rejected, (state, action) => {
                state.isTagSettingsLoading = false;
                state.tagSettingsError = action.payload as string;
                state.tagSettingsSuccess = null;
            })
            .addCase(changeTagRequiredRoleAsync.pending, (state) => {
                state.isTagSettingsLoading = true;
                state.tagSettingsError = null;
                state.tagSettingsSuccess = null;
            })
            .addCase(changeTagRequiredRoleAsync.fulfilled, (state, action) => {
                state.isTagSettingsLoading = false;
                state.tagSettingsError = null;
                state.tagSettingsSuccess= "Required role changed."
                if (state.selectedConfigurationTag) {
                    state.selectedConfigurationTag.required_role = action.payload;
                }
            })
            .addCase(changeTagRequiredRoleAsync.rejected, (state, action) => {
                state.isTagSettingsLoading = false;
                state.tagSettingsError = action.payload as string;
                state.tagSettingsSuccess = null;
            })
    }
})

export const {clearDeleteTagSuccess, clearTagSettingsSuccess, clearCreateTagSuccess, clearTagSettingsError, clearCreateTagError, clearError} = configurationTagsSlice.actions;
export default configurationTagsSlice.reducer;