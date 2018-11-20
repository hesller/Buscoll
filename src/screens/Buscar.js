import React from 'react';
import {
  StyleSheet, Platform, Text,
  View, StatusBar, FlatList,
  ActivityIndicator, Animated,
  Easing, Image, YellowBox, Button, 
  TouchableHighlight, Linking
} from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash'
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'react-native-firebase';
import SearchInput, { createFilter } from 'react-native-search-filter';
//console.disableYellowBox = true
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated'])
//importando icones
import ListaCategorias from '../components/categorias/Categorias';

// importando componente Categorias & Listagens
import Listagem02 from '../components/buscar/Listagem02'
import Listagem from '../components/buscar/Listagem';
import TituloCategoria from '../components/buscar/TituloCategoria';
import CarouselSnap from '../components/utilities/CarouselSnap';

//importando estilos
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants/index';
import colors from '../colors/index';

// importando arquivos relacionados ao redux
import { ActionCreators } from '../redux/actions';

// importando appcenter features 
import Crashes from 'appcenter-crashes';
import Analytics from 'appcenter-analytics';
import Appcenter from 'appcenter';

const KEYS_TO_FILTERS = ['nome', 'keywords','bairro']
const SIZE = 100;

// =========================================
//       iniciando comp principal
class Buscar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.fetchingCategories = null;
    this.listener = null;
    this.state = ({
      playBack: false,
      playBack02: false,
      scrollY: new Animated.Value(0),
      backgroundAnimation: new Animated.Value(0),
      buttonDisactivated: false,
      isActionButtonVisible: true,
      displayBottonSubMenu: false,
      loading: true,
      query: '',
      queriedData: '',
      isSearching: false,
      bigFuckingArray: [],
    })
  }

  nativeCrash() {
    Crashes.generateTestCrash();
  }

  jsCrash() {
    throw new Error('this is a javascript crash!');
  }

  componentWillMount() {
    // listening for changes in categories
    this.props.fetchCategories();
  }

  contactBuscoll = (text, phoneNumber) => {
    Linking.openURL(`whatsapp://send?text=${text}&phone=55${phoneNumber}`);
   }

  async componentDidMount() {
    var anotherValue = 0;

    if (this.props.categories === null) {
      return this.props.fetchCategories();
    } 
    
    this.fetchingCategories = firebase.firestore().collection('listacategorias').doc('lista').onSnapshot(querySnapshot => {
      return this.props.fetchCategories();
    });

    // listener to enable and disable the buttons
    this.listener = this.state.scrollY.addListener(({ value }) => {
      if (value - anotherValue >= 100 && this.state.buttonDisactivated === false) {
        this.setState({ buttonDisactivated: true })
      } else if (value - anotherValue < 100 && this.state.buttonDisactivated === true) {
        this.setState({ buttonDisactivated: false })
      }
    })
    // firebase things
    this.startHeaderHeight = 80;
    if (Platform.OS == 'android') {
      this.startHeaderHeight = 80 + StatusBar.currentHeight;
    }
    // background color animation
    this.runAnimation();
    await this.props.adsFeatured;
  }

  componentWillReceiveProps(nextProps) {
    nextProps.foodData;
    nextProps.categories;
    nextProps.loadingAds;
    nextProps.adsFetched;
    nextProps.adsFeatured;
  }

  componentWillUnmount() {
    //this.state.scrollY.removeAllListeners;
    this.listener();
    this.fetchingCategories();
  }

  runAnimation() {
    this.state.backgroundAnimation.setValue(0);
    Animated.timing(this.state.backgroundAnimation, {
      toValue: 100,
      duration: 12000,
    }).start(() => this.runAnimation());
  }

  _keyExtractor = (item, index) => item.telefone;
  _keyExtractor2 = (item, index) => {item.key};

  sendToDetailsScreen(dados) {
    return () => this.props.navigation.navigate('DetailsScreen',
      {
        nome: dados.nome,
        endereco: dados.rua,
        bairro: dados.bairro,
        numero: dados.numero,
        cidade: dados.cidade,
        estado: dados.estado,
        telefone: dados.telefone,
        keywords: dados.keywords,
        imagemCapa: dados.imagemCapa,
        imagemCatalogo: dados.imagemCatalogo,
        imagemAmbiente: dados.imagemAmbiente,
        mapa: dados.mapaLatLng,
        horario: dados.horario,
      });
  }

  renderCard(dados) {
    if (dados.categoria == "Comidas & Bebidas" && dados.destaque == true) {
      return (
        <Listagem
          imageUri={{ uri: dados.imagemCapa[0] }}
          restTitulo={dados.nome}
          restDescricao={dados.keywords}
          telefone={dados.telefone}
          onPress={this.sendToDetailsScreen(dados)}
        />
      );
    }
  }

  renderCardUtilidades(dados) {
    if (dados != null) {
      if (dados.destaque == true) {
        return (
          <Listagem
            key={dados.telefone}
            imageUri={{ uri: dados.imagemCapa[0] }}
            restTitulo={dados.nome}
            restDescricao={dados.keywords}
            telefone={dados.telefone}
            onPress={this.sendToDetailsScreen(dados)}
          />
        );
      }
    }
  }

  mode = new Animated.Value(0);

  _renderCategories(dados) {
    if (dados.index <= 3) {
      return (
        <ListaCategorias
          titulo={dados.item.value.nome}
          imageUri={{ uri: dados.item.value.url }}
          descricao={dados.item.value.descricao}
        />
      )
    } else {
      return null
    }
  }

  renderCardsSearched(dados) {
    console.log(dados);
    return (
      <Listagem02
        imageUri={{ uri: dados.imagemCapa[0] }}
        restTitulo={dados.nome}
        restDescricao={dados.keywords}
        telefone={dados.telefone}
        onPress={this.sendToDetailsScreen(dados)}
      />
    );
  }

  render() {
    
    const filteredAds = this.props.allAds.filter(createFilter(this.state.query, KEYS_TO_FILTERS));
    const { loading } = this.props;

    return (
      <View style={{
        flex: 1,
        position: 'relative'
      }} >
        <StatusBar
          hidden={true}
          backgroundColor="#2296f3"
          barStyle="light-content"
        />
        <Spinner
          visible={loading}
          textContent={"Conectando-se com a internet..."}
          textStyle={{ color: '#FFF' }}
          overlayColor='rgba(16, 82, 135, 0.75)'
        >
        </Spinner>
        <Image
          resizeMode='cover'
          source={require('../imgs/multiLogo.png')}
          style={{ flex: 1, position: 'absolute', height: '100%', width: '100%' }}

        />
        <SearchInput
          onChangeText={(text) => {
            if(text.length >= 1) {
              this.setState({ isSearching: true, query: text });
            } else {
              this.setState({ isSearching: false, query: '', })
            }
          }}
          style={{ 
            paddingLeft: 20, 
            paddingVertical: 10, 
            borderColor: colors.maincolor, 
            borderWidth: 1,
            backgroundColor: colors.white,
          }}
          placeholder="Pesquisar..."
          fuzzy={true}
        />

        {
          this.state.isSearching ?
            <FlatList
              keyExtractor={this._keyExtractor}
              showsVerticalScrollIndicator={false}
              data={filteredAds}
              renderItem={({ item }) => this.renderCardsSearched(item)}
            />
            :
            <Animated.ScrollView
              scrollEventThrottle={16}
              style={[estilos.viewBody]}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                { useNativeDriver: true }
              )}
            >
              <CarouselSnap 
                autoplay={true} 
                title={'Destaques da Semana'} 
              />
              <View style={{ flex: 1, marginVertical: 40 }} >
                <FlatList
                  initialNumToRender={4}
                  keyExtractor={this._keyExtractor2}
                  data={this.props.categories}
                  renderItem={this._renderCategories}
                />
                <TouchableHighlight 
                  style={{ marginHorizontal: 20, marginTop: 40, paddingVertical: 10, backgroundColor: "#841584" }}
                  onPress={() => {
                    return this.contactBuscoll(
                      'Olá Buscoll, gostaria de anúnciar minha empresa no seu app!',
                      '98981844121'
                    );
                  }}
                >
                  <Text 
                    style={{ fontSize: 15, fontWeight: '600', alignSelf: 'center', color: 'white'}} 
                  >ANUNCIE SUA EMPRESA, CLIQUE AQUI!</Text>
                </TouchableHighlight>

                <TouchableHighlight 
                  style={{ marginHorizontal: 20, marginTop: 40, paddingVertical: 10, backgroundColor: "#841584" }}
                  onPress={() => { return this.jsCrash();}}
                >
                  <Text 
                    style={{ fontSize: 15, fontWeight: '600', alignSelf: 'center', color: 'white'}} 
                  >JS Crash!</Text>
                </TouchableHighlight>

                <TouchableHighlight 
                  style={{ marginHorizontal: 20, marginTop: 40, paddingVertical: 10, backgroundColor: "#841584" }}
                  onPress={() => { return this.nativeCrash();}}
                >
                  <Text 
                    style={{ fontSize: 15, fontWeight: '600', alignSelf: 'center', color: 'white'}} 
                  >Native crash!</Text>
                </TouchableHighlight>

                <TouchableHighlight 
                  style={{ marginHorizontal: 20, marginTop: 40, paddingVertical: 10, backgroundColor: "#841584" }}
                  onPress={() => {
                    alert('track event pressed!');
                    return Analytics.trackEvent('cliquei no botão', { 
                    tipo: 'touchable highlight',
                    motivo: 'fazer um teste'
                  });
                }}
                >
                  <Text 
                    style={{ fontSize: 15, fontWeight: '600', alignSelf: 'center', color: 'white'}} 
                  >trackevent</Text>
                </TouchableHighlight>
              </View>

              <View style={{ flex: 1, marginTop: 20, marginHorizontal: 20 }} >
                <TituloCategoria titulo='Comidas & Bebidas' />
                {!this.props.loadingAds ?
                  //<CarouselSnap autoplay={false} title={'Comidas & Bebidas'} />
                  <FlatList
                    initialNumToRender={3}
                    keyExtractor={this._keyExtractor}
                    data={this.props.adsFetched['Comidas & Bebidas']}
                    renderItem={({ item }) => this.renderCard(item)}
                  />
                  :
                  <View style={{ width: SCREEN_WIDTH * 0.85, height: 200 }} >
                    <Text style={{ paddingTop: 30, margin: 20, alignSelf: 'center' }} >CARREGANDO DADOS...</Text>
                    <Text style={{ alignSelf: 'center' }} >caso demore muito,</Text>
                    <Text style={{ alignSelf: 'center' }} >Por favor verifique sua conexao com a internet</Text>
                    <ActivityIndicator size="large" color={colors.tabIconSelected} />
                  </View>
                }
              </View>

              <View style={{ flex: 1, marginTop: 20, marginHorizontal: 20 }} >
                <TituloCategoria titulo='Utilidades em Geral' />

                {this.props.loadingAds == false ?
                  <FlatList
                    initialNumToRender={3}
                    keyExtractor={this._keyExtractor}
                    data={this.props.adsFetched['Utilidades em Geral']}
                    renderItem={({ item }) => this.renderCardUtilidades(item)}
                  />
                  :
                  <View style={{ width: SCREEN_WIDTH * 0.85, height: 200 }} >
                    <Text style={{ paddingTop: 30, margin: 20, alignSelf: 'center' }} >CARREGANDO DADOS...</Text>
                    <Text style={{ alignSelf: 'center' }} >caso demore muito,</Text>
                    <Text style={{ alignSelf: 'center' }} >Por favor verifique sua conexao com a internet</Text>
                    <ActivityIndicator size="large" color={colors.tabIconSelected} />
                  </View>
                }
              </View>
            </Animated.ScrollView>
        }
      </View>
    );
  }
}



const estilos = StyleSheet.create({
  safeArea: {
    flex: 1
  },
  wrapperPesquisa: {
    width: SCREEN_WIDTH,
    backgroundColor: 'white',
  },
  viewBody: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  imageWrapper: {
    height: 40,
    width: SCREEN_WIDTH,
    position: 'relative',
    alignSelf: 'center',
    elevation: 7,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
  }
});

const mapStateToProps = (state) => {
  return {
    isFetching: state.listenFirebase.isFetching,
    loading: state.buscarReducer.loading,
    categories: state.perfilReducer.categories,
    loadingAds: state.buscarReducer.loadingAds,
    adsFetched: state.buscarReducer.adsList,
    adsFeatured: state.buscarReducer.featuredAds,
    allAds: state.buscarReducer.allAds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //listeneningFirebase: () => { dispatch(ActionCreators.dispListenFirebase()); },
    fetchCategories: () => { dispatch(ActionCreators.fetchCategories()); },
    fetchAds: () => { dispatch(ActionCreators.getAds()); }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Buscar);


