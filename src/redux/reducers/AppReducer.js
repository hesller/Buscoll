import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';
import { GiftedChat } from 'react-native-gifted-chat'

export const appReducer = createReducer( [], {
    [types.MODIFICAR_CELULAR](state, action) {
        return {...state};
    },
    [types.ADICIONAR_CONTATO](state, action) {
        return {...state};
    },
    [types.ADICIONAR_CONTATO_ERRO](state, action) {
        return {...state};
    },
    [types.SEND_MSG](state, action) {
        return ({ ...state, mensagens: GiftedChat.append(...state.mensagens, action.mensagens) });
    },
    [types.SEND_MSG_ERROR](state, action) {
        return {...state};
    },
    [types.CHECK_DOC_EXISTS](state, action) {
        return {...state};
    },
    [types.LOADING_CHATROOM](state, action) {
        return {...state, message: action.message, loadingChatRoom: action.loadingChatRoom };
    },
});
