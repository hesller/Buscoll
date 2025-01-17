/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, StatusBar } from "react-native";

import Login from "./chatcomps/Login";
import Boiler from "./chatcomps/Boiler";
import Friendlist from "./chatcomps/Friendlist";
import Chat from "./chatcomps/Chat";
import GloChat from "./chatcomps/GloChat";
import ForgetPassword from "./chatcomps/ForgetPassword";
import Register from "./chatcomps/Register";

import { StackNavigator } from "react-navigation";
import firebase from "react-native-firebase";

class Home extends Component<{}> {
  constructor() {
    super();
    this.state = {
      page: "connection",
      loading: true,
      authenticated: false
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
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.messaging().requestPermissions();
        firebase.messaging().subscribeToTopic("chat");
        this.setState({ loading: false, authenticated: true });
      } else {
        firebase.messaging().unsubscribeFromTopic("chat");
        this.setState({ loading: false, authenticated: false });
      }
    });
  }

  render() {
    if (this.state.loading) return null; // Render loading/splash screen etc
    if (!this.state.authenticated) {
      return <Login navigation={this.props.navigation} />;
    }
    return <Boiler navigation={this.props.navigation} />;
  }
}

export default (App = StackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: "Home"
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: "Login"
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      title: "Register"
    }
  },
  ForgetPassword: {
    screen: ForgetPassword,
    navigationOptions: {
      title: "ForgetPassword"
    }
  },
  Boiler: {
    screen: Boiler,
    navigationOptions: {
      title: "Boiler"
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
  Chat: {
    screen: Chat,
    navigationOptions: {
      title: "Chat"
    }
  }
}));

const styles = StyleSheet.create({});
