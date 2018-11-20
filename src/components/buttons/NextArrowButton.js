import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import colors from '../../colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    TouchableHighlight,
    StyleSheet,
    View,
} from 'react-native';

export default class NextArrowButton extends Component {
    render() {
        const { handleNextButtonPress, disabled } = this.props;
        const opacityStyle = disabled ? {backgroundColor: 'rgba(255,255,255,0.3)'} : {backgroundColor: 'rgba(255,255,255,0.6)'};
        return (
          <View style={styles.nextArrowButton} >
            <TouchableHighlight
                style={[opacityStyle, styles.button ]}
                onPress={handleNextButtonPress}
                disabled={disabled}
            >
                <Icon
                name='angle-right'
                color={colors.green01}
                size={32}
                style={styles.icon}
                />
            </TouchableHighlight>
          </View>
        );
    }
}

NextArrowButton.propTypes = {
    disabled: PropTypes.bool,
    handleNextButtonPress: PropTypes.func,
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        width: 60,
        height: 60,
    },
    icon: {
        marginRight: -2,
        marginTop: -2,
    },
    nextArrowButton: {
        alignItems: 'flex-end',
        right: 20,
        paddingBottom: 20,
      },
});
