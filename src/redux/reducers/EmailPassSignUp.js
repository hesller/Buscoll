import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

export const emailPassSignUp = createReducer({ foodData: [],  }, {
        [types.EMAIL_PASS_SIGNUP](state, action) {
        return action;
    }
});