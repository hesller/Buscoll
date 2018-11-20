import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, Animated } from 'react-native'
import Swiper from 'react-native-swiper'
import { SCREEN_WIDTH } from '../../constants';
import colors from '../../colors';
import { Item } from 'native-base';

const imagens = [
    { path: require('../../imgs/rest2.png')},
    { path: require('../../imgs/rest3.png')},
    { path: require('../../imgs/rest5.png')},
    { path: require('../../imgs/rest1.png')},
    { path: require('../../imgs/rest4.png')},
]

class SlideShow extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <View style={styles.container} >
                <Image style={styles.image} source={this.props.source} />
            </View>
        )
    }
}

export default class Slider extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageSlider: imagens,
        }
    }

    render() {
        return (
            <View>
                <Text style={styles.titulo} >Destaques da Semana</Text>
                <Swiper
                    style={styles.container}
                    height={267}
                    autoplay
                    showsButtons={true}                
                    >

                    {
                        imagens.map((item, i, arr) => {
                            return(
                                <SlideShow source={item.path}/>
                            );
                        })
                    }

                    {/*<View style={styles.container} >
                        <Image style={styles.image} source={require('../../imgs/rest3.png')} />
                    </View>
                    <View style={styles.container} >
                        <Image style={styles.image} source={require('../../imgs/rest5.png')} />
                    </View>
                    <View style={styles.container} >
                        <Image style={styles.image} source={require('../../imgs/rest4.png')} />
                    </View>
                    <View style={styles.container} >
                        <Image style={styles.image} source={require('../../imgs/rest1.png')} />
        </View>*/}
                    
                </Swiper>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 20,
        elevation: 5,
        borderRadius: 40,
        width: SCREEN_WIDTH - 40,
    },
    titulo:{
        fontSize: 18,
        fontWeight: '500',
        color: colors.subtitle,
        paddingBottom: 20,
        alignSelf: 'center'
    },
    image: {
        flex: 1,
        height: 100,
        elevation: 5,
        borderRadius: 40,
        width: SCREEN_WIDTH - 40,
    },
    wrapper: {
        flex: 1,
        height: 240,
        width: SCREEN_WIDTH,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    }
})

