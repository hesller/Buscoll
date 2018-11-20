import React, { Component } from 'react'
import {
    Text,
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { SearchBar } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import Listagem02 from '../components/buscar/Listagem02';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { connect } from 'react-redux';
import colors from '../colors';
import _ from 'lodash';
import { SCREEN_WIDTH } from '../constants';
import { ActionCreators } from '../redux/actions'

const KEYS_TO_FILTERS = ['nome', 'keywords','bairro']

class SpecificCategory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titulo: this.props.navigation.state.params.titulo,
            focus: '',
            query: '',
            queriedData: '',
            isSearching: false,
            bigFuckingArray: [],
        }


        // Fires while transition is happening
        props.navigation.addListener('willFocus', () => {
            this.setState({ focus: 'willFocus' });
        });

        // Fires after transition is complete
        props.navigation.addListener('didFocus', () => {
            this.setState({ focus: 'didFocus' });
        });

    }

    componentDidMount() {
        if (this.props.adsList == null) {
            this.props.fetchCategories();
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: String(navigation.state.params.titulo),
            params: navigation.state.params,
            headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colors.white },
            headerStyle: {
                backgroundColor: colors.maincolor,
            },
        }
    }

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

    _keyExtractor = (item, index) => item.id;

    renderCard(dados) {
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

    queryFunction = (dados, query) => {
        if (dados.nome.includes(query) || dados.keywords.includes(query) || dados.bairro.includes(query)) {
            return true
        }

        return false
    }

    renderHeader = (data) => {
        const todosOsDados = data;
        return (
            <SearchInput
                onChangeText={(text) => {
                    if (text.length >= 1) {
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
                    width: SCREEN_WIDTH,
                }}
                placeholder="Pesquisar..."
                fuzzy={true}
            />
        )
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "80%",
                    backgroundColor: "#CED0CE",
                    marginHorizontal: "10%"
                }}
            />
        );
    };

    render() {
        const filteredAds = this.props.allAds.filter(createFilter(this.state.query, KEYS_TO_FILTERS));

        const category = this.state.titulo;
        if (this.state.focus == 'willFocus') {
            return (
                <View style={{
                    flex: 1,
                    backgroundColor: colors.maincolor,
                    alignContent: 'center',
                    justifyContent: 'center'
                }} >
                    <ActivityIndicator size="large" color='white' />
                </View>
            )
        } else {
            return (
                <View style={styles.wrapper} >
                    {
                        this.props.adsList == null ?
                            <View>
                                <Text style={styles.text} >Carregando lista...</Text>
                                <Text style={styles.text} >Caso demore bastante,</Text>
                                <Text style={styles.text} >Verifique sua conexão com a internet. ^^</Text>
                            </View>
                            :
                            this.props.adsList[category].length == 0 ?
                                <View>
                                    <Text style={styles.text} >Ainda não há ofertas</Text>
                                    <Text style={styles.text} >cadastradas nesta categoria.</Text>
                                    <Text style={styles.text} >Volte em breve. ^^ </Text>
                                </View>
                                :
                                <View>
                                    {
                                        this.state.isSearching ?
                                            <FlatList
                                                keyExtractor={this._keyExtractor}
                                                showsVerticalScrollIndicator={false}
                                                data={filteredAds}
                                                renderItem={({ item }) => this.renderCard(item)}
                                                ListHeaderComponent={this.renderHeader(filteredAds)}
                                                ItemSeparatorComponent={this.renderSeparator}
                                            />
                                            :
                                            <FlatList
                                                initialNumToRender={6}
                                                keyExtractor={this._keyExtractor}
                                                showsVerticalScrollIndicator={false}
                                                data={this.props.adsList[category]}
                                                renderItem={({ item }) => this.renderCard(item)}
                                                ListHeaderComponent={this.renderHeader(this.props.adsList[category])}
                                                ItemSeparatorComponent={this.renderSeparator}
                                            />
                                    }
                                </View>
                    }
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    text: {
        alignSelf: 'center',
        paddingTop: 20,
        fontSize: 18,
    }
})

const mapStateToProps = (state) => {
    return {
        adsList: state.buscarReducer.adsList,
        allAds: state.buscarReducer.allAds,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => { dispatch(ActionCreators.fetchCategories()); },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SpecificCategory)
