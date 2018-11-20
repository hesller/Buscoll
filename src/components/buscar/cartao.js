import React, {Component} from 'react';
import { View, ScrollView, Animated, Text, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';

class Cartao extends Component {
  /*
   this simple code renders a list given in item
   redenrizarCartoes() {
    return this.props.data.map( item => {
      return this.props.renderCard(item);
    });
  }
  */
  redenrizarCartoes() {
    return this.props.data.map( item => {
      return this.props.renderCard(item);
    });
  }
  
  render() {
    return (
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
       {this.redenrizarCartoes()}
      </ScrollView>
    )
  }
}

export default Cartao;