import { combineReducers } from "redux";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import contentReducer, { contentState } from "./contentReducer";
import gameReducer, { gameState } from "./gameReducer";
import { ConfigureStoreOptions } from "@reduxjs/toolkit";

const reducers = combineReducers({
    content: contentReducer,
    game: gameReducer,
});

export interface state {
    isInit: boolean;
}

interface RootState {
    content: contentState;
    game: gameState;
}

export default reducers;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type StateType = ReturnType<typeof reducers>;
export type Configured =  ConfigureStoreOptions<{ content: contentState; game: gameState; }>;