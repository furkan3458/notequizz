import { state } from '.';
import Action from '../../utils/Action';
import ActionTypes from '../../utils/Types';

export interface authState extends state {
    isLoading: boolean | false,
    userType: string | '',
}

export const initialize: authState = {
    isInit: false,
    isLoading: false,
    userType: "",
}

const authReducer = (state: authState = initialize, action: Action) => {
    let newState: authState = {...state};
    newState.isInit = true;
    switch (action.type) {
        case ActionTypes.AUTH_LOADING:
            newState.isLoading = action.payload.isLoading;
            break;
        case ActionTypes.AUTH_USER_TYPE:
            newState.userType = action.payload.userType;
            break;
        case ActionTypes.AUTH_REFRESH:
            newState = {...initialize};
            newState.isInit = true;
            break;
        default:
            return state;
    }
    return newState;
}

export default authReducer;