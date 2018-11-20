import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux';

import InputField from '../../components/form/InputField'
import RoundedButton from '../../components/buttons/RoudendButton'
import colors from '../../colors'
import { store } from '../../redux/store';
import { ActionCreators } from '../../redux/actions/index'
import ChatNavigator from '../../navigation/ChatNav'

class ConfirmCode_Screen extends Component {

    constructor(props) {
        super(props)

        this.state = {
            codeInput: this.props.codeInput,
        }
        this.renderUserRegisteredScreen = this.renderUserRegisteredScreen.bind(this);
    }


    confirmCode = (codeInput) => {
        var codeInputed = codeInput;
        const { confirmResult } = this.props;
        var mensagem = 'Código confirmado!!! '
        if (confirmResult && codeInputed.length) {
            this.props.confirmCode(confirmResult, codeInput, mensagem);
            return this.props.navigation.navigate('Boiler');
        }
    };

    render() {
        const { codeInput } = this.state;
        const { user } = this.props;
        return (
            <View style={{ marginTop: 25, padding: 25, backgroundColor: colors.maincolor }}>
                <InputField
                    labelText='Digite o código de verificação abaixo'
                    labelTextSize={14}
                    textColor={colors.white}
                    borderBottomColor={colors.white}
                    inputType="text"
                    customStyle={{ marginBottom: 30 }}
                    onChangeText={value => { this.setState({ codeInput: value }); }}
                    showCheckmark={false}
                    autoFocus={true}
                    placeholder={'Digite aqui o código que você recebeu!'}
                    value={codeInput}
                />
                <RoundedButton
                    text='Confirmar Código'
                    textColor={colors.white}
                    background={colors.maincolor}
                    handleOnPress={() => this.confirmCode(codeInput)}
                />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.phoneSendCode.user,
        confirmResult: state.phoneSendCode.confirmResult,
        codeInput: state.phoneSendCode.codeInput,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        confirmCode: (confirmResult, codeInput, mensagem) => dispatch(ActionCreators.confirmCode(confirmResult, codeInput, mensagem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmCode_Screen)