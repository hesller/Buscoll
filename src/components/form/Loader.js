import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import colors from '../../colors';
import {
    View,
    Image,
    Modal,
    StyleSheet,
    Text,
} from 'react-native';

export default class Loader extends Component {
    render() {
        const{ animationType, modalVisible } = this.props;
        
        return(
            <Modal 
              animationType={animationType}
              transparent={true}
              visible={modalVisible}
            >
              <View style={styles.wrapper} >
                <View style={styles.loaderContainer} >
                    <Image 
                      style={styles.loaderImage} 
                      source={require('../../imgs/dots_2.gif')}
                      resizeMode='cover'
                    />
                </View>
              </View>
            </Modal>
        );
    }
}

Loader.propTypes = {
    animationType: PropTypes.string.isRequired,
    modalVisible: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create ({
    wrapper: {
      zIndex: 9,
      backgroundColor: 'rgba(0,0,0,0.4)',
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
    },
    loaderImage: {
        height: 80,
        width: 80,
        borderRadius: 20,
        overlayColor: colors.white,
        borderWidth: 0.5,
        borderColor: colors.green01,  
    },
    loaderContainer: {
        width: 80,
        height: 80,
        borderRadius: 20,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -45,
        marginTop: -45,
    }
});
