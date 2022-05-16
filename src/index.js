import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './assets/css/main.css'
import axios from 'axios'

axios.defaults.baseURL = 'https://customer-api.phamaiintrend.co';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);