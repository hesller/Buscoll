import * as LoggedOut from './loggedOut';
import * as listenFirebase from './listenFirebase';
import * as phoneCode from './phoneSendCode';
import * as emailSignUp from './EmailPassSignUp';
import * as updatePhoneState from './RegisterUser_Actions';
import * as appAction from './AppAction';
import * as perfilActions from './PerfilActions';
import * as buscarActions from './BuscarActions';
import * as categoriesActions from './CategoriasActions'
// usando o Object.assign(destino, origenm1, origem2, origem3, etc... )
export const ActionCreators = Object.assign({},
    LoggedOut,
    listenFirebase,
    phoneCode,
    emailSignUp,
    updatePhoneState,
    appAction,
    perfilActions,
    buscarActions,
    categoriesActions
);
