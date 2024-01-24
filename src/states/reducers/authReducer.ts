import Action from '../../utils/Action';
import ActionTypes from '../../utils/Types';

export enum ValidityStates {
    IDLE,
    VALID,
    INVALID,
}

export enum ActivityStates {
    NULL,
    OK,
    ALREADY,
    EXPIRED,
    INVALID,
}

export interface authValidity {
    isValidating?: boolean;
    validateState?: ValidityStates | null;
}

export interface authState {
    isAuthenticated?: boolean;
    isLoading?: boolean;
    isAuthFail?: boolean;
    isValidate?: boolean;
    emailValidity?: authValidity;
    user?: object | null;
    activity?: ActivityStates;
    passwordReset?: ActivityStates;
}

const initialize: authState = {
    isAuthenticated: false,
    isAuthFail: false,
    isLoading: false,
    isValidate: false,
    emailValidity: {
        isValidating: false,
        validateState: ValidityStates.IDLE
    },
    user: null,
    activity: ActivityStates.NULL,
    passwordReset: ActivityStates.NULL,
}

const authReducer = (state: authState = initialize, action: Action) => {
    switch (action.type) {
        case ActionTypes.AUTH_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        case ActionTypes.AUTH_AUTHENTICATION:
            return {
                ...state,
                isAuthenticated: action.payload
            }
        case ActionTypes.AUTH_RESET:
            return {
                ...state,
                isAuthFail: false,
                isAuthenticated: false,
                isValidate: false,
            }
        case ActionTypes.AUTH_FAIL:
            return {
                ...state,
                isAuthFail: action.payload
            }
        case ActionTypes.AUTH_VALIDATE:
            return {
                ...state,
                user: action.payload,
                isValidate: true,
            }
        case ActionTypes.AUTH_VALIDATE_EMAIL:
            return {
                ...state,
                emailValidity: action.payload,
            }
        case ActionTypes.AUTH_LOGOUT:
            return {
                ...state,
                isValidate: action.payload,
            }
        case ActionTypes.AUTH_ACTIVITY:
            return {
                ...state,
                activity: action.payload,
            }
        case ActionTypes.AUTH_PASSWORD_RESULT:
            return {
                ...state,
                passwordReset: action.payload,
            }
        case ActionTypes.AUTH_ACTIVITY_RESET:
            return{
                ...state,
                activity: ActivityStates.NULL,
                passwordReset: ActivityStates.NULL,
            }
        default:
            return state;
    }
}

export default authReducer;