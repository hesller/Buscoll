import firebase from 'react-native-firebase';
import * as types from './types';

export function EmailPassSignUpFistore(emailComing, passwordComing, nameComing) {
    var email = emailComing;
    var password = passwordComing;
    var name = nameComing;
    return (dispatch) => {
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password).then((user) => {

            // firebase firestore escrevendo
            var userLoaded = firebase.auth().currentUser;
            var userDocId = String(userLoaded.uid);

            Alert.alert('this is the info created: ' + userDocId);
            firebase.firestore().collection('users').doc(userDocId).set({
                email: userLoaded.email,
                uid: userLoaded.uid,
            }).then(function () {
                Alert.alert("Document successfully written!");
            }).catch(function (error) {
                console.error("Error writing document to database: ", error);
            });
            //var userLoaded = firebase.auth().currentUser;
            dispatch(EmailPassSignUpUpdateStoreStatus(userLoaded));
            // ====================
        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('Senha muito fraca.');
            } else {
                alert(errorMessage);
            }
        });

    }
}

export function setUserDetails(userDetails) {
    return saveUserDetailsToFirestore(userDetails);

}

export function saveUserDetailsToFirestore(userDetails) {
    var userDbId = userDetails.uid;
    return dispatch => {
        firebase.firestore().collection('users').doc('userDbId').set(userDetails);
        dispatch(EmailPassSignUpUpdateStoreStatus(userDetails))
    }
}

export function EmailPassSignUpUpdateStoreStatus(userDetails) {
    return {
        type: types.EMAIL_PASS_SIGNUP,
        uid: userDetails.uid,
        name: userDetails.name || '',
        email: userDetails,
        profilePic: userDetails.profilePic || '',
        phoneNumber: userDetails.phoneNumber || '',
    }
}
