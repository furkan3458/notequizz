import { state } from '.';
import Action from '../../utils/Action';
import ActionTypes from '../../utils/Types';

export interface gameState extends state {
    isLoading: boolean | false,
    isGameStart: boolean | false,
    point: number,
}

export const initialize: gameState = {
    isInit: false,
    isLoading: true,
    isGameStart: false,
    point: 0,
}

const authReducer = (state: gameState = initialize, action: Action) => {
    let newState: gameState = { ...state };
    newState.isInit = true;
    switch (action.type) {
        case ActionTypes.GAME_LOADING:
            newState.isLoading = action.payload.isLoading;
            break;
        case ActionTypes.GAME_SET_USER_POINT:
            newState.point = action.payload.point;
            break;
        case ActionTypes.GAME_START_GAME:
            newState.isGameStart = action.payload.isGameStart;
            break;
        case ActionTypes.GAME_REFRESH:
            newState = { ...initialize };
            newState.isInit = true;
            break;
        default:
            return state;
    }
    return newState;
}

export default authReducer;