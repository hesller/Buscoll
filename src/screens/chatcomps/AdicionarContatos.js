import React, { Component } from 'react'
import { Text, View, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { ActionCreators } from '../../redux/actions';
import { store } from '../../redux/store';

class AdicionarContatos extends Component {
  render() {
    return (
      <View>
        <TextInput
          placeholder={'digite aqui o número do celular'}
          onChangeText={(text) => this.props.modificarNumCelular(text) }
          value={this.props.contato}
        />
        <Button title='Adicionar' onPress={() =>{ this.props.consultarUsuario(this.props.contato)}} />
      </View>
    )
  }
};

const mapStateToProps = (state) => {
    return {
        contato: state.appReducer.contato,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        modificarNumCelular: (text) => {dispatch(ActionCreators.modificarNumCelular(text))},
        adicionarContato: (phoneNumber) => {dispatch(ActionCreators.adicionarContato(phoneNumber))},
        consultarUsuario: (phoneNumber) => {dispatch(ActionCreators.consultarUsuarioPeloNumeroCelular(phoneNumber))},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdicionarContatos);
