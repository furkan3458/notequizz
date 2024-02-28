import { combineReducers } from "redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import contentReducer, { contentState } from "./contentReducer";
import authReducer, { authState } from "./authReducer";
import { ConfigureStoreOptions } from "@reduxjs/toolkit";

const reducers = combineReducers({
    content: contentReducer,
    auth: authReducer,
});

export interface state {
    isInit: boolean;
}

interface RootState {
    content: contentState;
    auth: authState;
}

export default reducers;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type StateType = ReturnType<typeof reducers>;
export type Configured =  ConfigureStoreOptions<{ content: contentState; auth: authState; }>;