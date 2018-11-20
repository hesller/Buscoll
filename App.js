import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  ScrollView,
  AppRegistry,
  StatusBar
} from 'react-native';
import { Provider } from 'react-redux';
import { createBottomTabNavigator } from 'react-navigation';
import firebase from 'react-native-firebase';
import SplashScreen from 'react-native-splash-screen';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import NavigationService from './src/components/utilities/NavigationServices';
import type { Notification, NotificationOpen, RemoteMessage } from 'react-native-firebase';
import bgMessaging from './src/components/functions/bgMessaging';
import OneSignal from 'react-native-onesignal';
import codePush from 'react-native-code-push';


FCM = firebase.messaging();
ref = firebase.firestore().collection("users");

let codePushOptions = { checkFrequency: codePush.CheckFrequency.ON_APP_RESUME };

class Buscou extends Component {
  constructor(props) {
    super(props);

    const settings = {
      apiKey: 'AIzaSyA9ov-JA_ivBgW9N2XKQgo3codl-TrZaxE',
      authDomain: 'testingfirebase-65604.firebaseapp.com',
      databaseURL: 'testingfirebase-65604.firebaseio.com/',
      storageBucket: 'gs://testingfirebase-65604.appspot.com',
      projectId: 'testingfirebase-65604',
      messagingSenderId: '911071146048',
    };

    const settingsForFirestore = {
      timestampsInSnapshots: true,
    }

    if (!firebase.apps.length) { firebase.initializeApp(settings); }

    const firestore = firebase.firestore();
    firestore.settings(settingsForFirestore);
    firebase.firestore.setLogLevel('debug');

    this.currentUser = '';
    if (firebase.auth().currentUser) {
      this.currentUser = String(firebase.auth().currentUser.uid);
    } else {
      null
    }

    OneSignal.init("0f4bcfc2-3146-4424-bc10-7885aa610a9f");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);

    AppCenter.start(getApplication(), "{3bd75f7c-e97b-469d-8240-ed9bf3e710bd}", 
      Analytics.class, Crashes.class, Distribute.class);
  }



  componentWillMount() {
    firebase.messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          // user has permissions
        } else {
          // user doesn't have permission
          firebase.messaging().requestPermission()
            .then(() => {
              // User has authorised
            })
            .catch(error => {
              // User has rejected permissions 
            });
        }
      });
    firebase.messaging().getToken()
      .then(fcmToken => {
        if (fcmToken) {
          // user has a device token
          if(firebase.auth().currentUser) {
            firebase.firestore().collection("users").doc(this.currentUser).update({ pushToken: fcmToken });
          }
        } else {
          // user doesn't have a device token yet
        }
      });

  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
    

    this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification: Notification) => {
      // Process your notification as required
      // ANDROID: Remote notifications do not contain the channel ID. You will have to specify this manually if you'd like to re-display the notification.
     //alert(notification);
    });
    this.notificationListener = firebase.notifications().onNotification((notification: Notification) => {
      // Process your notification as required
      console.log('here is the notification', notification);
    });
    
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
      // Get the action triggered by the notification being opened
      const action = notificationOpen.action;
      // Get information about the notification that was opened
      const notification: Notification = notificationOpen.notification;
    });

    firebase.notifications().getInitialNotification()
      .then((notificationOpen: NotificationOpen) => {
        if (notificationOpen) {
          // App was opened by a notification
          // Get the action triggered by the notification being opened
          const action = notificationOpen.action;
          // Get information about the notification that was opened
          const notification: Notification = notificationOpen.notification;
        }
      });

    // token for cloud messaging
    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
      // Process your token as 
      if(firebase.auth().currentUser) {
        firebase.firestore().collection("users").doc(this.currentUser).update({ pushToken: fcmToken });
      }
      
    });
    // Listen for FCM messages
    this.messageListener = firebase.messaging().onMessage((message: RemoteMessage) => {
      // Process your message as required
      //alert(JSON.stringify(message));
      if (message.notification != null) {
        //TODO: display notification only if we are not in chat ChatStack,
        return null;
      }
    });

    // check to make sure the user is authenticated  
    this.authChanged = firebase.auth().onAuthStateChanged(user => {
      // gets the device's push token
      FCM.getToken().then(token => {
        // stores the token in the user's document
        if(firebase.auth().currentUser) {
          this.currentUser = String(firebase.auth().currentUser.uid);
          firebase.firestore().collection("users").doc(this.currentUser).update({ pushToken: token });
        }
      });
    });

  }

  componentWillUnmount() {
    this.notificationDisplayedListener();
    this.notificationListener();
    this.notificationOpenedListener();
    this.authChanged();
    this.onTokenRefreshListener();
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <StatusBar
            backgroundColor="#2296f3"
            barStyle="light-content"
          />
          <MainTabNavigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </PersistGate>
      </Provider>
    );
  }
}

Buscou = codePush(codePushOptions)(Buscou);

export default Buscou;

AppRegistry.registerComponent('Buscou', () => createBottomTabNavigator);

// New task registration
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); // <-- Add this line