import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import { AsyncStorage } from 'react-native';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer, persistCombineReducers } from 'redux-persist';
import { createWhitelistFilter } from 'redux-persist-transform-filter'
import storage from 'redux-persist/lib/storage';
import reducer from './reducers';

// importing Reducers
import * as LoggedOut from './reducers/loggedOut';
import * as listenFirebase from './reducers/listenFirebase';
import * as phoneSendCode from './reducers/phoneSendCode';
import * as appReducer from './reducers/AppReducer';
import * as contactList from './reducers/ContactListReducer';
import * as getConversationsListReducer from './reducers/GetConversationsListReducer';
import * as getConversationHistory from './reducers/GetConversationHistory';


// ===========================================
//            MIDDLEWARES
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

// ===========================================
//             INITIAL STATE
const initialState = {
  phoneSendCode: {
    message: "",
    codeInput: "",
    phoneNumber: "+55",
    confirmResult: null,
    loading_LogOut: false,
    name: '',
  },
  appReducer: {
    contato: '',
    phoneNumber: '',
    userContacts: null,
    mensagens: [],
    loadingChatRoom: false,
    message: '',
  },
  contactList: {
    userContacts: [],
  },
  getConversationsListReducer: {
    conversas: [],
    contatos: [],
    conversationsList: [],
  },
  getConversationHistory: {
    mensagens: [],
  },
  perfilReducer: {
    name: '',
    message: '',
    profUri: null,
    loading: false,
    categories: null,
    coverImages: [],
    catalogImages: [],
    ambienteImages: [],
    mapPreview: null,
    loadingMessage: '',
    businessLoading: false,
  },
  buscarReducer: {
    loading: false,
    adsList: null,
    loadingAds: true,
    featuredAds: [],
    allAds: [],
  },
  categoriesReducer: {
    isLoading: false,
    message: '',
  }
}

// ==================================================
//           PERSIST REDUCER CONFIGS
const persistListenFirebase = {
  key: 'listenFirebase',
  storage: AsyncStorage,
  transform: [
    createWhitelistFilter('listenFirebase', []),
    createWhitelistFilter('phoneSendCode', []),
  ]
}
const persistUserStatus = {
  timeout: 10000,
  key: 'listenFirebase',
  storage: AsyncStorage,
  whitelist: ['listenFirebase', 'phoneSendCode', 'getConversationsListReducer', 'perfilReducer', 'buscarReducer']
}

const persistedReducer = persistReducer(persistUserStatus, reducer);

// =============================================
//        CONFIGURANDO O REDUCER



// ==============================================
//        CONFIGURANDO A STORE

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
  return createStore(persistedReducer, initialState, enhancer);
}


const store = configureStore(initialState);
const persistor = persistStore(store);
export { store, persistor };
