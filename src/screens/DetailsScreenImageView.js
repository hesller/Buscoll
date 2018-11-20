import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import PhotoView from 'react-native-photo-view';
import Carousel from 'react-native-looped-carousel'
import colors from '../colors'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';

class DetailsScreenImageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            titulo: this.props.navigation.state.params.titulo,
            imagens: this.props.navigation.state.params.imagens,
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: String(navigation.state.params.titulo),
            params: navigation.state.params,
            headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: colors.white },
            headerStyle: {
                backgroundColor: colors.maincolor,
            },
        }
    }

    render() {
        return (
            <View style={{ flex: 1, alignContent: 'center', justifyContent:'center', alignItems:'center' }}>
                <Carousel 
                  style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
                  autoplay={false}
                  bullets={true}
                  arrows={true}
                  leftArrowText='  <<'
                  rightArrowText='>>  '
                >
                    {this.state.imagens.map((item, i) => {
                        return (
                            <PhotoView
                                source={{ uri: item }}
                                minimumZoomScale={1}
                                maximumZoomScale={4}
                                androidScaleType='fitCenter'
                                style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH,  }} 
                            />
                        );
                    })}

                </Carousel>
            </View>
        )
    }
}

const styles = StyleSheet.create({

})

export default withNavigation(DetailsScreenImageView);