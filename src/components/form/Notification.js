import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import colors from '../../colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Easing,
    Animated,
} from 'react-native';

export default class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positionValue: new Animated.Value(-60),
        }
        this.notificationClose = this.notificationClose.bind(this);
        this.animatedNotification = this.animatedNotification.bind(this);
    }

    animatedNotification(value) {
        const { positionValue } = this.state;
        Animated.timing(
            positionValue,
            {
                toValue: value,
                duration: 300,
                velocity: 3,
                friction: 8,
                easing: Easing.easeOutBack,
            }
        ).start();
    }

    notificationClose() {
        this.props.handleCloseNotification();
    }

    render() {
        const { type, firstLine, secondLine, showNotification } = this.props;
        const { positionValue } = this.state;
        showNotification ? this.animatedNotification(0) : this.animatedNotification(-60);

        return(
            <Animated.View style={[{ marginBottom: positionValue }, styles.wrapper]} >
                <View style={styles.notificationContent} >
                <Text style={styles.errorText} >{type}</Text>
                <Text style={styles.errorMessage01} >{firstLine}</Text>
                <Text style={styles.errorMessage01} >{secondLine}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.closeButton} 
                  onPress={this.notificationClose}
                >
                    <Icon 
                      name='times'
                      size={26}
                      color={colors.lightGray}
                    />
                </TouchableOpacity>
            </Animated.View>
        );
    }
}

Notification.propTypes = {
    showNotification: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    firstLine: PropTypes.string,
    secondLine: PropTypes.string,
    handleCloseNotification: PropTypes.func,
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: colors.white,
        height: 60,
        width: '100%',
        padding: 10,
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        top: 15,
    },
    notificationContent: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    errorText: {
        color: colors.darkOrange,
        marginRight:5,
        fontSize: 14,
        marginBottom: 2,
    },
    errorMessage01: {
        marginBottom: 2,
        fontSize: 14,
    }
});
