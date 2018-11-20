import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

export const perfilReducer = createReducer( [], {
    [types.NAME_STATE](state, action) {
        return ({...state, name: action.name });
    },
    [types.UPDATE_PROFILE_IMAGE](state, action) {
        return ({...state, name: action.name, message: action.message });
    },
    [types.UPLOAD_PROFILE_IMAGE](state, action) {
        return ({...state, message: action.message, profUri: action.profUri, photoURL: action.photoURL });
    },
    [types.PERFIL_LOADING](state, action) {
        return ({...state, loading: action.loading });
    },
    [types.FETCH_CATEGORIES](state, action) {
        return ({...state, categories: action.categories });
    },
    [types.COVER_IMAGES](state, action) {
        return ({...state, coverImages: action.coverImages });
    },
    [types.CATALOG_IMAGES](state, action) {
        return ({...state, catalogImages: action.catalogImages });
    },
    [types.AMBIENTE_IMAGES](state, action) {
        return ({...state, ambienteImages: action.ambienteImages });
    },
    [types.MAP_PREVIEW](state, action) {
        return ({...state, mapPreview: action.mapPreview });
    },
    [types.REGISTER_BUSINESS](state, action) {
        return ({...state });
    },
    [types.BUSINESS_LOADING](state, action) {
        return ({...state, loadingMessage: action.message, businessLoading: action.businessLoading });
    },
});