import React from 'react';
import { StyleSheet, Platform, Image, Text, 
  View, ScrollView, SafeAreaView, TextInput,
  StatusBar,
  TouchableHighlight} from 'react-native';
  import { withNavigation } from 'react-navigation'

//importando icones
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../colors';

class TituloCategorias extends React.Component {
  constructor() {
    super();
    this.state = {
      // firebase things?
    };
  }

  render() {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
          <Text style={{ fontSize: 20, fontWeight: '800', color: Colors.black }} >
              {this.props.titulo}
          </Text>
          <TouchableHighlight 
            onPress={() => {this.props.navigation.navigate('SpecificCategory', { titulo: this.props.titulo})}}
            underlayColor='rgba(255, 255, 255, 0.5)'
          >
          <Text style={{ fontWeight: '100', color: Colors.blue02 }} >
              Ver todos >>
          </Text>
          </TouchableHighlight>
        </View>
      );
  }
}

export default withNavigation(TituloCategorias)