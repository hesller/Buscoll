import React, { Component } from 'react'
import {
    Text,
    View,
    Dimension,
    Image,
    Animated,
    StyleSheet,
    TouchableHighlight,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../constants/index'

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 50;
const LOGO_MAX_HEIGHT = 150;
const LOGO_MIN_HEIGHT = 70;
/*
 class logoArea extends Component {
    render() {
        return (
            <Image
                backgroundColor='#2296f3'
                source={require('../../imgs/logo.png')}
                style={estilos.image}
            />
        )
    }
}
*/

const SIZE = 80;

class LogoArea extends Component {
    mode = new Animated.Value(0);
    toggleView = () => {
      Animated.timing(this.mode, {
        toValue: this.mode._value === 0 ? 1 : 0,
        duration: 300
      }).start();
    };

    render() {
        const firstX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, -40]
        });
        const firstY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 60]
        });

        const opacity = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
        });

        const rotation = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '45deg']
        });

        return (
            <View style={{
                position: 'relative',
                alignItems: 'center',
                elevatio: 6,
                bottom: 40,
            }}>
                <Animated.View style={{
                    position: 'relative',
                    left: firstX,
                    top: firstY,
                    opacity,
                }}>
                    <TouchableHighlight
                        onPress={() => {
                        }}
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: SIZE / 2,
                            height: SIZE / 2,
                            borderRadius: SIZE / 4,
                            backgroundColor: '#48A2F8',
                            
                        }}
                    >
                        <Icon name="plus" size={16} color="#F8F8F8"/>
                    </TouchableHighlight>
                </Animated.View>

                <TouchableHighlight
                    onPress={this.toggleView}
                    underlayColor="#2882D8"
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: SIZE,
                        height: SIZE,
                        borderRadius: SIZE / 2,
                        backgroundColor: '#48A2F8',
                    }}
                >
                    <Animated.View style={{
                        transform: [
                            {rotate: rotation}
                        ]
                    }}>
                        <Icon name="plus" size={24} color="#F8F8F8"/>
                    </Animated.View>
                </TouchableHighlight>
            </View>
        );
    }
}

export default LogoArea;