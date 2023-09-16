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
    {/* <React.StrictMode> */}
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_ID}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
    {/* </React.StrictMode> */}
  </BrowserRouter>
);