import { configureStore } from '@reduxjs/toolkit';
import snackbarReducer from './snackbar-slice';

export const store = configureStore({
    reducer: {
        snackbar: snackbarReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: false
        }
    ),
});