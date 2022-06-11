import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import "antd/dist/antd.css";
import 'antd-button-color/dist/css/style.css';
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './sass/index.scss'

import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
