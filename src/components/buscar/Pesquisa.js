import React from 'react';
import {
  StyleSheet, Platform, Image, Text,
  View, ScrollView, SafeAreaView, TextInput,
  StatusBar, Dimensions
} from 'react-native';

//importando icones
import Icon from 'react-native-vector-icons/Ionicons';
import Estilos from '../../estilos/EstPesquisa';

import LogoArea from './logoArea';
//importando dimensoes
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../../constants/index';

HEADER_MAX_HEIGHT = 100;
HEADER_MIN_HEIGHT = 50;
LOGO_MAX_HEIGHT = 150;
LOGO_MIN_HEIGHT = 70;

export default class Pesquisa extends React.Component {
  constructor() {
    super();
    this.state = {
      // firebase things?
    };
  }

  render() {
    return (
          <View style={Estilos.viewInner03} >
            <Icon name='ios-search' size={20} style={Estilos.iconePesquisa} />
            <TextInput
              underlineColorAndroid='transparent'
              placeholder='Pesquisar ... '
              placeholderTextColor='grey'
              style={Estilos.pesquisa}
              autoFocus={false}
            />
          </View>
    );
  }
}
