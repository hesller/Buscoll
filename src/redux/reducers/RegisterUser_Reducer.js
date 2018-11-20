import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

export const userRegisterReducer = createReducer([], {
    [types.USER_REGISTER_ACTIONS](state, action) {
        return {action};
    }
});