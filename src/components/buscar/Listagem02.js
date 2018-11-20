import React from 'react';
import {
  StyleSheet, Image, Text,
  View, StatusBar, TouchableHighlight, Linking
} from 'react-native';
import PropTypes from 'prop-types';
import call from 'react-native-phone-call';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay'
import colors from '../../colors';
import { Icon } from 'react-native-elements';



//importando icones
//import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../colors';
import { SCREEN_WIDTH } from '../../constants';
import { ActionCreators } from '../../redux/actions';

class Categorias extends React.Component {
  constructor() {
    super();
    this.state = {
      // firebase things?
      myButtonOpacityCall: 1,
      myButtonOpacity: 1,
    };
  }

  makeCall() {
    const args = {
      number: this.props.telefone, // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
    }
    call(args).catch(console.error)
  }

  shareToWhatsAppWithContact = (text, phoneNumber) => {
    Linking.openURL(`whatsapp://send?text=${text}&phone=55${phoneNumber}`);
   }

  render() {
    const {loading, message} = this.props;
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

        <View style={estilos.imageWrapper} >
        <TouchableHighlight 
          onPress={this.props.onPress}
          activeOpacity={0}
          underlayColor="rgba(253,255,255,0.2)"
          
        >
          <Image
            style={estilos.imagem}
            source={this.props.imageUri}
          />
        </TouchableHighlight>
        </View>

        <View style={estilos.tituloWrapper} >
        <TouchableHighlight
          onPress={this.props.onPress}
          underlayColor="rgba(253,255,255,0.2)"
        >
          <View >
            <Text style={estilos.tituloAnuncio} >
              {this.props.restTitulo}
            </Text>
            <Text style={estilos.descricaoAnuncio} >
              {this.props.restDescricao}
            </Text>
          </View>
        </TouchableHighlight>
        </View>

        <View style={estilos.contactWrapper} >
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
                reverse={true}
                name='phone'
                type='font-awesome'
                size={25}
                color={ !this.state.myButtonOpacityCall == 1 ? colors.maincolor : colors.white}
                containerStyle={{
                  flex: 1,
                  opacity: !this.state.myButtonOpacityCall == 1 ? 1 : 0.92,
                  backgroundColor: !this.state.myButtonOpacityCall == 1 ? colors.white : colors.maincolor,
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
                reverse={true}
                name='comments'
                type='font-awesome'
                size={25}
                color={ !this.state.myButtonOpacity == 1 ? colors.maincolor : colors.white}
                containerStyle={{
                  flex: 1,
                  opacity: !this.state.myButtonOpacity == 1 ? 1 : 0.92,
                  backgroundColor: !this.state.myButtonOpacity == 1 ? colors.white : colors.maincolor,
                  borderBottomRightRadius: 5
                }}
              />
            </TouchableHighlight>
        </View>
      </View>
    );
  }
}

Categorias.propTypes = {
  onPress: PropTypes.func,
}

const estilos = StyleSheet.create({
  box: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 5,
    shadowOffset: { width: 5, height: 5 },
    width: SCREEN_WIDTH,
    height: 100,
    backgroundColor: 'white',
  },
  imageWrapper: {
    flex: 0.25,
  },
  imagem: {
    height: 80,
    width: 80,
    borderRadius: 10,
    margin: 10,
    resizeMode: 'cover',
    backgroundColor: 'transparent',
  },
  tituloWrapper: {
    flex: 0.55,
    paddingHorizontal: 10,
  },
  tituloAnuncio: {
    fontWeight: 'bold',
    fontSize: 17,
    color: Colors.black,
    paddingTop: 15,
  },
  descricaoAnuncio: {
    fontWeight: '300',
    color: Colors.black,
  },
  contactWrapper: {
    flex: 0.2,
    paddingRight: 10,
  },
  phoneIcon: {
    position: 'absolute',
    color: Colors.tabIconSelected,
  },
  telefone: {
    left: 20,
    fontSize: 15,
    fontWeight: '400',
  },
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

