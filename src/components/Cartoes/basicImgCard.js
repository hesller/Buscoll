import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ImageBackground, StatusBar, TouchableHighlight, Image } from "react-native";
import { H1, H2, H3, Text } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { withNavigation } from 'react-navigation';
import PhotoView from 'react-native-photo-view';
import Carousel from 'react-native-looped-carousel';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants';



class BasicCardImg extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imagens: this.props.sourceImage,
            titulo: this.props.nome,
        }
    }

    renderCarousel = (imagens) => {
        return (
            <View>
                <Carousel
                    style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT * 0.3 }}
                    autoplay={true}
                //bullets={true}
                >
                    {imagens.map((item, i) => {
                        return (
                            <TouchableHighlight
                                underlayColor='rgba(18,118,175, 0.5)'
                                onPress={() => {
                                    this.props.navigation.navigate('DetailsScreenImageView', {
                                        imagens: this.state.imagens,
                                        titulo: this.state.titulo,
                                    })
                                }}
                            >
                                <View>
                                    <Image
                                        source={{ uri: item }}
                                        style={{ height: SCREEN_HEIGHT * 0.3, width: SCREEN_WIDTH }}
                                    />
                                </View>
                            </TouchableHighlight>
                        )
                    })}
                </Carousel>
            </View>
        )
    }

    render() {
        return (
            <View style={{ elevation: 5, }} >
                {this.renderCarousel(this.state.imagens)}
            </View>
        );
    }
}

export default withNavigation(BasicCardImg);
