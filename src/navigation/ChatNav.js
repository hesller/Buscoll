/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";
import { connect } from 'react-redux';
import NavigationServices from '../components/utilities/NavigationServices'

import Friendlist from "../screens/chatcomps/Friendlist";
import ChatRoom from "../screens/chatcomps/ChatRoom";
import GloChat from "../screens/chatcomps/GloChat";
import EditarNome from '../screens/chatcomps/EditarNome';
import AdminPainel from '../screens/chatcomps/AdminPainel';
import PhoneSignUpScreen from '../screens/PhoneSignUp';
import ChatPrincipal_Screen from '../screens/chatcomps/Principal_Screen';
import AdicionarContatos from '../screens/chatcomps/AdicionarContatos';
import Contatos from '../screens/chatcomps/Contatos';

import { StackNavigator, createStackNavigator, } from "react-navigation";
import firebase from "react-native-firebase";

import { store } from '../redux/store';
import colors from "../colors";



class Home extends Component {
  constructor() {
    super();
    this.state = {
      page: "connection",
      loading: true,
      authenticated: false,
      userRegistered: null,
    };
  }

  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#16a085",
      elevation: null
    },
    header: null
  };

  componentDidMount() {
    this.authStatus = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.messaging().requestPermission();
        firebase.messaging().subscribeToTopic("chat");
        this.setState({ loading: false, authenticated: true });
      } else {
        firebase.messaging().unsubscribeFromTopic("chat");
        this.setState({ loading: false, authenticated: false });
      }
    });
  }

  componentWillMount() {

    if (store.getState().phoneSendCode.user) {
      firebase.messaging().requestPermission();
      firebase.messaging().subscribeToTopic("chat");
      this.setState({ loading: false, authenticated: true, userRegistered: store.getState().phoneSendCode.user });
    } else {
      firebase.messaging().unsubscribeFromTopic("chat");
      this.setState({ loading: false, authenticated: false, userRegistered: null });
    }

  }

  componentWillUnmount() {
    this.authStatus();
  }

  render() {
    const { authenticated, userRegistered } = this.state;
    //if (this.state.loading) return null; // Render loading/splash screen etc
    return (
      <View style={{ flex: 1 }} >
        {userRegistered ?
          <ChatPrincipal_Screen navigation={this.props.navigation} />
          :
          <PhoneSignUpScreen navigation={this.props.navigation} />
        }
      </View>
    );
  }
}

const Root = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home"
    }
  },
  PhoneSignUpScreen: {
    screen: PhoneSignUpScreen,
    navigationOptions: {
      title: "SignUp"
    }
  },
  ChatPrincipal_Screen: {
    screen: ChatPrincipal_Screen,
    navigationOptions: {
      header: null,
    }
  },
  GloChat: {
    screen: GloChat,
    navigationOptions: {
      title: "GloChat"
    }
  },
  Friendlist: {
    screen: Friendlist,
    navigationOptions: {
      title: "Friendlist"
    }
  },
  AdicionarContatos: {
    screen: AdicionarContatos,
    navigationOptions: {
      title: "AdicionarContatos"
    }
  },
  Contatos: {
    screen: Contatos,
    navigationOptions: {
      title: "Contatos"
    }
  },
  ChatRoom: {
    screen: ChatRoom,
  },
  EditarNome: {
    screen: EditarNome,
    navigationOptions: {
      title: "Editar Nome",
      headerStyle: {
        backgroundColor: colors.maincolor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.white,
      },
    }
  },
  AdminPainel: {
    screen: AdminPainel,
    navigationOptions: {
      title: "Painel Administrador",
      headerStyle: {
        backgroundColor: colors.maincolor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.white,
      },
    }
  },

}, {
    initialRouteName: 'Home'
  }
);

class ChatTabNavigator extends Component {
  render() {
    return (
      <Root
        ref={navigatorRef => {
          NavigationServices.setTopLevelNavigator(navigatorRef);
        }}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatTabNavigator);
