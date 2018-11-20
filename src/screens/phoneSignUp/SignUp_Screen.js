import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation'

import InputField from '../../components/form/InputField'
import RoundedButton from '../../components/buttons/RoudendButton'
import ConfirmCode_Screen from '../phoneSignUp/ConfirmCode_Screen';
import { ActionCreators } from '../../redux/actions'
import colors from '../../colors'
import { store } from '../../redux/store';


class SignUp_MainScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            confirmResult: this.props.confirmResult,
        }
    }

    componentWillMount() {
        this.setState({ confirmResult: this.props.confirmResult })
    }


    render() {
        const { confirmResult } = this.props;
        return (
            <View style={{ flex: 1, backgroundColor: colors.maincolor }}>
                {!confirmResult ?
                    <SignUp_MainScreen />
                    :
                    <ConfirmCode_Screen />
                }
            </View>
        );
    }
}

class SignUp_Screen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            phoneNumber: this.props.phoneNumber,
        }
    }


    signIn = (phoneNumber) => {
        //essa funcao foi movida para a acao phoneSendCode.js
        store.dispatch(ActionCreators.sendingMsgPrinc());
        var numberSent = phoneNumber
        return this.props.getPhoneAuthCode(numberSent);

    };

    confirmCode = (codeInput) => {
        var codeInputed = codeInput;
        const { confirmResult } = this.props;
        var mensagem = 'Código confirmado!!! '
        if (confirmResult && codeInputed.length) {
           return this.props.confirmCode(confirmResult, codeInput, mensagem);
        }
    };


    render() {
        const { phoneNumber } = this.state;
        const { user, confirmResult } = this.props;
        const { codeInput } = this.state;

        return (

            <View style={{ padding: 25, backgroundColor: colors.maincolor}}>
                {
                    !confirmResult ?
                        <View >
                            <InputField
                                labelText='Digite o Número de Telefone'
                                labelTextSize={14}
                                textColor={colors.white}
                                borderBottomColor={colors.white}
                                inputType="phoneNumber"
                                customStyle={{ marginBottom: 30 }}
                                onChangeText={value => this.setState({ phoneNumber: value })}
                                showCheckmark={false}
                                autoFocus={true}
                                placeholder={'Número telefone ... '}
                                value={phoneNumber}
                            />
                            <RoundedButton
                                text='Cadastrar Número'
                                textColor={colors.maincolor}
                                background={colors.white}
                                handleOnPress={() => this.signIn(phoneNumber)}
                            />
                        </View>
                        :
                        <View style={{ marginTop: 25, padding: 25, backgroundColor: colors.maincolor }}>
                            <InputField
                                labelText='Digite o código de verificação abaixo'
                                labelTextSize={14}
                                textColor={colors.white}
                                borderBottomColor={colors.white}
                                inputType="text"
                                customStyle={{ marginBottom: 30 }}
                                onChangeText={value => {
                                    this.setState({ codeInput: value });
                                }}
                                showCheckmark={false}
                                autoFocus={true}
                                placeholder={'Digite aqui o código que você recebeu, por exemplo: 9865274 '}
                                value={codeInput}
                            />
                            <RoundedButton
                                text='Confirmar Código'
                                textColor={colors.white}
                                background={colors.maincolor}
                                handleOnPress={() => this.confirmCode(codeInput)}
                            />
                        </View>
                }

            </View>
        );
    }
}

const SignUpNavigator = createStackNavigator({
    SignUp_MainScreen: {
        screen: SignUp_MainScreen
    },
    SignUp_Screen: {
        screen: SignUp_Screen,
    },
    ConfirmCode_Screen: {
        screen: ConfirmCode_Screen,
    }
}, {
        initialRouteName: 'SignUp_MainScreen'
    }
)

const mapStateToProps = (state) => {
    return {
        user: state.phoneSendCode.user,
        confirmResult: state.phoneSendCode.confirmResult,
        phoneNumber: state.phoneSendCode.phoneNumber,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPhoneAuthCode: (phoneNumber) => { dispatch(ActionCreators.phoneCode(phoneNumber)) },
        confirmCode: (confirmResult, codeInput, mensagem) => dispatch(ActionCreators.confirmCode(confirmResult, codeInput, mensagem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp_Screen);
