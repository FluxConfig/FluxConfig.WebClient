import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AuthService} from "../services/AuthService.ts";
import {AuthState} from "../Interfaces/State/userStateTypes.ts";
import {LoginCredentials, RegisterCredentials} from "../Interfaces/Contracts/userAuthContracts.ts";
import {
    ChangeEmailRequest,
    ChangePasswordRequest,
    ChangeUsernameRequest
} from "../Interfaces/Contracts/userCredentialsContracts.ts";
import {SystemUsersService} from "../services/SystemUsersService.ts";

const initialState: AuthState = {
    user: null,
    isLoading: false,
    isAuthCheckLoading: false,
    error: null,
    success: null
}

export const loginAsync = createAsyncThunk(
    'user/login',
    async (request: LoginCredentials, { rejectWithValue})=> {
        try {
            return await AuthService.login(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof  Error ? error.message : "Sign-in failed")
        }
    }
)

export const registerAsync = createAsyncThunk(
    'user/register',
    async (request: RegisterCredentials, { rejectWithValue }) => {
        try {
            return await AuthService.register(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof  Error ? error.message : "Sign-up failed")
        }
    }
);

export const logoutAsync= createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            return await AuthService.logout();
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Logout failed");
        }
    }
)

export const checkAuthAsync = createAsyncThunk(
    'user/check-auth',
    async (_, {rejectWithValue}) => {
        try {
            return await AuthService.checkAuth();
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Authentication failed");
        }
    }
)

export const changeEmailAsync = createAsyncThunk(
    'user/change-email',
    async (request: ChangeEmailRequest, {rejectWithValue}) => {
        try {
            return await SystemUsersService.changeEmail(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "User credentials change failed");
        }
    }
)

export const changePasswordAsync = createAsyncThunk(
    'user/change-password',
    async (request: ChangePasswordRequest, {rejectWithValue}) => {
        try {
            return await SystemUsersService.changePassword(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "User credentials change failed");
        }
    }
)

export const changeUsernameAsync = createAsyncThunk(
    'user/change-username',
    async (request: ChangeUsernameRequest, {rejectWithValue}) => {
        try {
            return await SystemUsersService.changeUsername(request);
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "User credentials change failed");
        }
    }
)

export const deleteAccountAsync = createAsyncThunk(
    'user/delete-account',
    async (_, {rejectWithValue}) => {
        try {
            return await SystemUsersService.deleteSelfAccount();
        }
        catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Account deletion failed.");
        }
    }
)

export const userCredentialsSlice = createSlice({
    name: "user",
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
            .addCase(loginAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(registerAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerAsync.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(checkAuthAsync.pending, (state) => {
                state.isAuthCheckLoading = true;
                state.error = null;
            })
            .addCase(checkAuthAsync.fulfilled, (state, action) => {
                state.isAuthCheckLoading = false;
                state.error = null;
                state.user = action.payload;
            })
            .addCase(checkAuthAsync.rejected, (state, action) => {
                state.isAuthCheckLoading = false;
                state.user = null;
                state.error = action.payload as string;
            })
            .addCase(logoutAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutAsync.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
                state.user = null;
            })
            .addCase(logoutAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.user = null;
            })
            .addCase(changeEmailAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(changeEmailAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                if (state.user) {
                    state.user.email = action.payload;
                }
                state.success = "Email changed"
            })
            .addCase(changeEmailAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.success = null;
            })
            .addCase(changePasswordAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(changePasswordAsync.fulfilled, (state) => {
                state.isLoading = false;
                state.error = null;
                state.success = "Password changed"
            })
            .addCase(changePasswordAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.success = null;
            })
            .addCase(changeUsernameAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(changeUsernameAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                if (state.user) {
                    state.user.username = action.payload;
                }
                state.success = "Username changed "
            })
            .addCase(changeUsernameAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
                state.success = null;
            })
            .addCase(deleteAccountAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteAccountAsync.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.error = null;
            })
            .addCase(deleteAccountAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
    }
})

export const { clearError, clearSuccess } = userCredentialsSlice.actions;
export default userCredentialsSlice.reducer;