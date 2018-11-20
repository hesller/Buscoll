import * as React from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { connect } from 'react-redux'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Conversas from './Conversas';
import Contatos from './Contatos';
import AdicionarContatos from './AdicionarContatos';
import colors from '../../colors';
import Perfil from './Perfil_Screen';
import { ActionCreators } from '../../redux/actions';
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../../constants';
/*
const Conversas = () => (
  <View style={[styles.container, { backgroundColor: '#ff4081' }]} />
);
const Contatos = () => (
  <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
);
*/


class ChatPrincipal_Screen extends React.PureComponent {
  constructor(props){
    super(props);

  }

  componentWillMount() {
    
  }

  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Conversas', navigation: this.props.navigation },
      { key: '2', title: 'Contatos', navigation: this.props.navigation },
      { key: '3', title: 'Perfil', navigation: this.props.navigation },
    ],
  };

  render() {
    return (
      <View style={{ flex: 1 }} >
        <StatusBar backgroundColor='#2296f3' />
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            //1: () => <Conversas navigation={this.props.navigation} />,
            //2: () => <Contatos navigation={this.props.navigation} />,
            //3: () => <Perfil navigation={this.props.navigation} />,
            1: Conversas,
            2: Contatos,
            3: Perfil,
          })}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

const mapStateToProps = (state) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => { dispatch(ActionCreators.fetchCategories())}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPrincipal_Screen);
