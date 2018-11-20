import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet, 
        TextInput, Image, Platform, Button,
        KeyboardAvoidingView, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PropTypes } from 'prop-types';
import colors from '../colors';
import InputField from '../components/form/InputField';
import NextArrowButton from '../components/buttons/NextArrowButton';
import Notification from '../components/form/Notification';
import Loader from '../components/form/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../redux/actions';
import firebase from 'react-native-firebase';

const { height, width } = Dimensions.get('window');

class EmailPassSignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValid: true,
      validEmail: false,
      name: '',
      emailAddress: '',
      password: '',
      password02: '',
      validPassword: false,
      validPassword02: false,
      loadingVisible: false,
    }
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
 

  handleNameChange(name) {
    this.setState({ name })

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
    } else if (this.state.validEmail) {
      if (emailCheckRegex.test(email)) {
        this.setState({ validEmail: true });
      } else if (!emailCheckRegex.test(email)) {
          this.setState({ validEmail: false });
        }
    }
  }

  handlePasswordChange(password) {
    this.setState({ password });
    
    if (!this.state.validPassword) {
      if (password.length >= 4) {
        this.setState({ validPassword: true });
      } 
    } else if (password.length < 4) {
        this.setState({ validPassword: false })
      }
  }

  handlePasswordChange2 = (password02) => {
    this.setState({ password02 });
    
    if (!this.state.validPassword02) {
      if (password02 == this.state.password && password02.length != 0) {
        this.setState({ validPassword02: true });
      } 
    } else {
        this.setState({ validPassword02: false })
      }
  }

  handleNextButton() {
    const { password, password02, emailAddress, name } = this.state;
    if ( password == password02 ) {
      this.props.registerUser(emailAddress, password, name);
    } 
  }

  toggleNextButtonState() {
    const { validEmail, validPassword, validPassword02 } = this.state;
    if (validEmail && validPassword && validPassword02) {
      return false;
    }
    return true;
  }

  handleCloseNotification() {
    this.setState({ formValid: true });
  }

  render() {
    const { formValid, loadingVisible, validEmail, validPassword, name, validPassword02 } = this.state;
    const showNotification = formValid ? false : true;
    const background = formValid ? colors.maincolor : colors.darkOrange;
    const notificationMarginTop = showNotification ? 10 : 0;

    return (
      <KeyboardAvoidingView 
        style={[{ backgroundColor: background }, styles.wrapper]}
        behavior={Platform.OS === 'android' ? null : 'padding'}
      >
        <View style={styles.scrollViewWrapper} >
          <ScrollView style={styles.scrollView} >
            <Text style={styles.loginHeader} >Criar Conta</Text>
            <InputField 
              labelText='NOME COMPLETO'
              labelTextSize={14}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="text"
              customStyle={{marginBottom: 30}}
              onChangeText={this.handleNameChange}
              showCheckmark={false}
              autoFocus={true}
            />
            <InputField 
              labelText='EMAIL'
              labelTextSize={14}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="email"
              customStyle={{marginBottom: 30}}
              onChangeText={this.handleEmailChange}
              showCheckmark={validEmail}
              autoFocus={false}
            />
            <InputField 
              labelText='SENHA'
              labelTextSize={14}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType='password'
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handlePasswordChange}
              showCheckmark={validPassword}
            />
            <InputField 
              labelText='CONFIRMAR SENHA'
              labelTextSize={14}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType='password'
              customStyle={{ marginBottom: 30 }}
              onChangeText={this.handlePasswordChange2}
              showCheckmark={validPassword02}
            />
          </ScrollView>
          <NextArrowButton
            handleNextButtonPress={this.handleNextButton}
            disabled={this.toggleNextButtonState()}
          />
          <View style={[styles.notificationWrapper, { marginTop: notificationMarginTop }]} >
            <Notification
              showNotification={showNotification}
              handleCloseNotification={this.handleCloseNotification}
              type='Erro: '
              firstLine='Suas credenciais parecem incorretas.'
              secondLine='Tente novamente.'
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

/* */

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flex: 1,
  },
  scrollViewWrapper: {
    paddingTop: 70,
    flex: 1,
  },
  scrollView: {
    padding: 20,
    paddingRight: 30,

    flex: 1,
  },
  loginHeader: {
    fontSize: 34,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40,
  },
  notificationWrapper: {
    position: 'absolute',
    bottom: 0,
  }
});

const mapStateToProps = (state) => {
  return {
    loggedInStatus: state.loggedInStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (em, pass) => dispatch(ActionCreators.EmailPassSignUpFistore(em, pass))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailPassSignUp);
