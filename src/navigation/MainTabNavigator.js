import React, {Component, PureComponent} from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createReduxBoundAddlistener } from 'react-navigation-redux-helpers';
import AppWithNavigationState from './LoginNavegator';
import colors from '../colors/index';
import NavigationServices from '../components/utilities/NavigationServices'

import TabBarIcon from '../components/icons/TabBarIcons';
import Buscou from '../screens/Buscar';
import Categorias from '../screens/Categorias';
import ChatRoom from "../screens/chatcomps/ChatRoom";
import DetailsScreen from "../screens/DetailsScreen";
import ChatNavigator from './ChatNav';
import ChatPrincipal_Screen from '../screens/chatcomps/Principal_Screen';
import PhoneSignUp from '../screens/PhoneSignUp'
import PhoneSignUpFromOutside from '../screens/PhoneSignUpFromOutside';
import SpecificCategory from '../screens/SpecificCategory';
import DetailsScreenImageView from '../screens/DetailsScreenImageView';
import MenuImg from '../components/utilities/menuImg';
import BasicImgCard from '../components/Cartoes/basicImgCard';

const BuscouStack = createStackNavigator({
  Buscou: {
    screen: Buscou,
    navigationOptions: () => ({
      header: null,
    }),
  },
  DetailsScreen: {
    screen: DetailsScreen,
    headerMode: 'none',
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.maincolor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.white,
      },
    }
  },
  ChatPrincipal_Screen: {
    screen: ChatPrincipal_Screen,
    navigationOptions: {
      header: null,
    }
  },
  SpecificCategory: {
    screen: SpecificCategory,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.maincolor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.white,
      },
    }
  },
  DetailsScreenImageView: {
    screen: DetailsScreenImageView,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.maincolor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.white,
      },
    }
  },
  MenuImg: {
    screen: MenuImg,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.maincolor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.white,
      },
    }
  },
  BasicImgCard: {
    screen: BasicImgCard,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.maincolor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.white,
      },
    }
  },
  PhoneSignUp: {
    screen: PhoneSignUp,
  },
  ChatRoom: {
    screen: ChatRoom,
  },
  PhoneSignUpFromOutside: {
    screen: PhoneSignUpFromOutside,
    navigationOptions: {
      header: null,
    }
  }
})

BuscouStack.navigationOptions = {
  tabBarLabel: 'Buscou',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'ios-search'
      }
    />
  ),
};

class BuscarNavigator extends PureComponent {

  static navigationOptions() {
    return {
      tabBarLabel: 'Buscou',
      tabBarIcon: ({ focused }) => (
        <TabBarIcon
          focused={focused}
          name={
            Platform.OS === 'ios' ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'ios-search'
          }
        />
      ),
    };
  }

  render() {
    return (
      <BuscouStack
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    )
  }
}

const CategoriasStack = createStackNavigator({
  Categorias: {
    screen: Categorias,
    navigationOptions: () => ({
      header: null,
    }),
  },
  SpecificCategory: {
    screen: SpecificCategory,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.maincolor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.white,
      },
    }
  },
  DetailsScreen: {
    screen: DetailsScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.maincolor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.white,
      },
    }
  },
  DetailsScreenImageView: {
    screen: DetailsScreenImageView,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.maincolor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.white,
      },
    }
  },
  MenuImg: {
    screen: MenuImg,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.maincolor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.white,
      },
    }
  },
  BasicImgCard: {
    screen: BasicImgCard,
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.maincolor,
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: colors.white,
      },
    }
  },
});

CategoriasStack.navigationOptions = {
  tabBarLabel: 'Categorias',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'ios-apps'}
    />
  ),
};

const ChatStack = createStackNavigator({
  ChatNavigator: {
    screen: ChatNavigator,
    navigationOptions: () => ({
      header: null,
    }),
  },
});

ChatStack.navigationOptions = {
  tabBarLabel: 'Chat',
  tabBarIcon: ({ focused, tintColor }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'ios-chatboxes'}

    />
  ),
};

class CategoriasNavigator extends Component {
  render() {
    return (
      <CategoriasStack
        ref={navigatorRef => {
          NavigationServices.setTopLevelNavigator(navigatorRef);
        }}
      />
    )
  }
}

export default createBottomTabNavigator({
  BuscouStack,
  CategoriasStack,
}, {
  navigationOptions: {
    tabBarLabel: 'Categorias',
    tabBarIcon: ({ focused }) => (
      <TabBarIcon
        focused={focused}
        name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'ios-apps'}
      />
    ),
  }
});
