import React, { Component, PureComponent } from 'react'
import {
    Text,
    StyleSheet,
    View,
    Image,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    TouchableHighlight,
    Alert,
    Platform,
    Button
} from 'react-native'
import { connect } from 'react-redux'
import UserAvatar from 'react-native-user-avatar'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants';
import { CachedImage } from "react-native-img-cache";
import firebase from 'react-native-firebase'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IconEdit from 'react-native-vector-icons/FontAwesome5'
import { ActionCreators } from '../../redux/actions'
import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay'

import colors from '../../colors';

console.disableYellowBox = true


class Perfil_Screen extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            editName: false,
            userimgSource: null,
            userimgSourceType: null,
            userimgSourceSize: null,
            userimgSourceData: null,
            userimgFileName: null,
        }

        this.user = firebase.auth().currentUser;
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        nextProps.profUri;
    }


    render() {
        const { name, userInfo, profUri, updateNameState, saveName, loading } = this.props;

        return (
            <ScrollView style={styles.container} >
                <Spinner
                    visible={loading}
                    textContent={"Salvando imagem..."}
                    textStyle={{ color: '#FFF' }}
                    overlayColor='rgba(16, 82, 135, 0.92)'
                >
                </Spinner>
                <View style={styles.imageWrapper} >
                    {//userInfo.user.photoURL == null ?
                        profUri == null ?
                            <UserAvatar
                                size={SCREEN_HEIGHT / 3.7}
                                name={!userInfo.name ? 'Usuario' : userInfo.name }
                            />
                            :
                            <UserAvatar
                                size={SCREEN_HEIGHT / 3.7}
                                name={!userInfo.name ? 'Usuario' : userInfo.name}
                                src={profUri}
                            />
                    }
                </View>

                <TouchableHighlight
                    style={styles.imagePicker}
                    onPress={() => {
                        Alert.alert(
                            'Selecionar Imagem...',
                            'Tirar Foto usando Camera ou utilizar imagem da Galeria?',
                            [
                                {
                                    text: 'Galeria', onPress: () => {
                                        ImagePicker.openPicker({
                                            width: 400,
                                            height: 400,
                                            cropping: true,
                                            cropperCircleOverlay: true,
                                            compressImageMaxWidth: 400,
                                            compressImageMaxHeight: 400,
                                            compressImageQuality: 0.5,
                                        }).then(imgResponse => {
                                            let imgSource = {
                                                uri:
                                                    Platform.OS === 'ios' ? imgResponse.sourceURL : imgResponse.path
                                            };
                                            let imgFileName = imgResponse.path.replace(/^.*[\\\/]/, '');
                                            this.props.uploadProfileImage(imgSource.uri, imgSource);
                                            this.setState({
                                                userimgSource: imgSource,
                                                userimgSourceType: imgResponse.mime,
                                                userimgSourceSize: imgResponse.size,
                                                userimgSourceData: imgResponse.data,
                                                userimgFileName: imgFileName,
                                            });
                                        });
                                    }
                                },
                                {
                                    text: 'Tirar Foto', onPress: () => {
                                        ImagePicker.openCamera({
                                            width: 400,
                                            height: 400,
                                            cropping: true,
                                            cropperCircleOverlay: true,
                                            compressImageMaxWidth: 400,
                                            compressImageMaxHeight: 400,
                                            compressImageQuality: 0.5
                                        }).then(imgResponse => {
                                            let imgSource = {
                                                uri:
                                                    Platform.OS === 'ios' ? imgResponse.sourceURL : imgResponse.path
                                            };
                                            let imgFileName = imgResponse.path.replace(/^.*[\\\/]/, '');
                                            this.props.uploadProfileImage(imgSource.uri, imgSource);
                                            this.setState({
                                                userimgSource: imgSource,
                                                userimgSourceType: imgResponse.mime,
                                                userimgSourceSize: imgResponse.size,
                                                userimgSourceData: imgResponse.data,
                                                userimgFileName: imgFileName,
                                            });
                                        })
                                    }
                                },
                            ],
                            { cancelable: false }
                        )


                    }}
                >
                    <Icon
                        name='camera'
                        size={25}
                        color={colors.white}
                    />
                </TouchableHighlight>

                <View style={styles.textBox} >
                    <Text style={styles.name} >
                        {userInfo.name}
                    </Text>
                    <IconEdit
                        style={styles.icon}
                        name='pen'
                        size={20}
                        color={colors.maincolor}
                        onPress={() => {
                            this.props.route.navigation.navigate('EditarNome')
                            this.setState({ editName: true })
                        }}
                    />
                </View>
                <Text>
                    Este nome não é seu login ou senha,
                    ele simplesmente estará visível nas suas conversas
                </Text>
                <View style={styles.textBox} >
                    <Text style={styles.name} >
                        {String(this.props.userInfo.user.phoneNumber).substr(3, 2) + ' ' +
                            String(this.props.userInfo.user.phoneNumber).substr(5, 1) + ' ' +
                            String(this.props.userInfo.user.phoneNumber).substr(6, 4) + '-' +
                            String(this.props.userInfo.user.phoneNumber).substr(10, 4) + ' '}

                    </Text>
                </View>
                
                {userInfo.name === 'Rafael' && userInfo.user.phoneNumber === '+5598981844121' ?
                    <Button
                        title='Painel Administrador'
                        onPress={() => {
                            this.props.route.navigation.navigate('AdminPainel')
                        }}
                        style={styles.buttonAdmin}
                    />
                    :
                    null
                }

                {userInfo.name === 'Hesller' && userInfo.user.phoneNumber === '+5598984025599' ?
                    <Button
                        title='Painel Administrador'
                        onPress={() => {
                            this.props.route.navigation.navigate('AdminPainel')
                        }}
                        style={styles.buttonAdmin}
                    />
                    :
                    null
                }
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageWrapper: {
        margin: 20,
        alignItems: 'center'
    },
    image: {
        height: SCREEN_HEIGHT / 3.7,
        width: SCREEN_HEIGHT / 3.7,
        position: 'absolute',
        top: 20,
        left: SCREEN_WIDTH / 2 - SCREEN_HEIGHT / 3.7 / 2,
        borderRadius: SCREEN_HEIGHT / 3.7 / 2,
    },
    imagePicker: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: colors.maincolor,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        top: SCREEN_HEIGHT / 3.7 - 30,
        right: SCREEN_WIDTH / 2 - SCREEN_HEIGHT / 3.7 / 2
    },
    textBox: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH,
        height: 50,
        marginVertical: 20,
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        left: 20,
    },
    icon: {
        position: 'absolute',
        right: 20,
        top: 15,
    },
    textBox02: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH,
        height: 50,
        marginVertical: 20,
        justifyContent: 'center',
    },
    buttonAdmin: {
        marginVertical: 20,
        marginHorizontal: 20,
    }
})

const mapStateToProps = (state) => {
    return {
        userInfo: state.phoneSendCode,
        name: state.perfilReducer.name,
        message: state.perfilReducer.message,
        profUri: state.perfilReducer.profUri,
        imageSource: state.perfilReducer.userimgSource,
        loading: state.perfilReducer.loading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNameState: (text) => { dispatch(ActionCreators.updateNameState(text)); },
        saveName: (text) => { dispatch(ActionCreators.updateProfileName(text)) },
        uploadProfileImage: (uri, source) => { dispatch(ActionCreators.uploadImage(uri, source)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Perfil_Screen);
