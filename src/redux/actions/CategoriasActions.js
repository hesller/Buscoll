import * as types from './types';
import firebase from 'react-native-firebase';


export const loadingCategories = () => {
    return dispatch => {
        dispatch(loading(true, 'Fazendo download das informações...'))
    }
}

const loading = (isLoading, message) => {
    return {
        type: types.LOADING_CATEGORIES,
        isLoading,
        message,
    }
}
