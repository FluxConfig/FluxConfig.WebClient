import {AdminSystemUsersState} from "../Interfaces/State/systemUsersAdminStateTypes.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    ChangeUserRoleRequest,
    DeleteByAdminRequest,
    GetUserMetaRequest
} from "../Interfaces/Contracts/userCredentialsContracts.ts";
import {SystemUsersService} from "../services/SystemUsersService.ts";

const initialState : AdminSystemUsersState =  {
    selectedUser: null,
    systemUsers: [],
    error: null,
    isLoading: false,
    success: null,
    deleteUserIsLoading: false
}

export const changeUserRoleAsync = createAsyncThunk(
    "systemUsers/change-role",
    async (request: ChangeUserRoleRequest, {rejectWithValue}) => {
        try {
            return await SystemUsersService.changeUserRole(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "User credentials change failed");
        }
    }
)

export const deleteUserAccountAsync = createAsyncThunk(
    "systemUsers/delete",
    async (request: DeleteByAdminRequest, {rejectWithValue}) => {
        try {
            return await SystemUsersService.deleteOtherAccount(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "User credentials change failed");
        }
    }
)

export const getAllUsersAsync = createAsyncThunk(
    "systemUsers/get-all",
    async (_, {rejectWithValue}) => {
        try {
            return await SystemUsersService.getAllUsers();
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "User credentials change failed");
        }
    }
)

export const getUserMetaAsync = createAsyncThunk(
    "systemUsers/get-meta",
    async (request: GetUserMetaRequest, {rejectWithValue}) => {
        try {
            return await SystemUsersService.getUserMeta(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "User credentials change failed");
        }
    }
)

export const systemUsersSlice = createSlice({
    name: "systemUsers",
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
            .addCase(getUserMetaAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserMetaAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.selectedUser = action.payload;
            })
            .addCase(getUserMetaAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.selectedUser = null;
            })
            .addCase(getAllUsersAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAllUsersAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.systemUsers = action.payload;
            })
            .addCase(getAllUsersAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(changeUserRoleAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(changeUserRoleAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                if (state.selectedUser) {
                    state.selectedUser.role = action.payload;
                }
                state.success = "Role changed"
            })
            .addCase(changeUserRoleAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.success = null;
            })
            .addCase(deleteUserAccountAsync.pending, (state) => {
                state.deleteUserIsLoading= true;
                state.error = null;
                state.success = null;
            })
            .addCase(deleteUserAccountAsync.fulfilled, (state) => {
                state.deleteUserIsLoading = false;
                state.error = null;
                state.success = "Account deleted"
            })
            .addCase(deleteUserAccountAsync.rejected, (state, action) => {
                state.deleteUserIsLoading = false;
                state.error = action.payload as string;
                state.success = null;
            })
    }
})

export const { clearError, clearSuccess } = systemUsersSlice.actions;
export default systemUsersSlice.reducer;