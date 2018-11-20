import { Platform } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '../constants/index';

export default {
  viewInner01: {
    flex: 1,
  },
  viewInner02: { 
    backgroundColor: '#2296f3',
    //borderBottomWidth: 1, 
    //borderBottomColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 170,
    width: SCREEN_WIDTH,
  },
  viewInner03: {
    flexDirection: 'row',
    padding: Platform.OS == 'android' ? null : 10,
    paddingTop: Platform.OS == 'android' ? 0 : null, 
    paddingLeft: Platform.OS == 'android' ? 10 : null,
    backgroundColor: 'white',
    marginHorizontal: 20, 
    shadowOffset:{width: 0, height: 0},
    shadowColor: 'black', 
    shadowOpacity: 0.2,
    elevation: 8, 
    height: 40,
    width: SCREEN_WIDTH * 0.8,
    marginTop: Platform.OS == 'android' ? 20 : null,
    marginBottom: Platform.OS == 'android' ? 20 : null,
    position: 'absolute',
    alignSelf: 'center',
  },
  iconePesquisa: {
    paddingTop: Platform.OS == 'android' ? 10 : null,
  },
  pesquisa: {
    flex: 1, 
    fontWeight: '700', 
    backgroundColor: 'white', 
    textAlignVertical: 'bottom',
    marginLeft: 10,
    fontSize: 15,
  },
}
