import React, { Component } from 'react'
import {
    Text,
    StyleSheet, 
    View,
    TextInput,
    TouchableNativeFeedback,
} from 'react-native'
import { SCREEN_WIDTH } from '../../constants/index'
import colors from '../../colors/index'
import { connect } from 'react-redux'
import { ActionCreators } from '../../redux/actions'

class EditarNome extends Component {
    constructor(props) {
        super(props);


    }

    render() {
        const { userInfo, updateNameState, saveName, name } = this.props;
        return (
            <View style={styles.textBox} >
                <TextInput
                    autoFocus
                    style={styles.saveText}
                    placeholder={userInfo.name}
                    onChangeText={(name) => { updateNameState(name) }}
                    underlineColorAndroid={colors.maincolor}
                />
                <TouchableNativeFeedback
                    style={styles.buttonSave}
                    onPress={() => saveName(name)}
                    underlayColor='rgba(255,255,255,0.2)'
                >
                    <Text style={styles.save} >Salvar</Text>
                </TouchableNativeFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textBox: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH,
        height: 50,
        marginVertical: 20,
        justifyContent: 'flex-end' ,
        flexDirection: 'row',
    },
    name: {
        fontSize: 20,
        left: 20,
    },
    saveText: {
        fontSize: 20,
        right: 30,
        width: SCREEN_WIDTH - 40,
        position: 'absolute',
        left: 20,
        
    },
    buttonSave: {
        position: 'absolute',
        right: 0,
        top: 10,
    },
    save: {
        color: colors.maincolor,
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 10,
        paddingRight: 25,
        
    }

})

const mapStateToProps = (state) => {
    return {
        userInfo: state.phoneSendCode,
        name: state.perfilReducer.name,
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        updateNameState: (text) => { dispatch(ActionCreators.updateNameState(text)); },
        saveName: (text) => { dispatch(ActionCreators.updateProfileName(text))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditarNome)