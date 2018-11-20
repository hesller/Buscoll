import React, {PureComponent} from 'react';
import {
    StyleSheet, Platform, Image, Text,
    View, ScrollView, SafeAreaView, TextInput,
    StatusBar, Dimensions
} from 'react-native';

//importando icones
import Icon from 'react-native-vector-icons/SimpleLineIcons';

//imoprtando cores
import Colors from '../../colors';
import { SCREEN_WIDTH } from '../../constants';

var { height, width } = Dimensions.get('window');

export default class CartaoCategorias extends PureComponent {
    constructor() {
        super();
        this.state = {
            // firebase things?

        };
    }
    render() {
        return (
            <View style={estilos.card}>

                <Image
                    source={this.props.imageUri}
                    style={estilos.image}
                />
                <Text style={estilos.categoriaTitulo} >
                    {this.props.titulo}
                </Text>
                <View style={estilos.viewText}>
                    <Text>
                        {this.props.descricao}
                    </Text>
                </View>
                <Icon name='arrow-right' size={20} style={estilos.icone} />

            </View >
        );
    }
}

const estilos = StyleSheet.create({
    card: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: 80,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderColor: Colors.gray,
        backgroundColor: 'white',
        elevation: 1,
    },
    viewImage: {
        flex: 1.2,
        padding: 10,
    },
    image: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        top: 15,
        left: 10,
    },
    categoriaTitulo: {
        fontSize: 20,
        fontWeight: '400',
        color: Colors.black,
        position: 'absolute',
        left: 70,
        top: 5,
    },
    viewText: {
        flex: 1,
        paddingTop: 30,
        paddingLeft: 70,
    },
    icone: {
        color: Colors.blue03,
        alignSelf: 'center',
        right: 10,
    },
});
