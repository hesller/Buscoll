import React, {Component} from 'react';
import {Text, Image, Animated, TouchableHighlight} from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { renderMsg } from '../../redux/actions/phoneSendCode';

export default class MenuButton extends Component {

    render() {
        return (
            <Animated.View style={{
                transform: this.props.transform,
                position: 'absolute',
                elevation: 5,
                justifyContent: 'center',
                flex: 1,
                height: 100,
                width: 100,
                bottom: 20,
                right: 20,
                opacity: this.props.opacity,
              }}>
                <TouchableHighlight
                  onPress={this.props.onPress}
                  underlayColor="#2882D8"
                  disabled={this.props.disabled}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: null,
                    height: null,
                    borderRadius: this.props.size / 2,
                    backgroundColor: '#48A2F8',
                    position: 'relative',
                    elevation: 6,
                  }}
                >
                  <Image source={require('../../imgs/logo.png')} resizeMode='cover' style={{ flex: 1, height: 100, width: 100, elevation: 6 }}/> 
                </TouchableHighlight>
              </Animated.View>    
        );
    }
}