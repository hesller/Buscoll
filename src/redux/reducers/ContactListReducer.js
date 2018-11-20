import * as types from '../actions/types';
import createReducer from '../helpers/createReducer';

export const contactList = createReducer([], {
    [types.FETCHING_USERS](state, action) {
        return action;
    },
})