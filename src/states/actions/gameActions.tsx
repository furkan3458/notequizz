import { Dispatch } from 'redux';
import Action from '../../utils/Action';
import ActionTypes from '../../utils/Types';
import { gameState, initialize } from '../reducers/gameReducer';
import { dispatcher } from '..';


export const setGameLoading = (state: boolean) => (dispatch: Dispatch<Action>) => {
    const payload: gameState = initialize;
    payload.isLoading = state;

    dispatcher(ActionTypes.GAME_LOADING, payload, dispatch);
}

export const setUserPoint = (state: number) => (dispatch: Dispatch<Action>) => {
    const payload: gameState = initialize;
    payload.point = state;

    dispatcher(ActionTypes.GAME_SET_USER_POINT, payload, dispatch);
}

export const setGameStart = (state: boolean) => (dispatch: Dispatch<Action>) => {
    const payload: gameState = initialize;
    payload.isGameStart = state;

    dispatcher(ActionTypes.GAME_START_GAME, payload, dispatch);
}