import * as types from './types';

export function updatePhoneState (number) {
    return { 
        type: types.USER_REGISTER_ACTIONS,
        number
     }
}
