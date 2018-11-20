import React, { Component } from 'react';
import { createStackNavigator} from 'react-navigation';
import DetailsScreen from '../screens/DetailsScreen';
import Buscar from '../screens/Buscar';
import Categorias from '../screens/Categorias';

import ChatNavigator from '../navigation/ChatNav';

const ChatStack = createStackNavigator({
    ChatNavigator: {
      screen: ChatNavigator,
      navigationOptions: () => ({
        header: null,
      }),
     }
  });

const BuscouNavigation = createStackNavigator({
    Buscar: {
        screen: Buscar,
        headerMode: 'none',
        navigationOptions: ({navigation}) => ({
            header: null,
        })
    },
    DetailsScreen: {
        screen: DetailsScreen,
        headerMode: 'none',
        navigationOptions: (props) => ({
            header: null,
        })
    },
    Categorias: {
        screen: Categorias,
        headerMode: 'none',
        navigationOptions: (props) => ({
            header: null,
        })
    },
    ChatStack: {
        screen: ChatStack,
        headerMode: 'none',
        navigationOptions: (props) => ({
            header: null,
        })
    },
})
  

export default BuscouNavigation;
