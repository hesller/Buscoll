import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'react-native-elements';
import colors from '../../colors';

export default class RoundedIcon extends Component {
    render() {
        return (
            <Icon
              raised
              reverse
              name={this.props.name}
              size={22}
              color={colors.icon}
              onPress={this.props.onPress}
              type={this.props.type}
              containerStyle={this.props.style}
            />
        );
    }
}

RoundedIcon.propTypes = {
    name: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    type: PropTypes.string,
    style: PropTypes.object,
}