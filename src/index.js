import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import { store, history, persistor } from './store';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './containers/ErrorBoundary';
import { CurrentChatProvider } from './containers/Pages/ChatBox/ChatContext';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
    <React.StrictMode>
        <CurrentChatProvider>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Router history={history}>
                        <ErrorBoundary>
                            <App />
                        </ErrorBoundary>
                    </Router>
                </PersistGate>
            </Provider>
        </CurrentChatProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
