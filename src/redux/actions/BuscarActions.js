import * as types from './types'

export const buscarLoading = (loading) => {
    return {
        type: types.BUSCAR_LOADING,
        loading
    }
}