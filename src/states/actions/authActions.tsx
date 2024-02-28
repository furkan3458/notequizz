import { Dispatch } from 'redux';
import Action from '../../utils/Action';
import ActionTypes from '../../utils/Types';
import { authState, initialize } from '../reducers/authReducer';
import { dispatcher } from '..';


export const setAuthLoading = (state: boolean) => (dispatch: Dispatch<Action>) => {
    const payload: authState = initialize;
    payload.isLoading = state;

    dispatcher(ActionTypes.AUTH_LOADING, payload, dispatch);
}

export const setAuthUserType = (state: string) => (dispatch: Dispatch<Action>) => {
    const payload: authState = initialize;
    payload.userType = state;

    dispatcher(ActionTypes.AUTH_USER_TYPE, payload, dispatch);
}