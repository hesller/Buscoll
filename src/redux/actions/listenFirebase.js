import firebase from 'react-native-firebase';
import * as types from './types';


export function dispListenFirebase() {
    return (dispatch) => {
        var dados = [];

        const firestore = firebase.firestore();
        firestore.collection('Restaurantes').onSnapshot((snapshot) => {
            snapshot.forEach((docs) => {
                dados.push(docs.data());
            });
            return dispatch(listenFirebase(dados, false));
        });
    };
}

export function listenFirebase(dataReceived, isFetching) {
    return {
        type: types.LISTEN_FIREBASE,
        foodData: dataReceived,
        descricao: 'ouvindo dados vindos do Firebase Firestore',
        isFetching,
    };
}

function extractFilename(fileUrl) {
    // this gets the path of the file
    url = fileUrl;
    //this removes the anchor at the end, if there is one
    url = url.substring(0, (url.indexOf("#") == -1) ? url.length : url.indexOf("#"));
    //this removes the query after the file name, if there is one
    url = url.substring(0, (url.indexOf("?") == -1) ? url.length : url.indexOf("?"));
    //this removes everything before the last slash in the path
    url = url.substring(url.lastIndexOf("/") + 1, url.length);
    //return
    return url;
}
