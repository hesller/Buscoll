import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Animated,
    Easing
} from 'react-native';
import { connect } from 'react-redux';
import { store } from '../redux/store';
import colors from '../colors/index';
import InputField from '../components/form/InputField'
import RoundedButton from '../components/buttons/RoudendButton';
import { ActionCreators } from '../redux/actions/index';
import { Field, reduxForm } from 'redux-form';
import { spinner } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay'
import { ActivityIndicator } from 'react-native';

import firebase from 'react-native-firebase';

const required = value => (value ? undefined : 'Campo necessário');
const phoneFormatter = (number) => {
    if (!number) return '';
    // NNN-NNN-NNNN
    const splitter = /.{1,2}/g;
    const splitter2 = /.{1,4}/g;
    number = number.substring(0, 11);
    //return number.substring(0, 3).match(splitter).join('-') + number.substring(3);
    return number.substring(0,3).match(splitter).join(' ') + number.substring(3, 7) + number.substring(7, 11);
};
const phoneParser = (number) => {
    var number02 = number;
    return number ? number02.replace(/ /g, '') : number02;
}
const phoneNumberValidation = value =>
    value && !/^(0|[1-9][0-9]{10})$/i.test(value)
        ? 'Número de telefone inválido, você deve digitar apenas números. Inclua o seu DDD, por exemplo: 98 9821155XX'
        : undefined;
const minLength = min => value =>
    value && value.length < min ? `O nome deve conter ${min} caracteres ou mais` : undefined;
const minLength2 = minLength(4);
const _renderName = (props) => {
    const { input, meta, ...inputProps } = props;

    return (
        <View>
            <Text style={styles.fieldTitle} >{props.label}</Text>
            <TextInput
                {...inputProps}
                onChangeText={input.onChange}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                value={input.value}
                underlineColorAndroid={colors.white}
                style={{ color: colors.white }}
                autoFocus={true}
            />
            <Text style={styles.errorMsg} >{props.meta.touched ? props.meta.error : ''}</Text>

        </View>
    );
}
const _renderCode = (props) => {
    const { input, meta, ...inputProps } = props;

    return (
        <View>
            <Text style={styles.fieldTitle} >{props.label}</Text>
            <TextInput
                {...inputProps}
                onChangeText={input.onChange}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                value={input.value}
                underlineColorAndroid={colors.white}
                style={{ color: colors.white }}
                autoFocus={true}
            />
            <Text style={styles.errorMsg} >{props.meta.touched ? props.meta.error : ''}</Text>

        </View>
    );
}
const _renderPhoneNumber = (props) => {
    const { input, meta, ...inputProps } = props;

    return (
        <View>
            <Text style={styles.fieldTitle} >{props.label}</Text>
            <TextInput
                {...inputProps}
                onChangeText={input.onChange}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                maxLength={12}
                placeholder='Digite seu número incluindo o DDD...'
                value={input.value}
                underlineColorAndroid={colors.white}
                style={{ color: colors.white }}

            />
            <Text style={styles.errorMsg} >{props.meta.touched ? props.meta.error : ''}</Text>

        </View>
    );
}

class PhoneAuth extends Component {
    constructor(props) {
        super(props);
        this.unsubscribe = null;
        this.state = {
            phoneNumber: this.props.phoneNumber,
            userAuthorized: false,
            mensagem: '',
            loadingSpinner: false,
            spinnerMsg: 'Obtendo código...',
        };
        this.widthAnimated = new Animated.Value(0)

    }

    componentWillMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.setUserAuthStatus(user, this.props.message);
            } else {
                // User has been signed out, reset the state
                this.props.resetUserStatus;
            }
        });
    }

    componentDidMount() {
        const { user, confirmResult, } = this.props;
        this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.setUserAuthStatus(user, this.props.message);
                this.props.registerOnDatabase(user, this.state.name);
                this.props.navigation.navigate('ChatPrincipal_Screen')
            } else {
                // User has been signed out, reset the state
                this.props.resetUserStatus;
            }
        });
        if (confirmResult && !user) {
            setTimeout(() => {
                Alert.alert('Tempo esgotado',
                    'Infelizmente o tempo para digitar o código se esgotou. Tente novamente ^^')
                return store.dispatch(ActionCreators.resetConfirmationCode());
            }, 4000)
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe();

    }

    componentWillReceiveProps(nextProps) {
        nextProps.confirmResult;
        nextProps.message;
    }

    async renderingMsg() {
        await this.props.confirmResult;
        if (!this.props.confirmResult) {
            var msg = 'Verifique sua conexão com a internet...';
            const state = true;
            this.setState({ spinnerMsg: msg, loadingSpinner: state });
        }
    }

    _submit = values => {
        this.setState({ mensagem: 'Enviando código ... ' }) 
        //essa funcao foi movida para a acao phoneSendCode.js
        store.dispatch(ActionCreators.sendingMsg('Enviando código ... '));
        //var numberSent = phoneNumber
        this.props.getPhoneAuthCode(values.telefone, values.nome);
    }

    _submit2 = values => {
        var codeInputed = values.codigo;
        const { confirmResult, name } = this.props;
        var mensagem = 'Código confirmado!!! '
        if (confirmResult && codeInputed.length ) {
            store.dispatch(ActionCreators.confirmCode(confirmResult, codeInputed, mensagem, name));
        }
    }


    signIn = (phoneNumber, name) => {
        var message = 'Enviando código ... '
        //essa funcao foi movida para a acao phoneSendCode.js
        store.dispatch(ActionCreators.sendingMsg(message));
        //var numberSent = phoneNumber
        return this.props.getPhoneAuthCode(phoneNumber, name);
    };

    confirmarCodigo = (codeInput) => {
        var codeInputed = codeInput;
        const { confirmResult, name } = this.props;
        var mensagem = 'Código confirmado!!! '
        if (confirmResult && codeInputed.length) {
            store.dispatch(ActionCreators.confirmCode(confirmResult, codeInput, mensagem, name));
        }
    };

    signOut = () => {
        firebase.auth().signOut();
        store.dispatch(ActionCreators.resetPhoneAuthStatus());
        return this.props.resetUserStatus;
    }

    renderMessage = () => {
        //const { message } = this.state;
        //this.props.renderMessage(this.props.message);
        if (!this.props.message) return null;
        return (
            <Text style={{ padding: 5, backgroundColor: colors.maincolor, color: colors.white }}>{this.props.message}</Text>
        );
    }

    async animatingWidth() {
        Animated.timing(
            this.widthAnimated,
        {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
        }).start();

        await this.props.confirmResult;
        if (this.props.confirmResult) {
            Animated.timing(this.widthAnimated,{
                toValue: 1,
                duration: 1500,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        }
    }

    render() {
        const { user, confirmResult, message } = this.props;
        const { userAuthorized, codeInput, loadingSpinner } = this.state;
        const { phoneNumber, setPhoneStateValue, setNameState, name, handleSubmit } = this.props;
        return (
            <View style={{ flex: 1, padding: 25, backgroundColor: colors.maincolor }}>
                {!confirmResult ?
                    <View >
                        <Field
                            label='Nome'
                            name='nome'
                            component={_renderName}
                            validate={[required, minLength(4)]}
                        />
                        <Field
                            label='Telefone'
                            name='telefone'
                            component={_renderPhoneNumber}
                            format={phoneFormatter}
                            parse={phoneParser}
                            validate={[required, phoneNumberValidation]}
                        />
                        <Text style={{ color: colors.white }}>{this.state.mensagem}</Text>
                        <TouchableOpacity
                            onPress={handleSubmit(this._submit)}
                            style={styles.submit}
                        >
                            <Text style={styles.submitText} >Cadastrar!</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={{ flex: 1, backgroundColor: colors.maincolor }}>
                    
                        <Field
                            label='Código'
                            name='codigo'
                            component={_renderCode}
                            validate={minLength2}
                        />
                        {this.renderMessage()}
                        <TouchableOpacity
                            onPress={handleSubmit(this._submit2)}
                            style={styles.submit}
                        >
                            <Text style={styles.submitText} >Confimar Código!</Text>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fieldTitle: {
        paddingTop: 20,
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.white,
    },
    errorMsg: {
        color: colors.darkOrange,
    },
    submit: {
        backgroundColor: colors.maincolor,
        marginVertical: 30,
        marginHorizontal: 20,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 29,
        borderWidth: 1,
        borderColor: colors.white,
    },
    submitText: {
        fontSize: 18,
        color: colors.white,
        fontWeight: 'bold',
    }
})


const mapStateToProps = (state) => {
    return {
        user: state.phoneSendCode.user,
        message: state.phoneSendCode.message,
        codeInput: state.phoneSendCode.codeInput,
        phoneNumber: state.phoneSendCode.phoneNumber,
        confirmResult: state.phoneSendCode.confirmResult,
        name: state.phoneSendCode.name,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNameState: (name) => { dispatch(ActionCreators.setNameState(name)) },
        setPhoneStateValue: (number) => { dispatch(ActionCreators.setPhoneStateValue(number)) },
        sendingMsg: (mensagem) => { dispatch(ActionCreators.sendingMsgPrinc(mensagem)) },
        getPhoneAuthCode: (phoneNumber, name) => { dispatch(ActionCreators.getPhoneAuthCode(phoneNumber, name)) },
        resetUserStatus: () => dispatch(ActionCreators.resetPhoneAuthStatus()),
        setUserAuthStatus: (user, message) => dispatch(ActionCreators.setUserStatePhone(user, message)),
        renderMessage: (message) => dispatch(ActionCreators.renderMsg(message)),
        confirmCode: (confirmResult, codeInput, mensagem) => dispatch(ActionCreators.confirmCode(confirmResult, codeInput, mensagem)),
        registerOnDatabase: (user) => { dispatch(ActionCreators.registerOnDatabase(user)) }
    }
}

function validate(values) {
    const errors = {};
    // validade the inputs
    if (values.codigo == null) {
        errors.codigo = 'É necessário digitar o código...'
    }
    return errors
}

export default reduxForm({
    validate,
    form: 'formSignup'
})(
    connect(mapStateToProps, mapDispatchToProps)(PhoneAuth)
);
