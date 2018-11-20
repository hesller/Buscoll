import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

export const getConversationHistory = createReducer([], {
    [types.GET_CONVERSATION_HISTORY](state, action){
        return ({ ...state, mensagens: action.mensagens });
    }
})