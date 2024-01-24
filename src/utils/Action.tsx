import Actions from './Types';

interface Action {
    type: Actions,
    payload ?: any
}

export default Action;