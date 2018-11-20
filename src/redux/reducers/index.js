import { combineReducers } from 'redux';
import * as LoggedOut from './loggedOut';
import * as listenFirebase from './listenFirebase';
import * as phoneSendCode from './phoneSendCode';
import * as emailPassSignUp from './EmailPassSignUp';
import * as userRegisterReducer from './RegisterUser_Reducer';
import * as appReducer from './AppReducer';
import * as contactList from './ContactListReducer';
import * as getConversationsListReducer from './GetConversationsListReducer';
import * as getConversationHistory from './GetConversationHistory';
import * as perfilReducer from './PerfilReducer';
import * as buscarReducer from './BuscarReducer';
import * as categoriesReducer from './CategoriesReducer'
import { reducer as formReducer } from 'redux-form'

export default combineReducers(Object.assign(
    LoggedOut,
    listenFirebase,
    phoneSendCode,
    appReducer,
    contactList,
    getConversationsListReducer,
    getConversationHistory,
    perfilReducer,
    buscarReducer,
    categoriesReducer,
    {form: formReducer},
));
