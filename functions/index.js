

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const settings = {
    apiKey: 'AIzaSyA9ov-JA_ivBgW9N2XKQgo3codl-TrZaxE',
    authDomain: 'testingfirebase-65604.firebaseapp.com',
    databaseURL: 'testingfirebase-65604.firebaseio.com/', 
    storageBucket: 'gs://testingfirebase-65604.appspot.com', 
    projectId: 'testingfirebase-65604',
    messagingSenderId: '911071146048', 
    timestampsInSnapshots: true
};

if(!admin.apps.length){
    admin.initializeApp(settings);
}

admin.firestore().settings(settings);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.notifyNewMessage = functions.firestore.document('/users/{userId}/contatos/{contactId}/ultimaMensagem/lastMsg')
.onWrite((docSnapshot, context) => {
    console.log(context);
    const message = docSnapshot.after.data();
    const currentUserData = message.currentUser;
    const contactData = message.contactDetails;

    //admin.firestore().collection('users').doc(String(currentUserData.uid))
    const recipientId = message._contactUid;

    const senderName = message.currentUser.name;
    
    return admin.firestore().doc('users/' + recipientId).get().then(recipientDoc => {
        const registrationToken = recipientDoc.get('pushToken');
        const notificationBody = message['text'] === '' ? 'Você recebeu uma nova mensagem' : message['text'];
        const payload = {
            notification: {
                title: senderName + ' enviou uma mensagem.',
                body: notificationBody,
                icon: currentUserData.photoURL !== null ? currentUserData.photoURL : null,
                sound: 'default',
            },
        }
        const options = {
            priority: 'high',
        }

        return admin.messaging().sendToDevice(registrationToken, payload, options);
    });
})
