import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { createReduxHistoryContext } from 'redux-first-history';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createBrowserHistory } from 'history';

import rootReducer from './reducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const { createReduxHistory, routerMiddleware, routerReducer } =
    createReduxHistoryContext({
        history: createBrowserHistory()
        // other options if needed
    });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [thunk.withExtraArgument(), routerMiddleware];

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme']
};

const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({ router: routerReducer, ...rootReducer })
);

export const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

export const history = createReduxHistory(store);
