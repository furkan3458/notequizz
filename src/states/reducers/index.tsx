import { combineReducers } from "redux";
import { useSelector,TypedUseSelectorHook } from "react-redux";

import authReducer, { authState } from "./authReducer";

const reducers = combineReducers({
    auth:authReducer,
});

interface RootState{
    auth:authState;
}

export default reducers;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export type StateType = ReturnType<typeof reducers>;