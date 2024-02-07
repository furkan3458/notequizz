import reducers from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

const initialState: any = {};

const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export default store;