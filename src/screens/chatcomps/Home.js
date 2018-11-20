import React, { Component } from 'react';
import { Text, View, ScrollView, Dimensions, StyleSheet, 
        TextInput, Image, Platform, Button,
        KeyboardAvoidingView, Keyboard, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { PropTypes } from 'prop-types';
import colors from '../../colors';
import InputField from '../../components/form/InputField';
import NextArrowButton from '../../components/buttons/NextArrowButton';
import Notification from '../../components/form/Notification';
import Loader from '../../components/form/Loader';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../redux/actions';

const { height, width } = Dimensions.get('window');

class ChatLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValid: true,
      validEmail: false,
      emailAddress: '',
      password: '',
      validPassword: false,
      loadingVisible: false,
    }
    this.handleCloseNotification = this.handleCloseNotification.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.toggleNextButtonState = this.toggleNextButtonState.bind(this);
  }
  handleNextButton() {
    this.setState({ loadingVisible: true });

    setTimeout(() => {
      const { emailAddress, password } = this.state;
      if (this.props.logIn(emailAddress, password)) {
        this.setState({ formValid: true, loadingVisible: false });
      } else {
        this.setState({ formValid: false, loadingVisible: false });
      }
   }, 2000);
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

  toggleNextButtonState() {
    const { validEmail, validPassword } = this.state;
    if (validEmail && validPassword) {
      return false;
    }
    return true;
  }

  handleCloseNotification() {
    this.setState({ formValid: true });
  }

  render() {
    const { formValid, loadingVisible, validEmail, validPassword } = this.state;
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
            <Text style={styles.loginHeader} >Login</Text>
            <InputField 
              labelText='EMAIL'
              labelTextSize={14}
              textColor={colors.white}
              borderBottomColor={colors.white}
              inputType="email"
              customStyle={{marginBottom: 30}}
              onChangeText={this.handleEmailChange}
              showCheckmark={validEmail}
              autoFocus={true}
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
            <TouchableOpacity>
              <Text>Ainda não fez seu cadastro? Clique aqui</Text>
            </TouchableOpacity>
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
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatLogin);
