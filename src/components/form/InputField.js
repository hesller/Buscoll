import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import colors from '../../colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    TextInput,
    Animated,
    Easing,
    TouchableOpacity,
    StyleSheet,
    Platform
} from 'react-native';

export default class InputField extends Component {
    constructor(props) {
        super(props);

        this.state = {
            secureInput: props.inputType === 'phoneNumber' ||
                         props.inputType === 'text' || 
                         props.inputType === 'email' ? false : true,
            scaleCheckmarkValue: new Animated.Value(0),
        };
        this.toggleShowPassword = this.toggleShowPassword.bind(this);
    }

    scaleCheckmark(value) {
        Animated.timing(
            this.state.scaleCheckmarkValue,
            {
                toValue: value,
                duration: 400,
                easing: Easing.easeOutBlack,
            }
        ).start();
    }

    toggleShowPassword() {
        this.setState({ secureInput: !this.state.secureInput });
    }


    render() {
        const { labelText, 
                labelTextSize, 
                labelColor, 
                textColor, 
                borderBottomColor,
                inputType,
                customStyle,
                onChangeText,
                showCheckmark,
                autoFocus,
                autoCapitalize, 
                placeHolder,
                value,
            } = this.props;
        const { secureInput, scaleCheckmarkValue } = this.state;
        const fontSize = labelTextSize || 14;
        const color = labelColor || colors.white;
        const inputColor = textColor || colors.white;
        const borderBottom = borderBottomColor || 'transparent';
        const keyboard = inputType === 'email' ? 'email-address' : 'default';
        
        const iconScale = scaleCheckmarkValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1.6, 1]
        });
        const scaleValue = showCheckmark ? 1 : 0;
        this.scaleCheckmark(scaleValue);

        return (
            <View style={[customStyle, styles.wrapper]} >
                <Text style={[{ color, fontSize }, styles.label]} >{labelText}</Text>
                {
                    inputType === 'password' ?
                    <TouchableOpacity
                     style={styles.showButton}
                     onPress={this.toggleShowPassword}
                    >
                        <Text style={styles.showButtonText} >{secureInput ? 'Mostrar' : 'Esconder'}</Text>
                    </TouchableOpacity>
                    : null 
                }
                { scaleValue ? 
                    <Animated.View style={[{transform: [{ scale: iconScale }]}, styles.checkmarkWrapper]} >
                        <Icon 
                        name='check'
                        color={colors.white}
                        size={20}
                        />
                    </Animated.View>
                    : null 
                }
                <TextInput
                    underlineColorAndroid='transparent'
                    style={[
                        {
                            color: inputColor, 
                            borderBottomColor: borderBottom, 
                        },
                        styles.inputField]}
                    secureTextEntry={secureInput}
                    onChangeText={onChangeText}
                    keyboardType={keyboard}
                    selectionColor={colors.white}
                    autoFocus={autoFocus}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={false}
                    placeHolder={placeHolder}
                    value={value}
                />
            </View>
        );
    }
}

InputField.propTypes = {
    labelText: PropTypes.string.isRequired,
    labelTextSize: PropTypes.number,
    textColor: PropTypes.string,
    labelColor: PropTypes.string,
    borderBottomColor: PropTypes.string,
    inputType: PropTypes.string.isRequired,
    customStyle: PropTypes.object,
    onChangeText: PropTypes.func,
    showCheckmark: PropTypes.bool.isRequired,
    autoFocus: PropTypes.bool,
    autoCapitalize: PropTypes.bool,
};

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
    },
    label: {
        fontWeight: '700',
        marginBottom: 10,

    },
    inputField: {
        borderBottomWidth: Platform.OS === 'android' ? 1 : 1,
        paddingVertical: 5,
    },
    showButton: {
        position: 'absolute',
        right: 20,
    },
    showButtonText: {
        color: colors.white,
        fontWeight: '700',
    },
    checkmarkWrapper: {
        position: 'absolute',
        right: 0,
        bottom: 10,
    }
})