import { Alert, Platform } from 'react-native'
import * as types from './types';
import firebase from 'react-native-firebase';
import { store } from '../store';
import _ from 'lodash';
import { ActionCreators } from './index';
import RNFetchBlob from 'react-native-fetch-blob'

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

console.disableYellowBox = true

export function updateNameState(name) {
    return {
        type: types.NAME_STATE,
        name,
    }
}

export const updateProfileName = (name) => {
    var userUid = String(firebase.auth().currentUser.uid);

    return dispatch => {
        firebase.auth().currentUser.updateProfile({
            displayName: name
        })
            .then(() => {
                var newUser = (firebase.auth().currentUser).toJSON();
                store.dispatch(ActionCreators.setUserStatePhoneAction(newUser, 'atualizando usuario'));
                dispatch(updateToPhonSendCode(name));
                firebase.firestore().collection('users').doc(userUid).update({
                    name,
                })
                    .then(() => {
                        let message = 'Nome Atualizado com sucesso';
                        Alert.alert(message);
                        dispatch(successfulUpdated(message));
                    })
                    .catch(error => {
                        let message = `Algo deu errado, por favor verifique 
                                        sua conexão com a internet! Para saber mais informe 
                                        o código de error para nossa equipe de suporte! 
                                        Código de Erro: ${error.code}, 
                                        Mensagem: ${error.message}`;
                        Alert.alert(message)
                        dispatch(unsuccessfulUpdated(message));
                    })
            })
            .catch(error => {
                let message = `Algo deu errado, por favor verifique 
                                sua conexão com a internet! Para saber mais informe 
                                o código de error para nossa equipe de suporte! 
                                Código de Erro: ${error.code}, 
                                Mensagem: ${error.message}`;
                Alert.alert(message)
                dispatch(unsuccessfulUpdated(message));
            })
    }
}

export function updateToPhonSendCode(name) {
    return {
        type: types.UPDATE_TO_PHONESENDCODE,
        name
    }
}

export function successfulUpdated(message) {
    return {
        type: types.SUCCESSFUL_UPDATED,
        message
    }
}

export function unsuccessfulUpdated(message) {
    return {
        type: types.ERROR_WHILE_UPDATING,
        message
    }
}

export const uploadImage = (uri, imgSource, mime = 'application/octet-stream') => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            dispatch(perfilLoading(true));
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

            const sessionId = new Date().getTime();
            let uploadBlob = null;
            const currentUser = firebase.auth().currentUser.uid;
            //create a reference in firebase storage for the file
            const imageRef = firebase.storage().ref(`users/${String(currentUser)}`).child(`prof_${String(currentUser)}.jpg`);
            // encoding data with base64
            fs.readFile(uploadUri, 'base64')
                .then(data => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                // place the blob into your storage reference
                .then((blob) => {
                    uploadBlob = blob;
                    // PLACE THE LOADING ACTION HERE
                    return imageRef.put(blob._ref, { cacheControl: 'max-age=31536000', contentType: mime })
                })
                // from here you can get the download url of hte image
                // to store the reference into your database
                .then(() => {
                    uploadBlob.close()
                    return imageRef.getDownloadURL()
                })
                .then(url => {
                    resolve(url)
                    // this toreReference function is an optional helper
                    // method you can create to store a reference o the download url
                    // of the image in your database
                    firebase.auth().currentUser.updateProfile({
                        photoURL: url
                    })
                        .then(() => {
                            let message = 'upload sucessfull';
                            dispatch(perfilLoading(false))
                            dispatch(uploadingImgProf(uri, message))
                        })
                })
                .catch(error => {
                    dispatch(perfilLoading(false))
                    reject(error);
                })
        })
    }
}

export const uploadingImgProf = (profUri, message, ) => {
    return {
        type: types.UPLOAD_PROFILE_IMAGE,
        message,
        profUri,
        photoURL: profUri,
    }
}

export const updatePhoneSendCodePhoto = (user) => {
    return {
        type: types.UPDATE_PROF_PIC_DOWNLOAD_URL,
        user,
    }
}

export const perfilLoading = (loading) => {
    return {
        type: types.PERFIL_LOADING,
        loading,
    }
}

export const fetchCategories = () => {
    var categoriesOrdered = [];
    var categories = {};
    return dispatch => {
        
            firebase.firestore().collection('listacategorias').doc('lista').get()
                .then(querySnapshot => {
                    console.log(querySnapshot)
                    var queried = querySnapshot.data();
                    console.log(queried);
                    return queried;
                })
            .then((queried) => {
                var queriedKeys = Object.keys(queried)
                categories = queriedKeys.map(key => ({ key, value: queried[key] }))
                categoriesOrdered = _.orderBy(categories, ['key'], ['asc']);
                //resolve(categoriesOrdered);
                dispatch({
                    type: types.FETCH_CATEGORIES,
                    categories: categoriesOrdered,
                })
            }).then(() => {
                dispatch(ActionCreators.getAds(categories));
            })
    }
}

export const coverImage = (coverImages) => {
    return {
        type: types.COVER_IMAGES,
        coverImages,
    }
}

export const catalogImages = (catalogImages) => {
    return {
        type: types.CATALOG_IMAGES,
        catalogImages,
    }
}

export const ambienteImages = (ambienteImages) => {
    return {
        type: types.AMBIENTE_IMAGES,
        ambienteImages,
    }
}

export const mapPreview = (mapPreview) => {
    return {
        type: types.MAP_PREVIEW,
        mapPreview,
    }
}

export const registerNewBusiness = (values, mime = 'application/octet-stream') => {
    //dispatch(perfilLoading(true));
    // primeiro estou lhe dando com as imagens da capa
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    let uploadBlob02 = null;
    const uploadUriCapa = [];
    const uploadUriCatalogo = [];
    const uploadUriAmbiente = [];
    const capaDownloadURLs = [];
    const catalogoDownloadURLs = [];
    const ambienteDownloadURLs = [];
    const brazilCode = '+55';
    const categories = store.getState().perfilReducer.categories;
    let choosenCategory = '';
    const strTelefone = String(brazilCode + values.telefone.replace(/\D/g, ""));


    return dispatch => {
        return new Promise((resolve, reject) => {

            //
            //
            //  aqui eu registo as imagens da capa
            //
            //
            values.imagemCapa.map((item, i) => {
                dispatch(registerBusinessLoading(true, 'etapa 1 de 2: formatando imagens da capa...'));
                uploadUriCapa.push(Platform.OS === 'ios' ? item.sourceURL.replace('file://', '') : item.path);
                //create a reference in firebase storage for the file
                const imageRef = firebase.storage().ref(`users/${strTelefone}`).child(`prof_${String('_capa_' + i)}.jpg`);
                // encoding data with base64
                fs.readFile(item.path, 'base64')
                    .then(data => {
                        return Blob.build(data, { type: `${mime};BASE64` })
                    })
                    // place the blob into your storage reference
                    .then((blob) => {
                        uploadBlob = blob;
                        // PLACE THE LOADING ACTION HERE
                        dispatch(registerBusinessLoading(true, 'etapa 1 de 2: salvando no banco de dados...'));
                        return imageRef.put(blob._ref, { cacheControl: 'max-age=31536000', contentType: mime });
                    })
                    // from here you can get the download url of hte image
                    // to store the reference into your database
                    .then(() => {
                        uploadBlob.close();
                        dispatch(registerBusinessLoading(true, 'etapa 1 de 2: obtendo link para downloads...'));
                        return imageRef.getDownloadURL()
                    })
                    .then((url) => {
                        capaDownloadURLs.push(url);
                        resolve(url);
                    })
                    .catch(error => {
                        dispatch(registerBusinessLoading(false, ''));
                        alert('houve um erro durante o registro', error.code, ' - ', error.message)
                        reject(error);
                    })
            })
        })
            .then(() => {
                var choosenCategory = '';
                return new Promise((resolve, reject) => {
                    //
                    //
                    //  aqui eu registo as imagens do catalogo
                    //
                    //

                    values.imagemCatalogo.map((item, i) => {
                        const imageRef02 = firebase.storage().ref(`users/${strTelefone}`).child(`prof_${String('_catalogo_' + i)}.jpg`);
                        dispatch(registerBusinessLoading(true, 'etapa 2 de 2: formatando imagens da capa...'));
                        uploadUriCatalogo.push(Platform.OS === 'ios' ? item.sourceURL.replace('file://', '') : item.path);

                        //create a reference in firebase storage for the file
                        //const imageRef02 = firebase.storage().ref(`users/${String(brazilCode + values.telefone)}`).child(`prof_${String('_catalogo_' + i)}.jpg`);

                        // encoding data with base64
                        fs.readFile(item.path, 'base64')
                            .then(data => {
                                return Blob.build(data, { type: `${mime};BASE64` })
                            })
                            // place the blob into your storage reference
                            .then((blob) => {
                                uploadBlob02 = blob;
                                // PLACE THE LOADING ACTION HERE

                                dispatch(registerBusinessLoading(true, 'etapa 2 de 2: obtendo link para downloads...'));
                                return imageRef02.put(blob._ref, { cacheControl: 'max-age=31536000', contentType: mime });
                            })
                            // from here you can get the download url of hte image
                            // to store the reference into your database
                            .then(() => {
                                uploadBlob02.close();
                                return imageRef02.getDownloadURL()
                            })
                            .then((url) => {
                                catalogoDownloadURLs.push(url);
                                dispatch(registerBusinessLoading(true, 'etapa 2 de 2: salvando imagens...'));
                            })

                            //
                            //
                            //  aqui eu registro o estabelecimento
                            //
                            //
                            .then(() => {
                                categories.map((item, i) => {
                                    if (item.value.nome == values.categories) {
                                        choosenCategory = String(item.value.nome)
                                        if (values.imagemCatalogo.length == catalogoDownloadURLs.length) {
                                            resolve(choosenCategory);
                                        }
                                        return choosenCategory;
                                    }
                                })
                            })
                            .catch(error => {
                                dispatch(registerBusinessLoading(false, ''));
                                alert(`houve um erro durante o salvamento das imagens ${error.code}  -  ${error.message}`)
                                reject(error);
                            })
                    });
                })
                .then(() => {
                    return new Promise((resolve, reject) => {
                        //
                        //
                        //  aqui eu registo as imagens do Ambiente
                        //
                        //
    
                        values.imagemAmbiente.map((item, i) => {
                            const imageRef03 = firebase.storage().ref(`users/${strTelefone}`).child(`prof_${String('_ambiente_' + i)}.jpg`);
                            dispatch(registerBusinessLoading(true, 'etapa final: formatando imagens do ambiente...'));
                            uploadUriAmbiente.push(Platform.OS === 'ios' ? item.sourceURL.replace('file://', '') : item.path);
    
                            // encoding data with base64
                            fs.readFile(item.path, 'base64')
                                .then(data => {
                                    return Blob.build(data, { type: `${mime};BASE64` })
                                })
                                // place the blob into your storage reference
                                .then((blob) => {
                                    uploadBlob02 = blob;
                                    // PLACE THE LOADING ACTION HERE
    
                                    dispatch(registerBusinessLoading(true, 'etapa final: obtendo link para downloads...'));
                                    return imageRef03.put(blob._ref, { cacheControl: 'max-age=31536000', contentType: mime });
                                })
                                // from here you can get the download url of hte image
                                // to store the reference into your database
                                .then(() => {
                                    uploadBlob02.close();
                                    return imageRef03.getDownloadURL()
                                })
                                .then((url) => {
                                    ambienteDownloadURLs.push(url);
                                    dispatch(registerBusinessLoading(true, 'etapa final: salvando imagens...'));
                                    return url;
                                })
                                .then((result) => {
                                    resolve(result);
                                    dispatch(registerBusinessLoading(false, ''));
                                })
    
                                //
                                //
                                //  aqui eu registro o estabelecimento
                                //
                                //
                                /*.then(() => {
                                    categories.map((item, i) => {
                                        if (item.value.nome == values.categories) {
                                            choosenCategory = String(item.value.nome)
                                            if (values.imagemCatalogo.length == catalogoDownloadURLs.length) {
                                                resolve(choosenCategory);
                                            }
                                            return choosenCategory;
                                        }
                                    })
                                })*/
                                .catch(error => {
                                    dispatch(registerBusinessLoading(false, ''));
                                    alert('houve um erro durante o salvamento das imagens');
                                    console.log(error.code, ' - ', error.message);
                                    reject(error);
                                })
                        });
                    })
                })
                .then(() => {
                    console.log('entrie no registrando')
                    dispatch(registerBusinessLoading(true, 'etapa final: registrando...'));
                    firebase.firestore().collection('brasil').doc('maranhao')
                        .collection('santaines').doc('santaines')
                        .collection(choosenCategory).doc(strTelefone)
                        .set({
                            nome: values.nome,
                            rua: values.rua,
                            keywords: values.palavrasChave,
                            numero: values.numero,
                            bairro: values.bairro,
                            cidade: values.cidade,
                            estado: values.estado,
                            cep: values.cep,
                            categoria: choosenCategory,
                            horario: values.horario,
                            telefone: values.telefone,
                            mapaLatLng: values.map,
                            imagemCapa: capaDownloadURLs,
                            imagemCatalogo: catalogoDownloadURLs,
                            imagemAmbiente: ambienteDownloadURLs,
                            accTipo: 'business',
                            destaque: (values.destaque == 'Sim'),
                            destaqueTopo: (values.destaqueTopo == 'Sim')
                        })
                        .then(() => {
                            dispatch(registerBusinessLoading(false, ''));
                            dispatch(registerNewBusinessAction());
                            return alert('Registro Concluido com Sucesso!!')
                        })
                })
            })
            .catch(error => {
                dispatch(registerBusinessLoading(false, ''));
                alert('houve um erro durante o registro', `${error.message}`)
            })
    }
}

const registerNewBusinessAction = () => {
    return {
        type: types.REGISTER_BUSINESS
    }
}

export const registerBusinessLoading = (businessLoading, message) => {
    return {
        type: types.BUSINESS_LOADING,
        businessLoading,
        message,
    }
}