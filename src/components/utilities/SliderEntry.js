import React, { PureComponent } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles from '../../estilos/SliderEntryStyles';
import NavigationServices from '../utilities/NavigationServices';
import { withNavigation } from 'react-navigation'

class SliderEntry extends PureComponent {

    static propTypes = {
        data: PropTypes.object.isRequired,
        even: PropTypes.bool,
        parallax: PropTypes.bool,
        parallaxProps: PropTypes.object
    };

    get image () {
        const { data, parallax, parallaxProps, even, imagemCapa  } = this.props;
        return parallax ? (
            <ParallaxImage
              source={{ uri: data.illustration}}
              containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
              style={styles.image}
              parallaxFactor={0.35}
              showSpinner={true}
              spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
              {...parallaxProps}
            />
        ) : (
            <Image
              source={{ uri: data.illustration}}
              style={styles.image}
            />
        );
    }

    render () {
        const { data: { title, subtitle }, even } = this.props;

        const uppercaseTitle = title ? (
            <Text
              style={[styles.title, even ? styles.titleEven : {}]}
              numberOfLines={2}
            >
                { title.toUpperCase() }
            </Text>
        ) : false;
        
        return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.slideInnerContainer}
              onPress={() => { this.props.navigation.navigate('DetailsScreen',
                {
                    nome: this.props.data.nome,
                    endereco: this.props.data.rua,
                    bairro: this.props.data.bairro,
                    numero: this.props.data.numero,
                    cidade: this.props.data.cidade,
                    estado: this.props.data.estado,
                    telefone: this.props.data.telefone,
                    keywords: this.props.data.keywords,
                    imagemCapa: this.props.data.imagemCapa,
                    imagemAmbiente: this.props.data.imagemAmbiente,
                    imagemCatalogo: this.props.data.imagemCatalogo,
                    mapa: this.props.data.mapaLatLng,
                    horario: this.props.data.horario,
                }); 
                }}
              >
                <View style={styles.shadow} />
                <View style={[styles.imageContainer, even ? styles.imageContainerEven : {}]}>
                    { this.image }
                    <View style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]} />
                </View>
                <View style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
                    { uppercaseTitle }
                    <Text
                      style={[styles.subtitle, even ? styles.subtitleEven : {}]}
                      numberOfLines={2}
                    >
                        { subtitle }
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

export default withNavigation(SliderEntry);