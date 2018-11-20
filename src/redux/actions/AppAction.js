import { Alert } from 'react-native'
import * as types from './types';
import firebase from 'react-native-firebase';
import { store } from '../store';
import _ from 'lodash';
import NavigationServices from '../../components/utilities/NavigationServices';
import { navigateToChatRoom } from '../../screens/Buscar';

export function modificarNumCelular(text) {
    return {
        type: types.MODIFICAR_CELULAR,
        contato: text,
    }
}

export function buscarUsuarioPeloNumeroCelular(phoneNumber) {

    const currentUser = firebase.auth().currentUser;
    var currentPhoneNumber = `+55${phoneNumber}`;
    
    if (currentUser) {
        return dispatch => {
            dispatch(loadingChatRoom(true, 'abrindo sala de chat...'));
            var currentUserUid = String(currentUser.uid);
            firebase.firestore().collection('users').doc(currentUserUid).collection('contatos')
                .where("phoneNumber", "==", currentPhoneNumber).get()
                .then((querySnapshot) => {
                    if (querySnapshot.docs.length == 1) { // usuario existe e vamos abrir o chat
                        var userRecord = {};
                        var promessa = new Promise(resolve => {
                            querySnapshot.forEach(doc => {
                                userRecord = {
                                    uid: doc.data().uid,
                                    name: doc.data().name,
                                    phoneNumber: doc.data().phoneNumber,
                                    photoURL: doc.data().photoURL,
                                    email: doc.data().email,
                                    title: doc.data().name,
                                };  
                            })
                            resolve(userRecord);
                        })
                        promessa.then((result) => {
                            setTimeout(() => {
                                NavigationServices.navigate('BuscouStack');
                                return result
                            }, 5000);
                        })
                        .then((result) => {
                            setTimeout(() => {
                                NavigationServices.navigate('ChatRoom', {
                                    uid: userRecord.uid,
                                    name: userRecord.name,
                                    phoneNumber: userRecord.phoneNumber,
                                    photoURL: userRecord.photoURL,
                                    email: userRecord.email,
                                    title: userRecord.title,
                                })
                            }, 1000);
                        })
                        .then(() => {
                            setTimeout(() => {
                                dispatch(loadingChatRoom(false, ''));
                            }, 500);
                        })
                    } else if (querySnapshot.docs.length >= 2) { // caso o usuario esteja duplicado...
                        return Alert.alert('Me parece que esse usuário está duplicado. Por favor nos informe deste error através da nossa central de atendimento.')
                    } else {
                        //
                        // adicionar usuario na lista de contatos
                        //
                        var userRecord = {};
                        dispatch(loadingChatRoom(true, 'Adicionando contato...'));
                        firebase.firestore().collection('users').where("phoneNumber", "==", currentPhoneNumber)
                            .get().then(function (querySnapshot) {
                                if (querySnapshot.docs.length == 1) {
                                    querySnapshot.forEach(function (doc) {
                                        userRecord = {
                                            uid: doc.data().uid,
                                            name: doc.data().name,
                                            photoURL: doc.data().photoURL,
                                            phoneNumber: doc.data().phoneNumber,
                                            email: doc.data().email,
                                        }
                                        var uidUserToAdd = String(doc.data().uid);
                                        var uidCurrentUser = String(firebase.auth().currentUser.uid);
                                        firebase.firestore().collection('users').doc(uidCurrentUser).collection('contatos').doc(uidUserToAdd).set(userRecord)
                                            .then(() => {
                                                dispatch(loadingChatRoom(true, 'O usuário foi adicionado! Abrindo sala de chat...'));
                                            })
                                            .then(() => {
                                                setTimeout(() => {
                                                    NavigationServices.navigate('BuscouStack');
                                                }, 500);
                                            })
                                            .then(() => {
                                                setTimeout(() => {
                                                    NavigationServices.navigate('ChatRoom', {
                                                        uid: userRecord.uid,
                                                        name: userRecord.name,
                                                        phoneNumber: userRecord.phoneNumber,
                                                        photoURL: userRecord.photoURL,
                                                        email: userRecord.email,
                                                        title: userRecord.title,
                                                    });
                                                }, 1200);
                                            })
                                            .then(() => {
                                                dispatch(loadingChatRoom(false, ''));
                                            })
                                            .catch(error => {
                                                Alert.alert('ocorreu um erro: ' + error.message);
                                                dispatch(loadingChatRoom(false, ''));
                                                dispatch(adicionarContatoErro());
                                            })
                                    });

                                } else if (querySnapshot.docs == 0) {
                                    Alert.alert('Este usuário não está registrado no sistema...');
                                    dispatch(loadingChatRoom(false, ''));
                                    dispatch(adicionarContatoErro());
                                }
                            })
                            .catch(error => Alert.alert(error.message))
                    }
                })
        }
    } else {
        Alert.alert(
            'Não encontramos o seu cadastro!',
            'Para acessar o chat é necessário que você faça o seu cadastro. ^^',
            [
                {
                    text: 'Fazer agora mesmo!', onPress: () => {
                        NavigationServices.navigate('PhoneSignUpFromOutside', {
                            phoneNumber: phoneNumber,
                        });

                    }
                },
                { text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
            ],
            { cancelable: false }
        );
        return {
            type: types.ADICIONAR_CONTATO,
        }
    }
}

export const loadingChatRoom = (loadingChatRoom, message) => {
    return {
        type: types.LOADING_CHATROOM,
        loadingChatRoom,
        message,
    }
}

export function consultarUsuarioPeloNumeroCelular(phoneNumber) {
    return dispatch => {

        firebase.firestore().collection('users').where("phoneNumber", "==", phoneNumber)
            .onSnapshot(function (querySnapshot) {
                if (querySnapshot.docs.length == 1) {

                    var userRecord = {};
                    querySnapshot.forEach(function (doc) {
                        userRecord = {
                            uid: doc.data().uid,
                            name: doc.data().name,
                            photoURL: doc.data().photoURL,
                            phoneNumber: doc.data().phoneNumber,
                            email: doc.data().email,
                        }

                        var uidUserToAdd = String(doc.data().uid);
                        var uidCurrentUser = String(firebase.auth().currentUser.uid);
                        firebase.firestore().collection('users').doc(uidCurrentUser).collection('contatos').doc(uidUserToAdd).set(userRecord)
                            .then(promise => {
                                alert('usuario adicionado!! Mas lembra de adicionar um loading aqui ...');
                                dispatch(adicionarContato(phoneNumber));
                            })
                            .catch(error => {
                                alert('ocorreu um erro: ' + error.message);
                                dispatch(adicionarContatoErro());
                            })
                    });
                } else if (querySnapshot.docs == 0) {
                    alert('user doesnt exist');
                    dispatch(adicionarContatoErro());
                }
            });
    }
}

export function adicionarContato(phoneNumber) {
    return {
        type: types.ADICIONAR_CONTATO,
        phoneNumber
    }
}

export function adicionarContatoErro() {
    return {
        type: types.ADICIONAR_CONTATO_ERRO,

    }
}

export const contatosUsuariosFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        let currentUserUid = String(currentUser.uid)

        firebase.firestore().collection('users').doc(currentUserUid).collection('contatos')
            .onSnapshot(querySnapshot => {
                var userContacts = [];
                querySnapshot.forEach(doc => {
                    userContacts.push(doc.data());
                    var correctOrder = _.orderBy(userContacts, ['name'], ['asc']);
                    dispatch(fechingUsers(correctOrder));
                })
            })
    }
}

export const fechingUsers = (userContacts) => {
    return {
        type: types.FETCHING_USERS,
        userContacts,
    }
}

// ACOES DO CHAT

export const getConversationList = () => {

    const currentUserInfo = {
        uid: String(store.getState().phoneSendCode.user.uid),
        name: store.getState().phoneSendCode.name,
        phoneNumber: String(store.getState().phoneSendCode.user.phoneNumber),
        email: store.getState().phoneSendCode.user.email,
        photoURL: store.getState().phoneSendCode.user.photoURL,
    };

    var listOfRecentConversations = store.getState().getConversationsListReducer.conversationsList;

    return dispatch => {
        var currentUserRef = firebase.firestore().collection('users').doc(currentUserInfo.uid);
        currentUserRef.collection('contatos').onSnapshot(querySnapshot => {
            var conversationList = []
            querySnapshot.forEach(doc => { // loop para cada contato
                currentUserRef.collection('contatos').doc(doc.data().uid).collection('ultimaMensagem').onSnapshot((docSnapshot) => {
                    docSnapshot.forEach(doc => {
                        if (doc.exists) {
                            var docContactUid = String(doc.data()._contactUid);
                            var findIndex = _.findIndex(conversationList, { _contactUid: docContactUid });
                            _.pullAt(conversationList, [findIndex])
                            conversationList.push(doc.data());
                            var correctOrder = _.orderBy(conversationList, ['createdAt'], ['desc']);
                            return dispatch(getConversationListToDisplayAction(correctOrder))
                        } else {
                            // doc.data() will be undefined in this case
                            Alert.alert("No such document!");
                        }
                    })
                })
            })
        })
    }
}

export const getConversationListToDisplayAction = (lastMsgs) => {
    return {
        type: types.GET_CONVERSATION_LIST_TO_DISPLAY,
        conversationsList: lastMsgs,
    }
}

export const getConversationListAction = (conversas, contatos) => {
    return {
        type: types.GET_CONVERSATION_LIST,
        conversas,
        contatos,
    }
}

// inside chat actions

export const sendMsgToFirebase = (messages, currentUser, contactDetails) => {
    var listaDeConversas = store.getState().getConversationsListReducer.conversationsList;
    var profilePathUrl = store.getState().perfilReducer.profUri;
    return dispatch => {
        messages.forEach(message => {
            const serverTime = firebase.firestore.FieldValue.serverTimestamp();

            //temporary adding to contacts
            firebase.firestore().collection('users').doc(contactDetails.uid)
                .collection('contatos').doc(currentUser.uid).set({
                    name: currentUser.name,
                    email: currentUser.email,
                    phoneNumber: currentUser.phoneNumber,
                    uid: currentUser.uid,
                    photoURL: currentUser.photoURL,
                })
                .then(() => { // gambi start
                    firebase.firestore().collection('users').doc(currentUser.uid)
                        .collection('contatos').doc(contactDetails.uid).collection('mensagens').add({
                            _id: serverTime,
                            text: message.text,
                            createdAt: serverTime,
                            uid: currentUser.uid,
                            user: {
                                _id: currentUser.uid,
                            },
                            currentUser,
                            contactDetails,
                            tipo: 'e',
                            _contactUid: contactDetails.uid,
                            fontWeight: 'bold'
                        })
                        .then(() => {
                            firebase.firestore().collection('users').doc(currentUser.uid)
                                .collection('contatos').doc(contactDetails.uid).collection('ultimaMensagem').doc('lastMsg').set({
                                    _id: serverTime,
                                    text: message.text,
                                    createdAt: serverTime,
                                    uid: currentUser.uid,
                                    user: {
                                        _id: currentUser.uid,
                                    },
                                    currentUser,
                                    contactDetails,
                                    tipo: 'u',
                                    _contactUid: contactDetails.uid,
                                    fontWeight: 'bold'
                                })
                        })
                        .then(() => {
                            firebase.firestore().collection('users').doc(contactDetails.uid)
                                .collection('contatos').doc(currentUser.uid).collection('mensagens').add({
                                    _id: serverTime,
                                    text: message.text,
                                    createdAt: serverTime,
                                    uid: currentUser.uid,
                                    user: {
                                        _id: currentUser.uid,
                                    },
                                    currentUser,
                                    contactDetails: {
                                        name: currentUser.name,
                                        uid: currentUser.uid,
                                        name: currentUser.name,
                                        phoneNumber: currentUser.phoneNumber,
                                        photoURL: currentUser.photoURL,
                                        email: currentUser.email,
                                    },
                                    tipo: 'r',
                                    _contactUid: currentUser.uid,
                                    fontWeight: 'bold'
                                })
                        })
                        .then(() => {
                            firebase.firestore().collection('users').doc(contactDetails.uid)
                                .collection('contatos').doc(currentUser.uid).collection('ultimaMensagem').doc('lastMsg').set({
                                    _id: serverTime,
                                    text: message.text,
                                    createdAt: serverTime,
                                    uid: currentUser.uid,
                                    user: {
                                        _id: currentUser.uid,
                                    },
                                    currentUser,
                                    contactDetails: {
                                        name: currentUser.name,
                                        uid: currentUser.uid,
                                        name: currentUser.name,
                                        phoneNumber: currentUser.phoneNumber,
                                        photoURL: currentUser.photoURL,
                                        email: currentUser.email,
                                    },
                                    tipo: 'r',
                                    _contactUid: currentUser.uid,
                                    fontWeight: 'bold'
                                })
                        })
                        .then(() => {
                            return dispatch(sendMsgOnChatAction());
                        })
                        .catch((error) => {
                            Alert.alert('houve um erro durante o envio: ', String(error.message));
                        })

                    // gambi
                })


        })
    }
}

export const sendMsgOnChatAction = () => {
    return {
        type: types.SEND_MSG,
        //mensagens,
    }
}

export const sendMsgOnChatActionError = (msg) => {
    return {
        type: types.SEND_MSG_ERROR,
        msg,
    }
}

export const getConversationHistory = (chatRef) => {

    return dispatch => {

        chatRef.orderBy('createdAt', 'desc').onSnapshot(querySnapshot => {
            var items = [];
            querySnapshot.forEach(child => {
                items.push({
                    _id: child.data()._id,
                    text: child.data().text,
                    createdAt: child.data().createdAt,
                    user: {
                        _id: child.data().uid
                        //avatar: avatar
                    }
                });
            })
            dispatch(getConversationHistoryAction(items));
        })
    }
}

export const getConversationHistoryAction = (mensagens) => {
    return {
        type: types.GET_CONVERSATION_HISTORY,
        mensagens,
    }
}

export const getAds = (listOfCategories) => {
    let allAds = [];
    let bigAdsObj = {};

    const featuredAds = [];
    var correctOrder = [];

    return dispatch => {
        listOfCategories.map((item, i) => {
            var categoriaAtual = String(item.value.nome);
            const listOfAds = [];
            firebase.firestore().collection('brasil').doc('maranhao')
                .collection('santaines').doc('santaines')
                .collection(item.value.nome).get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        if (doc.exists) {
                            const findEquals = _.find(listOfAds, { telefone: doc.data().telefone });
                            if (!findEquals) {
                                allAds.push(doc.data());
                                listOfAds.push(doc.data());
                                if (doc.data().destaqueTopo) {
                                    var objectRandom = Object.assign(
                                        {},
                                        doc.data(),
                                        {
                                            title: doc.data().nome,
                                            subtitle: doc.data().keywords,
                                            illustration: doc.data().imagemCapa[0]
                                        }
                                    )
                                    featuredAds.push(objectRandom);
                                }
                            }
                        } else {
                            // doc.data() will be undefined in this case
                            Alert.alert("No such document!");
                        }
                    })
                    const correctOrder = _.orderBy(listOfAds, ['nome'], ['asc'])
                    bigAdsObj[String(categoriaAtual)] = correctOrder;
                })
                .then(() => {
                    console.log('I am going to push to the store')
                    dispatch(getAdsAction(bigAdsObj, featuredAds.length >=2 ? false : true, featuredAds, allAds));
                })
                .catch(error => console.log(error.message))
        })

    }
}

const getAdsAction = (adsList, loadingAds, featuredAds, allAds) => {
    return {
        type: types.GET_ADS,
        adsList,
        loadingAds,
        featuredAds,
        allAds,
    }
}