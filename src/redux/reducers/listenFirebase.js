import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

export const listenFirebase = createReducer({ foodData: [],  }, {
        [types.LISTEN_FIREBASE](state, action) {
        return action;
    }
});
/*
export const rehydrateRed = createReducer({}, {
    [types.REHYDRATE](state,action) {
    return action.payload.listenFirebase || [];
});
*/
