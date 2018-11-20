import React, { Component, PureComponent } from 'react'
import {
    Text,
    View,
    Button,
    FlatList,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { NavigationActions } from 'react-navigation';
import AdicionarContatos from '../chatcomps/AdicionarContatos';
import call from 'react-native-phone-call'
import { connect } from 'react-redux';
import { ActionCreators } from '../../redux/actions'
import { CachedImage } from 'react-native-img-cache';
import colors from '../../colors';
import UserAvatar from 'react-native-user-avatar'

class Contatos extends PureComponent {

    componentWillMount() {
        
    }

    componentDidMount() {
        this.props.fetchUser();
    }

    componentWillReceiveProps(nextProps) {
        nextProps.contactsArray;
    }

    _keyExtractor = (item, index) => { item.uid };

    _renderItem(item) {
        const args = {
            number: String(item.phoneNumber), // String value with the number to call
            prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call 
        }

        return (
            <TouchableHighlight
                onPress={() => this.props.route.navigation.navigate('ChatRoom', {
                    uid: item.uid,
                    name: item.name,
                    phoneNumber: item.phoneNumber,
                    photoURL: item.photoURL,
                    email: item.email,
                    title: item.name,
                })}
                underlayColor='transparent' >
                <View style={styles.container} >
                    {item.photoURL == null ?
                        <UserAvatar size="50" name={item.name} />
                        :
                        <CachedImage
                            source={{ uri: item.photoURL }}
                            style={styles.image}
                        />
                    }

                    <Text style={styles.name} >{item.name}</Text>
                    <Text style={styles.phoneNumber} >{item.phoneNumber}</Text>
                    <Icon
                        name='phone'
                        size={24}
                        color={colors.maincolor}
                        style={styles.callIcon}
                        onPress={() => {
                            return call(args).catch(console.error)
                        }}
                    />
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        if (this.props.contactsArray.length == 0) {
            return (
                <View>
                    <Button title='Adicionar Contatos'
                        onPress={() => this.props.route.navigation.navigate('AdicionarContatos')} />
                    <Text style={{ paddingTop: 30, fontSize: 18, fontWeight: 'bold' }}  >
                        Seus contatos serão listados aqui.
                    </Text>
                </View>
            )
        } else {
            return (
                <View>
                    <Button title='Adicionar Contatos'
                        onPress={() => this.props.route.navigation.navigate('AdicionarContatos')} />
                    <FlatList
                        data={this.props.contactsArray}
                        renderItem={({ item }) => this._renderItem(item)}
                        keyExtractor={(item) => this._keyExtractor(item)}
                    />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.gray,
        padding: 15
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 25,
        paddingLeft: 20,
        paddingTop: 20,
    },
    name: {
        paddingLeft: 20,
        paddingTop: 5,
        fontWeight: 'bold',
        fontSize: 18,
    },
    phoneNumber: {
        bottom: 15,
        left: 90,
        fontSize: 15,
        position: 'absolute',
    },
    callIcon: {
        position: 'absolute',
        right: 20,
        top: 30,
    }
})

const mapStateToProps = (state) => {
    return {
        contactsArray: state.contactList.userContacts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => { dispatch(ActionCreators.contatosUsuariosFetch()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contatos);