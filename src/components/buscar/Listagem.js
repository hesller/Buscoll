import React from 'react';
import {
  StyleSheet, Platform, Image, Text,
  View, Animated, SafeAreaView, TextInput,
  StatusBar, Dimensions, TouchableHighlight,
  PanResponder, Linking
} from 'react-native';
import PropTypes from 'prop-types';
import call from 'react-native-phone-call'
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay'

//importando icones
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import { Icon } from 'react-native-elements';
import colors from '../../colors'
import { SCREEN_WIDTH } from '../../constants';
import { ActionCreators } from '../../redux/actions';

class Categorias extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      myButtonOpacityCall: 1,
      myButtonOpacity: 1,
      //whatsappNumber: this.props.phoneNumber
    };
  }

  shareToWhatsAppWithContact = (text, phoneNumber) => {
    Linking.openURL(`whatsapp://send?text=${text}&phone=55${phoneNumber}`);
   }

  render() {
    const { loading, message } = this.props;
    return (
      <View style={[estilos.box]} >
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
          hidden={loading ? true : true}
        />
        <Spinner
          visible={loading}
          textContent={message}
          textStyle={{ color: '#FFF' }}
          overlayColor='rgba(16, 82, 135, 0.75)'
        >
        </Spinner>

        <View style={{ flex: 1.5, }} >
          <TouchableHighlight
            onPress={this.props.onPress}
            underlayColor="rgba(253,255,255,0.5)"
          >
            <Image
              style={estilos.imagem}
              source={this.props.imageUri}
              resizeMode='cover'
            />
          </TouchableHighlight>
        </View>

        <View style={estilos.descricaoWrapper} >
          <View style={{ flex: 0.7, }} >
            <TouchableHighlight
              onPress={this.props.onPress}
              activeOpacity={1}
              underlayColor="rgba(253,255,255,0.5)"
            >
              <View>
                <Text style={estilos.tituloAnuncio} >
                  {this.props.restTitulo}
                </Text>
                <Text style={estilos.descricaoAnuncio} >
                  {this.props.restDescricao}
                </Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={estilos.buttonsWrapper}>
            <TouchableHighlight
              underlayColor='rgba(255,255,255,0.1)'
              onPress={() => {
                this.setState({ myButtonOpacityCall: 0.5 });
                call({ number: this.props.telefone, prompt: false, }).catch(console.error);
              }}
              onPressOut={() => this.setState({ myButtonOpacityCall: 1 })}
              style={{ flex: 0.5 }}
            >
              <Icon
                name='phone'
                type='font-awesome'
                size={30}
                color={this.state.myButtonOpacityCall == 1 ? colors.maincolor : colors.white}
                containerStyle={{
                  flex: 1,
                  borderWidth: 0.5,
                  borderColor: colors.lightGray,
                  opacity: this.state.myButtonOpacityCall == 1 ? 1 : 0.92,
                  backgroundColor: this.state.myButtonOpacityCall == 1 ? colors.white : colors.maincolor,
                }}
              />
            </TouchableHighlight>

            <TouchableHighlight
              underlayColor='rgba(255,255,255,0.1)'
              onPress={() => {
                this.setState({ myButtonOpacity: 0.5 });
                return this.shareToWhatsAppWithContact(
                  'olá, eu vi seu contato no Buscoll e gostaria de: ',this.props.telefone);
              }}
              onPressOut={() => this.setState({ myButtonOpacity: 1 })}
              style={{ flex: 0.5 }}
            >
              <Icon
                name='comments'
                type='font-awesome'
                size={30}
                color={this.state.myButtonOpacity == 1 ? colors.maincolor : colors.white}
                containerStyle={{
                  flex: 1,
                  borderWidth: 0.5,
                  borderColor: colors.lightGray,
                  opacity: this.state.myButtonOpacity == 1 ? 1 : 0.92,
                  backgroundColor: this.state.myButtonOpacity == 1 ? colors.white : colors.maincolor,
                  borderBottomRightRadius: 5
                }}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

const estilos = StyleSheet.create({
  box: {
    flex: 1,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    width: SCREEN_WIDTH - 40,
    height: 260,
    marginVertical: 20,
    elevation: 2,
  },
  imagem: {
    height: 170,
    width: null,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    margin: 1,
    backgroundColor: colors.gray,
  },
  descricaoWrapper: {
    flex: 0.8,
    flexDirection: 'row',
    marginHorizontal: 1,
    backgroundColor: 'white',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 2,
  },
  tituloAnuncio: {
    fontWeight: '800',
    fontSize: 15,
    paddingTop: 5,
    paddingLeft: 8,
    color: colors.black,
  },
  descricaoAnuncio: {
    fontWeight: '300',
    paddingTop: 3,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  buttonsWrapper: {
    flex: 0.3,
    marginLeft: 5,
  },
  telefone: {
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: '400',
    position: 'absolute',
    left: 20,
    bottom: 14
  },
  heartIcon: {
    color: 'red',
    right: 10,
    position: 'absolute',
    bottom: 10
  },
  phoneIcon: {
    color: colors.tabIconSelected,
    position: 'absolute',
    left: 10,
    bottom: 10,
  },
  contactWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',

  }
});

const mapStateToProps = (state) => {
  return {
    loading: state.appReducer.loadingChatRoom,
    message: state.appReducer.message,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    buscarUsuarioPeloNumeroCelular: (telefone) => { dispatch(ActionCreators.buscarUsuarioPeloNumeroCelular(telefone)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categorias);
