import {ConfigurationsGeneralState} from "../Interfaces/State/configurationsGeneralTypes.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ConfigurationsGeneralService} from "../services/ConfigurationsGeneralService.ts";

const initialState: ConfigurationsGeneralState =  {
    userConfigurations: [],
    isLoading: false,
    error: null,
    success: null
}

export const getUserConfigurationsAsync = createAsyncThunk(
    'configurations/get-all',
    async (_, { rejectWithValue }) => {
        try {
            return await ConfigurationsGeneralService.getUserConfigurations();
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Filed to load user configurations.");
        }
    }
);

export const configurationsGeneralSlice = createSlice({
    name: "configurations",
    initialState: initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = null;
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
    }
})

export const {clearError, clearSuccess} = configurationsGeneralSlice.actions;
export default configurationsGeneralSlice.reducer;