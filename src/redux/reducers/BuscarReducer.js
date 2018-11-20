import createReducer from '../helpers/createReducer';
import * as types from '../actions/types';

export const buscarReducer = createReducer( [], {
    [types.BUSCAR_LOADING](state, action) {
        return ({ ...state, loading: action.loading });
    },
    [types.GET_ADS](state, action) {
        return ({ ...state, 
                adsList: action.adsList, 
                loadingAds: action.loadingAds, 
                featuredAds: action.featuredAds,
                allAds: action.allAds
            });
    },
});