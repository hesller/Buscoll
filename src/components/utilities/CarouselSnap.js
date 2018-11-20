import React, { Component, PureComponent } from 'react'
import {
    Platform,
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    Alert,
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Spinner from 'react-native-loading-spinner-overlay'
import SliderEntry from './SliderEntry';
import { SCREEN_WIDTH } from '../../constants';
import { ENTRIES1, ENTRIES2 } from '../../data/entries';
import { sliderWidth, itemWidth } from '../../estilos/SliderEntryStyles';
import styles, { colors } from '../../estilos/EstCarouselSnapStyles';
import { connect } from 'react-redux';
import Colors from '../../colors'
import _ from 'lodash'

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;


class CarouselSnap extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
            adsFeaturedFinal: [],
            loading: true,
        };
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        nextProps.adsFeatured;
        nextProps.loadingAds;
    }

    async componentDidMount() {
        await this.props.adsFeatured;
    }

    _keyExtractor = (item, index) => item.nome;

    _renderItemWithParallax({ item, index }, parallaxProps) {
        return (
            <SliderEntry
                data={item}
                even={(index + 1) % 2 === 0}
                parallax={false}
                parallaxProps={parallaxProps}
                imagemCapa={item.imagemCapa}
            />
        );
    }

    mainExample(number, title, data) {
        const { slider1ActiveSlide } = this.state;

        return (
            <View style={styles.exampleContainerTransparent}>
                <Text style={styles.title}>{this.props.title}</Text>
                <Text style={styles.subtitle}>Confira as melhores promoções desta semana</Text>
                <Carousel
                    ref={c => this._slider1Ref = c}
                    data={data}
                    renderItem={this._renderItemWithParallax}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    hasParallaxImages={false}
                    firstItem={SLIDER_1_FIRST_ITEM}
                    inactiveSlideScale={0.9}
                    inactiveSlideOpacity={0.7}
                    // inactiveSlideShift={20}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    loop={true}
                    loopClonesPerSide={2}
                    autoplay={this.props.autoplay}
                    autoplayDelay={500}
                    autoplayInterval={5000}
                    onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index })}
                    initialNumToRender={1}
                    removeClippedSubviews={true}                    
                />
                {/*<Pagination
                        dotsLength={data.length}
                        activeDotIndex={slider1ActiveSlide}
                        containerStyle={styles.paginationContainer}
                        dotColor={'rgba(0, 0, 0, 0.92)'}
                        dotStyle={styles.paginationDot}
                        inactiveDotColor={'rgba(169, 169, 169, 0.9)'}
                        inactiveDotOpacity={0.4}
                        inactiveDotScale={0.6}
                        carouselRef={this._slider1Ref}
                        tappableDots={!!this._slider1Ref}
                    />*/}
            </View>
        );

    }

    render() {
        const { adsFeatured, loadingAds } = this.props;
        const { adsFeaturedFinal } = this.state;
        const example1 = this.mainExample(1, 'Default layout', adsFeatured);
        
        if (loadingAds === false) {
            return (
                <View style={styles.exampleContainerTransparent}>
                    {example1}
                </View>
            );
        } else {
            return (
                <View style={styles.exampleContainerTransparent}>
                    <Text style={styles.subtitle} >Carregando destaques da semana...</Text>
                    <ActivityIndicator size="large" color={Colors.maincolor} />
                </View>
            );
        }
        
    }
}

const estilos = StyleSheet.create({
    text: {
        alignSelf: 'center',
        fontSize: 17,
        fontWeight: '400',
    }
})


const mapStateToProps = (state) => {
    return {
        loadingAds: state.buscarReducer.loadingAds,
        adsFeatured: state.buscarReducer.featuredAds,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => { dispatch(ActionCreators.fetchCategories()); },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarouselSnap)
