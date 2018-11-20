import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

export const getConversationsListReducer = createReducer([], {
    [types.GET_CONVERSATION_LIST](state, action) {
        return ({ ...state, conversas: action.conversas, contatos: action.contatos});
    },
    [types.GET_CONVERSATION_LIST_TO_DISPLAY](state, action) {
        return ({ ...state, conversationsList: action.conversationsList });
    }
})