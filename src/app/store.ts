import {configureStore} from "@reduxjs/toolkit";
import userCredentialsReducer from "./storeSlices/userCredentialsSlice.ts";
import systemUsersReducer from "./storeSlices/systemUsersSlice.ts";
import configurationGeneralReducer from "./storeSlices/configurationsGeneralSlice.ts"
import configurationUsersReducer from "./storeSlices/configurationUsersSlice.ts"

export const store = configureStore({
    reducer: {
        user: userCredentialsReducer,
        system_users: systemUsersReducer,
        configurations_general: configurationGeneralReducer,
        configuration_users: configurationUsersReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;