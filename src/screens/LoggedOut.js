import React, { Component } from 'react';
import colors from '../colors';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    ScrollView
} from 'react-native';
import RoundedButton from '../components/buttons/RoudendButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const mapStateToProps = (state) => {
    return {};
}
const mapDispatchToProps = (dispatch) => {
    return {};
}


class LoggedOut extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
        <ScrollView style={styles.wrapper} >
            <View style={styles.welcomeWrapper} >
                <Image 
                source={require('../imgs/logo.png')} 
                style={styles.logo}
                />
                <Text style={styles.welcomeText} >Bem vindo ao Buscoll.</Text>
                <Text style={styles.welcomeSubText} >Use um dos métodos abaixo para criar sua conta.</Text>
                <RoundedButton 
                text='Cadastrar com Número do Celular'
                textColor={colors.maincolor}
                background={colors.white}
                handleOnPress={() => this.props.navigation.navigate('PhoneSignUp')}
                icon={<Icon name='phone' size={moderateScale(24,0.1)} style={styles.Icons} />}
                />
                <RoundedButton 
                text='Cadastrar com Email/Senha'
                textColor={colors.white}
                handleOnPress={() => this.props.navigation.navigate('EmailPassSignUp')}
                icon={<Icon name='envelope' size={moderateScale(24,0.1)} style={styles.Icons2} />}
                />
                <TouchableHighlight 
                 style={styles.moreOptionsButton} 
                 onPress={this.onMoreOptionsPress}
                >
                    <Text 
                        style={styles.moreOptionsButtonText} >
                        Mais Opções
                    </Text>
                </TouchableHighlight>

                <View style={styles.termsAndConditions} >
                    <Text style={styles.termsText}>
                        Clicando em Entrar usando o Facebook, Criar Conta ou mais opções, Eu concordo com os Termos e Condições de uso do aplicativo Buscou. 
                    </Text>
                    <TouchableHighlight 
                    style={styles.linkButton} >
                        <Text style={styles.termsText} >Acessar Termos e Condições</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </ScrollView>
        );
    }
}

const styles = StyleSheet.create ({
    wrapper: {
        flex: 1,
        display: 'flex',
        backgroundColor: colors.maincolor,
    },
    welcomeWrapper: {
        flex: 1,
        display: 'flex',
        marginTop: moderateScale(20, 0.2),
        padding: moderateScale(20, 0.2),
    },
    logo: {
        width: moderateScale(50,0.3),
        height: moderateScale(50,0.3),
        marginTop: moderateScale(30,0.3),
        marginBottom: moderateScale(30,0.3),
    },
    welcomeText: {
        fontSize:moderateScale(30,0.3),
        color: colors.white,
        fontWeight: '300',
        marginBottom: moderateScale(20,0.3),
    },
    welcomeSubText: {
        fontSize: moderateScale(20,0.3),
        color: colors.white,
        fontWeight: '300',
        marginBottom: moderateScale(40,0.3),
    },
    Icons: {
        color: colors.maincolor,
        position: 'relative',
        left: moderateScale(30,0.3),
        zIndex: 8,
    },
    Icons2: {
        color: colors.white,
        position: 'relative',
        left: moderateScale(30,0.3),
        zIndex: 8,
    },
    moreOptionsButton: {
        marginTop: moderateScale(15,0.3),
    },
    moreOptionsButtonText: {
        fontSize: moderateScale(16,0.3),
        color: colors.white,
    },
    termsAndConditions: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: moderateScale(30,0.3),
    },
    termsText: {
        color: 'white',
        fontSize: moderateScale(13,0.3),
        fontWeight: '300',
    },
    linkButton: {
        borderBottomWidth: moderateScale(1,0.3),
        borderBottomColor: 'white',
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoggedOut);
