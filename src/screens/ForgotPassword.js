import React, { Component } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    StyleSheet,
    ScrollView,
} from 'react-native';
import colors from '../colors';
import InputField from '../components/form/InputField';
import Notification from '../components/form/Notification';
import NextArrowButton from '../components/buttons/NextArrowButton';
import Loader from '../components/form/Loader';

export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formValid: true,
            loadingVisible: false,
            validEmail: false,
            emailAddress: '',
        };
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.goToNextStep = this.goToNextStep.bind(this);
        this.handleCloseNotification = this.handleCloseNotification.bind(this);
    }

    handleEmailChange(email) {
        const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.setState({ emailAddress: email });

        if (!this.state.validEmail) {
            if (emailCheckRegex.test(email)) {
                this.setState({ validEmail: true });
            } else if (!emailCheckRegex.test(email)) {
                this.setState({ validEmail: false });
            }
        }
        if (this.state.validEmail) {
            if (emailCheckRegex.test(email)) {
                this.setState({ validEmail: true });
            } else if (!emailCheckRegex.test(email)) {
                this.setState({ validEmail: false });
            }
        } 
    }

    goToNextStep() {
        this.setState({ loadingVisible: true });
        setTimeout(() => {
          if (this.state.emailAddress === 'wrong@email.com') {
              this.setState({
                  loadingVisible: false,
                  formValid: false,
              });
          } else {
              this.setState({
                  loadingVisible: false,
                  formValid: true,
              });
          }
        }, 2000);
    }

    handleCloseNotification() {
        this.setState({ formValid: true })
    }

    render() {
        const { loadingVisible, formValid, validEmail } = this.state;
        const  background = formValid ? {backgroundColor: colors.green01} : {backgroundColor: colors.darkOrange};
        const showNotification = formValid ? false : true;
        return (
            <KeyboardAvoidingView
              style={[background, styles.wrapper]}
            >
            <View style={styles.scrollViewWrapper} >
              <ScrollView style={styles.scrollView} >
                    <Text style={styles.forgotPasswordHeading} >Esqueceu sua senha?</Text>
                    <Text style={styles.forgotPasswordSubHeading} >Digite seu email abaixo para recuperar sua senha</Text>
                    <InputField 
                    customStyle={{marginBottom: 30}}
                    textColor={colors.white}
                    labelText='EMAIL'
                    labelTextSize={14}
                    labelColor={colors.white}
                    borderBottomColor={colors.white}
                    inputType='email'
                    onChangeText={this.handleEmailChange}
                    showCheckmark={validEmail}
                    />
              </ScrollView>
            <NextArrowButton 
              handleNextButtonPress={this.goToNextStep}
              disabled={!validEmail}
            />
              <View style={styles.notificationWrapper} >
                <Notification 
                  showNotification={showNotification}
                  handleCloseNotification={this.handleCloseNotification}
                  type='Erro: '
                  firstLine='Me parece que este email está incorreto'
                  secondLine='Por favor, você poderia tentar novamante'
                />
              </View>
            </View>
              <Loader 
                modalVisible={loadingVisible}
                animationType='fade'
              />
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        display: 'flex',
        flex: 1,
    },
    scrollViewWrapper: {
        marginTop: 70,
        flex: 1,
    },
    scrollView: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        flex: 1,
    },
    forgotPasswordHeading: {
        fontSize: 28,
        color: colors.white,
        fontWeight: '300',
    },
    forgotPasswordSubHeading: {
        color: colors.white,
        fontWeight: '600',
        fontSize: 15,
        marginTop: 10,
        marginBottom: 60,
    },
    notificationWrapper: {
        position: 'absolute',
        bottom: 0,
    }
});
