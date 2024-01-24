import { legacy_createStore as createStore, applyMiddleware } from "redux";
import logger  from "redux-logger";
import {thunk} from "redux-thunk";

import reducers from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "@redux-devtools/extension";

const initialState: any = {};
const middleware = [thunk];


const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});

export default store;