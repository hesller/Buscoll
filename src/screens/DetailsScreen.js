import React, { Component } from 'react';
import {
    View,
    Text,
    Button,
    Dimensions,
    ScrollView,
    ActivityIndicator,
    Image,
} from 'react-native';
import colors from '../colors'
import BasicCardImg from "../components/Cartoes/basicImgCard";
import estilos from "../estilos/restDetail";
import CardPriced from '../components/Cartoes/CardPriced';
import MenuImg from '../components/utilities/menuImg';
import ContactInfo from '../components/utilities/ContactInfo';

var { SCREEN_HEIGHT, SCREEN_WIDTH } = Dimensions.get('window');

export default class DetailsScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nome: this.props.navigation.state.params.nome,
            endereco: this.props.navigation.state.params.endereco,
            bairro: this.props.navigation.state.params.bairro,
            numero: this.props.navigation.state.params.numero,
            cidade: this.props.navigation.state.params.cidade,
            estado: this.props.navigation.state.params.estado,
            telefone: this.props.navigation.state.params.telefone,
            keywords: this.props.navigation.state.params.keywords,
            imagemCapa: this.props.navigation.state.params.imagemCapa,
            imagemCatalogo: this.props.navigation.state.params.imagemCatalogo,
            imagemAmbiente: this.props.navigation.state.params.imagemAmbiente,
            mapa: this.props.navigation.state.params.mapa,
            horario: this.props.navigation.state.params.horario,
            focus: '',
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

    static navigationOptions = ({ navigation }) => {
        return {
            title: String(navigation.state.params.nome),
            params: navigation.state.params,
            headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colors.white },
            headerStyle: {
                backgroundColor: colors.maincolor,
            },
        }
    }

    componentWillMount() {
        
    }
    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() {
        const { nome, endereco, bairro, numero,
                cidade, telefone, keywords, 
                imagemCapa, imagemCatalogo, horario
                } = this.state;

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
                <ScrollView>
                    <BasicCardImg
                        nome={nome}
                        sourceImage={imagemCapa}
                        estiloImagem={estilos.imagem}
                        estiloTitulo={estilos.estiloTitulo}
                        gradientColor={estilos.gradient.color}
                        gradientStyle={estilos.gradientStyle}
                    />

                    <ContactInfo
                        telefone={telefone}
                        endereco={endereco}
                        numero={numero}
                        bairro={bairro}
                        cidade={cidade}
                        keywords={keywords}
                        horario={horario}
                        lat={this.state.mapa.lat}
                        lng={this.state.mapa.lng}
                    />

                    <MenuImg 
                        imagemCatalogo={this.state.imagemAmbiente}
                        titulo={this.state.nome}
                        tituloCartao='Imagens do Local'
                    />
                    
                    <MenuImg 
                      imagemCatalogo={this.state.imagemCatalogo}
                      titulo={this.state.nome}
                      tituloCartao={'Produtos/Serviços'}
                    />

                </ScrollView>
            );
        }
        
    }
}