import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { store } from './redux/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
        domain="dev-0k6qlszkxhkmwlna.us.auth0.com"
        clientId="LMfzaukwwRv1v5AKPrIl1g5h8H7S8bqm"
        authorizationParams={{
            redirect_uri: window.location.origin
        }}
    >
        <Provider store={store}>
            <App />
        </Provider>
    </Auth0Provider>
);


