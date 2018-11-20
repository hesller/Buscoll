

/*
//import '../reactotron-config';
import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Routes } from './RootNavigator';
import { NavigationActions } from 'react-navigation';
import rootReducer from './data/reducers/rootReducer';
import { checkAuthenticationStatus } from './process/actions/auth/loginActions';

export let navigationRef;
class App extends Component {
    constructor(props) {
        super(props);
        this.store = createStore(
            rootReducer, {},
            compose(
                applyMiddleware(ReduxThunk),
                window.devToolsExtension ? window.devToolsExtension() : f => f
            )
        );
        this.store.dispatch(checkAuthenticationStatus());
        const initialState = this.store.getState();
        this.handleBackButton = this.handleBackButton.bind(this);
    }

    componentDidMount() {
        navigationRef = this.navigator;
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        navigationRef.dispatch(NavigationActions.navigate({
            routeName: 'Main'
        }));
    }

    render() {
        return (
            <Provider store={this.store}>
                <Routes ref={nav => { this.navigator = nav; }} />
            </Provider>
        );
    }
}

export default App;


import { NavigationActions } from 'react-navigation';
import { navigationRef } from '../../../App';

//import types....

const accountLoginAsync = (dispatch, encodedLoginData, formLoginData) => {

    fetch('SOME_URL', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encodedLoginData
    })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.Status === 'Error') {
                loginUserFailed(dispatch, responseJson.Record);
                httpErrorDetail(dispatch, responseJson.Record); // response.Record = 'Api Error'
            } else {
                loginUserSuccess(dispatch, formLoginData, responseJson);
                setCurrentUser(dispatch, formLoginData, responseJson.Record);
            }
        })
        .catch((error) => {
            httpErrorDetail(dispatch, error.response);
            loginUserFailed(dispatch, error.response.data);
        });
};

const loginUserSuccess = (dispatch, formLoginData, responseData) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { formLoginData, responseData }
    });
    navigationRef.dispatch(NavigationActions.navigate({ // this is react-navigation's dispatch
        routeName: 'Main'
    }));
};

const loginUserFailed = (dispatch, errorData) => {
    dispatch({
        type: SERVER_LOGIC_ERRORS,
        payload: errorData
    });
};

const httpErrorDetail = (dispatch, errorDetail) => {
    dispatch({
        type: HTTP_ERRORS,
        payload: errorDetail
    });
};

//....others*/