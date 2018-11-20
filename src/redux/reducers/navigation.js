//
// este reducer será responsavel pela navegaçao entre telas
//

import createReducer from '../helpers/createReducer';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from '../../navigation/LoginNavegator';

// aqui eu decido qual tela vai logar primeiro
const firstAction = AppNavigator.router.getActionForPathParams('LoggedOut');

const initialState = AppNavigator.router.getStateForAction(firstAction);

// aqui vai o reducer, recebendo um estado inicial
// e uma ação
export const nav = (state = initialState, action) => {
    let nextState = AppNavigator.router.getStateForAction(action, state);
    return nextState || state;
};

