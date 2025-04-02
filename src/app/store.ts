import {configureStore} from "@reduxjs/toolkit";
import userCredentialsReducer from "./storeSlices/userCredentialsSlice.ts";
import systemUsersReducer from "./storeSlices/systemUsersSlice.ts";
import configurationGeneralReducer from "./storeSlices/configurationsGeneralSlice.ts"
import configurationUsersReducer from "./storeSlices/configurationUsersSlice.ts"
import configurationKeysReducer from "./storeSlices/configurationKeysSlice.ts"
import configurationTagsReducer from "./storeSlices/configurationTagsSlice.ts"

export const store = configureStore({
    reducer: {
        user: userCredentialsReducer,
        system_users: systemUsersReducer,
        configurations_general: configurationGeneralReducer,
        configuration_users: configurationUsersReducer,
        configuration_keys: configurationKeysReducer,
        configuration_tags: configurationTagsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;