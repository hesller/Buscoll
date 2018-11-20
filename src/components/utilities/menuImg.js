import React, { Component, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableHighlight, ScrollView, View, Text, Modal } from 'react-native';
import { withNavigation } from 'react-navigation'
import Lightbox from 'react-native-lightbox';
import Carousel from 'react-native-looped-carousel';
import { H3 } from 'native-base';
import { Card, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PhotoView from 'react-native-photo-view';


import estilos from '../../estilos';
import colors from '../../colors';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants';


class MenuImg extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imagemCatalogo: this.props.imagemCatalogo,
      titulo: this.props.nome,
      tituloCartao: this.props.tituloCartao,
    }

  }

  render() {

    return (
      <View style={{ paddingTop: 20 }}>
        <Card title={this.state.tituloCartao}
          titleStyle={{ fontSize: 25, color: 'rgb(18,118,175)' }}
        >
          <TouchableHighlight
            underlayColor='rgba(18,118,175, 0.5)'
            onPress={() => {
              this.props.navigation.navigate('DetailsScreenImageView', {
                imagens: this.state.imagemCatalogo,
                titulo: this.state.titulo,
              })
            }}
          >
            <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }} >
              <Image
                source={{ uri: this.state.imagemCatalogo[0] }}
                style={{ height: 340, width: 300 }}
                resizeMode={'contain'}
              />
            </View>
          </TouchableHighlight>

        </Card>
      </View>
    );
  }
}

export default withNavigation(MenuImg)
