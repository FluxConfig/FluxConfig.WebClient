import {configureStore} from "@reduxjs/toolkit";
import userCredentialsReducer from "./storeSlices/userCredentialsSlice.ts";
import systemUsersReducer from "./storeSlices/systemUsersSlice.ts";

export const store = configureStore({
    reducer: {
        user: userCredentialsReducer,
        system_users: systemUsersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;