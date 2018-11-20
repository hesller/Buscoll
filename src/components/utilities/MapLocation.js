import React, { Component, PureComponent } from 'react'
import { Text, StyleSheet, View, Button } from 'react-native'
import MapView, { AnimatedRegion, Animated, Marker } from 'react-native-maps';
import { SCREEN_WIDTH } from '../../constants';
import Geocoder from 'react-native-geocoder';
import colors from '../../colors'


export default class MapLocation extends PureComponent {
    constructor(props) {
        super(props);

        Geocoder.fallbackToGoogle("AIzaSyCIYjZE2baBq69I_HChERljIMrn-C1lLhg");

        this.state = {
            region: {}
        }
    }

    componentDidMount() {
        
    }

    render() {

        return (
            <MapView
                style={styles.map}
                region={{
                    latitude: this.props.lat,
                    longitude: this.props.lng,
                    latitudeDelta: 0.00422,
                    longitudeDelta: 0.005421,
                }}
                onRegionChange={this.props.onRegionChange}
            >
            <Marker
                coordinate={{latitude: this.props.lat, longitude: this.props.lng }}
                pinColor={colors.maincolor}
            />
            </MapView>
        )
    }
}

const styles = StyleSheet.create({
    map: {
        height: 200,
        width: SCREEN_WIDTH - 40,
        marginVertical: 20
    }
})
