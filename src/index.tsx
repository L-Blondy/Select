import React from 'react';
import ReactDOM from 'react-dom';
import Global$ from 'src/styles/Global$';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Global$ />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);