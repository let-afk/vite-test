import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import { chatsReducer } from './chats/reducer';
import {profileReducer} from './profile/reducer';
import { messagesReducer } from './messages/reducer';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers ({
    profile: profileReducer,
    chats: chatsReducer,
    messages: messagesReducer,
    })

const persistConfig = {
    key: 'messanger',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore( 
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
