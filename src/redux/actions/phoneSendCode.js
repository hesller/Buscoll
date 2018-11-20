import firebase from 'react-native-firebase';
import * as types from './types';
import { NavigationActions } from 'react-navigation';
import NavigationServices from '../../components/utilities/NavigationServices'
import { navigationRef } from '../../../App'
import { Alert } from 'react-native';
import { ActionCreators } from '.';

// a acao e dispachada pro reducer com um tipo e payload
export function getPhoneAuthCode(phoneNumber, name) {
    var currentPhoneNumber = `+55${phoneNumber}`
    return dispatch => {
        var currentName = name;
        dispatch(setName(currentName));

        firebase.auth().signInWithPhoneNumber(currentPhoneNumber)
            .then(confirmResult => {
                var message = 'Código de confirmação foi enviado! Você receberar um SMS com o código, digite-o acima...'
                dispatch(sendPhoneCode(currentPhoneNumber, message, confirmResult));
            })
            .catch(error => {
                if (error.code == 'auth/unknown') {
                    var message = 'Sem conexão com internet, não foi possível completar sua solicitação!';
                    dispatch(sendPhoneCode(currentPhoneNumber, error.message));
                } else if (error.code == 'auth/invalid-phone-number') {
                    var message = 'Número de celular inválido. Por favor digite o DDD + Número do Celular. Por exemplo, 11 982XX-XX10';
                    dispatch(sendPhoneCode(currentPhoneNumber, message));
                } else if (error.code == 'auth/missing-phone-number') {
                    var message = 'Você esqueceu de digitar o número do telefone?';
                    dispatch(sendPhoneCode(currentPhoneNumber, message));
                } else if (error.code == 'auth/user-disabled') {
                    var message = 'Este numero foi desabilitado, contate-nos para saber o motivo.';
                    dispatch(sendPhoneCode(currentPhoneNumber, message));
                } else {
                    var message = 'Ocorreu um erro desconhecido, por favor envie uma mensagem para nós informando o erro ao lado ===>>'
                        + error.message + ' error code: ' + error.code;
                    dispatch(sendPhoneCode(currentPhoneNumber, message));
                }
            });
    }

}

export const sendPhoneCode = (phoneNumber, message, confirmResult) => {
    return {
        type: types.PHONE_SEND_CODE,
        phoneNumber,
        message,
        confirmResult,

    }
}

export const resetConfirmationCode = () => {
    return {
        type: types.RESET_CONFIRMATION_CODE,
        confirmResult: null,
        message: '',
    }
}

// essa funcao renderiza a primeira mensagem
export function renderMsg(message) {
    return dispatch => dispatch(renderMsgAction(message));
}

export const renderMsgAction = (message) => {
    return {
        type: types.PHONE_SEND_CODE,
        message
    }
}

// essa acao e pra segurar o numero do telefone E O NOME

export const setPhoneStateValue = (phoneNumber) => {
    return {
        type: types.SET_PHONE_NUMBER_STATE,
        phoneNumber,
    }
}

export const setNameState = (name) => {
    return {
        type: types.SET_NAME_STATE,
        name,
    }
}

export const setName = (name) => {
    return {
        type: types.SET_NAME,
        name,
    }
}

// essa funcao e a principal para mostrar a msg 'enviando'


export const sendingMsg = (message) => {
    return {
        type: types.SENDING_MSG,
        message,
    }
}

// essa funcao confirma o codigo
const navigateProfile = NavigationActions.navigate({
    routeName: 'ChatPrincipal_Screen',

    action: NavigationActions.navigate({ routeName: 'ChatPrincipal_Screen' })
});

export function registerOnDatabase(user, name) {
    if (firebase.auth().currentUser) {
        const userUid = String(user.uid);
        return dispatch => {
            firebase.firestore().collection('users').doc(userUid).set({
                uid: user.uid,
                phoneNumber: user.phoneNumber,
                photoURL: user.photoURL,
                email: user.email,
                name: name,
            })
            .then(() => {
                return dispatch(confirmCodeAux(user, 'Código confirmado com sucesso.'))
            })
        }
    } else {
        return null;
    }
}

export function confirmCodeFromOutSide(confirmResult, codeInput, messagem, name, contactPhoneNumber) {
    return dispatch => {
        confirmResult.confirm(codeInput)
            .then((user) => {
                var userUid = String(user.uid);
                firebase.firestore().collection('users').doc(userUid).set({
                    uid: user.uid,
                    phoneNumber: user.phoneNumber,
                    photoURL: user.photoURL,
                    email: user.email,
                    name: name,
                })
                    .then(() => {
                        var msg = 'Código Confirmado! Seja muito bem-vindo(a) à Buscoll.';
                        return dispatch(confirmCodeAux(user, msg))
                    })
                    .then(() => {
                        /*navigationRef.dispatch(NavigationActions.navigate({ // this is react-navigation's dispatch
                            routeName: 'ChatPrincipal_Screen'
                        }));*/
                        dispatch(ActionCreators.buscarUsuarioPeloNumeroCelular(contactPhoneNumber))
                    })
                    .catch(error => {
                        messagem = `Ocorreu um erro durante o registro : ${error.message}`;
                        return dispatch(confirmCodeAuxError(messagem))
                    })
            })
            .catch(error => {
                if (error.code == 'auth/invalid-verification-code') {
                    messagem = `Código de verificação não é válido. Por favor, digite corretamente o código que enviamos pra você`;
                    return dispatch(confirmCodeAuxError(messagem))
                } else {
                    messagem = `Ocorreu um erro durante o registro : ${error.message} e ${error.code}`;
                    return dispatch(confirmCodeAuxError(messagem))
                }
            });
    }
}

export function confirmCode(confirmResult, codeInput, messagem, name) {
    return dispatch => {
        confirmResult.confirm(codeInput)
            .then((user) => {
                var userUid = String(user.uid);

                firebase.firestore().collection('users').doc(userUid).set({
                    uid: user.uid,
                    phoneNumber: user.phoneNumber,
                    photoURL: user.photoURL,
                    email: user.email,
                    name: name,
                })
                    .then(() => {
                        var msg = 'Código Confirmado! Seja muito bem-vindo(a) à Buscoll.';
                        return dispatch(confirmCodeAux(user, msg))
                    })
                    .then(() => {
                        /*navigationRef.dispatch(NavigationActions.navigate({ // this is react-navigation's dispatch
                            routeName: 'ChatPrincipal_Screen'
                        }));*/
                        NavigationServices.navigate('ChatPrincipal_Screen')
                    })
                    .catch(error => {
                        messagem = `Ocorreu um erro durante o registro : ${error.message}`;
                        return dispatch(confirmCodeAuxError(messagem))
                    })
            })
            .catch(error => {
                if (error.code == 'auth/invalid-verification-code') {
                    messagem = `Código de verificação não é válido. Por favor, digite corretamente o código que enviamos pra você`;
                    return dispatch(confirmCodeAuxError(messagem))
                } else {
                    messagem = `Ocorreu um erro durante o registro : ${error.message} e ${error.code}`;
                    return dispatch(confirmCodeAuxError(messagem))
                }
            });
    }
}

export const confirmCodeAux = (user, message) => {
    return {
        type: types.PHONE_CONFIRM_CODE,
        user,
        message,
    }
}

export const confirmCodeAuxError = (message) => {
    return {
        type: types.PHONE_CONFIRM_CODE_ERROR,
        message,
    }
}

// essa funcao seta o status do user como autenticado
export function setUserStatePhone(user, message) {
    var messagem = "Código confirmado! Seja muito bem vindo(a) ào Buscoll."
    return dispatch => {
        newUser = user.toJSON();
        dispatch(setUserStatePhoneAction(newUser, messagem));
    }
}

export const setUserStatePhoneAction = (user, message) => {
    return {
        type: types.PHONE_SEND_CODE,
        user,
        message,
    }
}

// essa funcao reseta todos os estados, para o caso do log out.

const navigateAction = NavigationActions.navigate({
    routeName: 'PhoneSignUpScreen',

    action: NavigationActions.navigate({ routeName: 'PhoneSignUpScreen' })
});

export function resetPhoneAuthStatus() {
    return dispatch => {
        dispatch(loading_LogOutAction(true));
        firebase.auth().signOut().
            firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                    dispatch(resetPhoneAuthStatusAction());
                    this.props.navigation.dispatch(navigateAction);
                } else {
                    firebase.auth().signOut().catch(
                        (error) => Alert.alert('nao foi possivel deslogar o usuario. Verifique sua conexao com a internet e tente novamente')
                    );
                }
            });
    }
}

const loading_LogOutAction = (loading_LogOut) => {
    return {
        type: types.LOADING_LOGOUT,
        loading_LogOut,
    }
}

export const resetPhoneAuthStatusAction = () => {
    return {
        type: types.PHONE_SEND_CODE,
        user: null,
        message: "",
        codeInput: "",
        phoneNumber: "+55",
        confirmResult: null,
        loading_LogOut: false,
    }
}