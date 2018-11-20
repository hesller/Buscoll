import React, { PureComponent } from 'react';
import { Text, View, ScrollView, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { ActionCreators } from '../redux/actions/';
import Spinner from 'react-native-loading-spinner-overlay';

import ListaCategorias from '../components/categorias/Categorias';
import Colors from '../colors'
import { connect } from 'react-redux';

class Categorias extends PureComponent {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  _keyExtractor = (item, index) => index;

  _renderCards(dados) {
    return (
      <ListaCategorias
        titulo={dados.item.value.nome}
        imageUri={{ uri: dados.item.value.url}}
        descricao={dados.item.value.descricao}
    />
    )
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
        <Spinner
          visible={this.props.isLoading}
          textContent={this.props.loadingMessage}
          textStyle={{ color: '#FFF' }}
          overlayColor='rgba(34, 150, 243, 0.98)'
        />
        <Text style={estilos.tituloTodasCategorias} >Todas as Categorias</Text>
        <FlatList
          data={this.props.categories}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderCards}
          initialNumToRender={9}
        />
      </View>
    );
  }
}

const estilos = StyleSheet.create({
  tituloTodasCategorias: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: Colors.white,
    backgroundColor: Colors.maincolor,
    paddingVertical: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    categories: state.perfilReducer.categories,
    isLoading: state.categoriesReducer.isLoading,
    loadingMessage: state.categoriesReducer.message,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => { dispatch(ActionCreators.fetchCategories()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categorias)
