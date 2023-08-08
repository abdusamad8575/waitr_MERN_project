import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux-toolkit/store'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
    <GoogleOAuthProvider clientId={`135168302582-udmqvs3egi8bi6ggp6qpvgiuupm1jj9b.apps.googleusercontent.com`}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);