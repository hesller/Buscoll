import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../colors/index';

export default class SquareButton extends Component {
    render() {
        return (
            <View>
                <TouchableHighlight 
                  onPress={this.props.onPress} 
                  underlayColor='rgba(255,255,255,0.0)'
                >
                    <Icon
                        size={40}
                        name={this.props.name}
                        color={this.props.color}
                    />
                </TouchableHighlight>
                <Text style={{ color: colors.white }} >{this.props.iconSub}</Text>
            </View>
        )
    }
}