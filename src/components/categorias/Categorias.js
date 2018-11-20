import React, {PureComponent} from 'react';
import {
  StyleSheet, Platform, Image, Text,
  View, ScrollView, SafeAreaView, TextInput,
  StatusBar, Dimensions, TouchableHighlight
} from 'react-native';
import NavigationServices from '../utilities/NavigationServices';
import { withNavigation } from 'react-navigation';

//importando icones
import Icon from 'react-native-vector-icons/SimpleLineIcons';

//imoprtando cores
import Colors from '../../colors';
import { SCREEN_WIDTH } from '../../constants';

var { height, width } = Dimensions.get('window');

class ListaCategorias extends PureComponent {
  constructor() {
    super();
    this.state = {
      // firebase things?

    };
  }
  render() {
    return (
      <View style={estilos.card}>
      <TouchableHighlight
        underlayColor='rgba(255,255,255,0.5)'
        onPress={() => {
          //NavigationServices.navigate('SpecificCategory', {
          this.props.navigation.navigate('SpecificCategory',
            {
              titulo: this.props.titulo,
            }
          )
        }}
      >
        <View style={estilos.wrapper}  >
          <Image
            source={this.props.imageUri}
            style={estilos.image}
          />
          <Text style={estilos.titulo} >
            {this.props.titulo}
          </Text>
          <Text style={estilos.descricao} >
            {this.props.descricao}
          </Text>
          <Icon name='arrow-right' size={20} style={estilos.icone} />
        </View>
      </TouchableHighlight>
      </View>
    );
  }
}

const estilos = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH,
    height: 80,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    marginTop: 2,
    backgroundColor: 'white',
    elevation: 2,
  },
  wrapper: {
    height: 80,
  },
  viewImage: {
    flex: 1.2,
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    top: 15,
    left: 20,
    resizeMode: 'contain',
  },
  viewText: {
    flex: 4,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  categoria: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.black,
  },
  iconeWrapper: {
    paddingLeft: 25,
    flex: 0.7,
    alignContent: 'flex-end',
    justifyContent: 'center',
  },
  icone: {
    position: 'absolute',
    right: 10,
    top: 30,
    color: Colors.blue03,
  },
  titulo: {
    position: 'absolute',
    top: 15,
    left: 80,
    fontSize: 15,
    fontWeight: '500',
    color: Colors.black,
  },
  descricao: {
    position: 'absolute',
    top: 40,
    left: 80,
  }
});

export default withNavigation(ListaCategorias)
