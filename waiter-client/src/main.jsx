import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import store from './redux-toolkit/store'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import App from './App.jsx'
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  {/* <React.StrictMode> */}
    {/* <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_ID}> */}
    <GoogleOAuthProvider clientId={'135168302582-shh20g9vftn9he0k86sv9mpdpphjql8s.apps.googleusercontent.com'}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  {/* </React.StrictMode> */}
  </BrowserRouter>
)
