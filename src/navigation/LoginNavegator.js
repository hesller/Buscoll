import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import LoggedOut from '../screens/LoggedOut';
import LogIn from '../screens/Login';
import ForgotPassword from '../screens/ForgotPassword';

export const LoginNavegator = StackNavigator({
    LoggedOut: { screen: LoggedOut },
    Login: { screen: LogIn },
    ForgotPassword: { screen: ForgotPassword }
});

const AppWithNavigationState = ({ dispatch, nav, listener}) => {
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav, addListener: listener })} />
};

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nave,
});

export default connect(mapStateToProps)(AppWithNavigationState)