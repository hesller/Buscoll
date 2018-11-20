import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

export const categoriesReducer = createReducer({}, {
    [types.LOADING_CATEGORIES](state, action) {
        return ({ ...state, isLoading: action.isLoading, message: action.message })
    }
})