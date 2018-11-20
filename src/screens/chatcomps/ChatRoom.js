import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";
import { ActionCreators } from '../../redux/actions';
import { GiftedChat, Actions, SystemMessage, Send } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase'
import { store } from "../../redux/store";
import Icon from 'react-native-vector-icons/FontAwesome5'
import colors from "../../colors";

// ======================================
// falta conectar o onSend no reducer
class ChatRoom extends React.Component {

    constructor(props) {
        super(props);

        var user = firebase.auth().currentUser;
        //uid = params.uid;
        const { params } = this.props.navigation.state;
        this.contactDetails = {
            uid: params.uid,
            name: params.name,
            email: params.email,
            phoneNumber: params.phoneNumber,
            photoURL: params.photoURL,
        }

        var currentUserRef = store.getState().phoneSendCode;
        this.currentUser = {
            uid: currentUserRef.user.uid,
            name: currentUserRef.name,
            email: currentUserRef.user.email,
            phoneNumber: currentUserRef.user.phoneNumber,
            photoURL: user.photoURL,
        }

        this.chatRef = firebase.firestore().collection('users').doc(this.currentUser.uid)
            .collection('contatos').doc(this.contactDetails.uid).collection('mensagens');

    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: String(navigation.state.params.title),
            params: navigation.state.params,
            headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
            headerStyle: {
                backgroundColor: 'white',
            },
        }
    }

    componentDidMount() {
        firebase.auth().currentUser.reload;
        this.props.getConversationHistory(this.chatRef);

        /*
        this.setState({
            messages: [
                {
                    _id: this.currentUser.uid, //enviado para...
                    text: `Hello developer, this is my currentId: ${this.state.uid} and my name ${this.state.name}`,
                    createdAt: new Date(),
                    user: { // enviado do...
                        _id: this.state.uid,
                        name: this.state.name,
                        avatar: 'https://placeimg.com/140/140/any',
                    },
                },
            ],
        })*/
    }

    componentWillReceiveProps(nextProps) {
        //nextProps.mensagens;
    }

    _renderSend(props) {
        return (
            <Send
                {...props}
            >
                <View style={{marginRight: 20, marginBottom: 10}}>
                    <Icon name='paper-plane' size={24} color={colors.maincolor} />
                </View>
            </Send>
        );
    }

    onSend = (messages = []) => {
        /*firebase.firestore().collection('users').doc(this.contactDetails.uid).get().then((contactSnapshot) => {
            const contactPushToken = contactSnapshot.data().pushToken;
            const notification = new firebase.notifications.Notification()
            .setNotificationId('anothernote')
            .setTitle('My notification title')
            .setBody('My notification body')
            .setData({
                key1: 'value1',
                key2: 'value2',
            })

            return firebase.notifications().displayNotification(notification)
        })*/
        
        this.props.sendMsgToFirebase(messages, this.currentUser, this.contactDetails);
        
    }

    state = {
        mensagens: []
    }

    render() {

        return (
            <GiftedChat
                renderSend={(props) => this._renderSend(props)}
                messages={this.props.mensagens}
                onSend={msgs => this.onSend(msgs)}
                user={{
                    _id: this.currentUser.uid,
                }}
                placeholder={'Digite aqui...'}
                loadEarlier={true}
            />
        )
    }
}

const styles = StyleSheet.create({
    text: {
        backgroundColor: colors.lightGray,
        color: colors.white,
        fontSize: 12,
    },
})

const mapStateToProps = (state) => {
    return {
        mensagens: state.getConversationHistory.mensagens,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMsgToFirebase: (messages, currentUser, contactDetails) => { dispatch(ActionCreators.sendMsgToFirebase(messages, currentUser, contactDetails)) },
        enviarMensagem: (messages, name, phoneNumber, photoURL, uid, email) => { dispatch(ActionCreators.sendMsgOnChat(messages, name, phoneNumber, photoURL, uid, email)) },
        getConversationHistory: (chatRef) => { dispatch(ActionCreators.getConversationHistory(chatRef)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);