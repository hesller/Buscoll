import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

export const phoneSendCode = createReducer( [], {
    [types.PHONE_SEND_CODE](state, action) {
        return ({...state, phoneNumber: action.phoneNumber, message: action.message, confirmResult: action.confirmResult, user: action.user });
    },
    [types.SET_PHONE_NUMBER_STATE](state, action) {
        return ({ ...state, phoneNumber: action.phoneNumber });
    },
    [types.SENDING_MSG](state, action) {
        return ({ ...state, message: action.message});
    },
    [types.PHONE_CONFIRM_CODE](state, action) {
        return ({...state, user: action.user, message: action.message});
    },
    [types.PHONE_CONFIRM_CODE_ERROR](state, action) {
        return ({...state, message: action.message});
    },
    [types.LOADING_LOGOUT](state, action) {
        return ({...state, loading_LogOut: action.loading_LogOut});
    },
    [types.RESET_CONFIRMATION_CODE](state, action) {
        return ({...state, confirmResult: action.confirmResult, message: action.message });
    },
    [types.SET_NAME_STATE](state, action) {
        return ({ ...state, name: action.name });
    },
    [types.SET_NAME](state, action) {
        return action;
    },
    [types.UPDATE_TO_PHONESENDCODE](state, action) {
        return ({ ...state, name: action.name });
    },
    [types.UPDATE_PROF_PIC_DOWNLOAD_URL](state, action) {
        return ({ ...state, user: action.user });
    },
});
/*
export const phoneSendCodeReducerAux = createReducer([], {
    
})
*/
