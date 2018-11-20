import React, { Component } from 'react'
import { Text, View, FlatList, TouchableHighlight, StyleSheet } from 'react-native'
import  UserAvatar from 'react-native-user-avatar'
import { ActionCreators } from '../../redux/actions';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import _ from 'lodash';
import colors from '../../colors';


class Conversas extends Component {

  constructor(props) {
    super(props);

    this.props.getConversationList();
  }

  componentWillMount() {
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    nextProps.conversationsList;
  }
  
  _keyExtractor(item) {
    item.contactDetails.uid
  };

  _renderItem(item) {
    var dataString = String(item.createdAt).trim();
    var dataGMT = dataString.search('GMT');
    // taking the last message
    //var takeLastMsg = _.last(item);
    return (
      <TouchableHighlight
        onPress={() => this.props.route.navigation.navigate('ChatRoom', {
          uid: item.contactDetails.uid,
          name: item.contactDetails.name,
          phoneNumber: item.contactDetails.phoneNumber,
          photoURL: item.contactDetails.photoURL,
          email: item.contactDetails.email,
          title: item.contactDetails.name,
        })}
        underlayColor='transparent' >
        <View style={styles.viewWrapper} >
          { item.contactDetails.photoURL == null ?
              <UserAvatar size="50" name={item.contactDetails.name} />
            :
              <UserAvatar size="50" name={item.contactDetails.name}  src={String(item.contactDetails.photoURL)} />
          }
          
          <Text style={{ position: 'absolute', top: 15, left: 80, fontSize: 18  }}>{item.contactDetails.name}</Text>
          <Text style={styles.lastMsg} >{item.text}</Text>
          <Text style={{ position: 'absolute', top: 20, right: 35,  }}>{dataString.substr(dataGMT - 10, 6)}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View>
        {this.props.conversationsList.length == 0 ? 
          <Text>Suas conversas serão listadas aqui...</Text>
        :
          <FlatList
            data={this.props.conversationsList}
            renderItem={({ item }) => this._renderItem(item)}
            keyExtractor={(item) => this._keyExtractor(item)}
          />
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  viewWrapper: {
    paddingVertical: 10, 
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGray
  },
  lastMsg: {
    position: 'absolute', 
    top: 35, 
    left: 80, 
    fontWeight: 'bold',
  },


})

const mapStateToProps = (state) => {
  return {
    conversas: state.getConversationsListReducer.conversas,
    contatos: state.getConversationsListReducer.contatos,
    conversationsList: state.getConversationsListReducer.conversationsList,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getConversationList: () => { dispatch(ActionCreators.getConversationList()) },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conversas);
