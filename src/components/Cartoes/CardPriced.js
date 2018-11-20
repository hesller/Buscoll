import React, { Component } from 'react'
import { View, Image, Text, ScrollView } from 'react-native';
import { CardSwiper, Card, Textarea, H3, Content } from 'native-base';
import estilos from '../../estilos';

export default class CardPriced extends Component {
    render() {
        return (
            <Content>
                <H3 style={estilos.h2Title} >{this.props.featuredTitle}</H3>
              <ScrollView>
                
              </ScrollView>

            </Content>
        );
    }
}