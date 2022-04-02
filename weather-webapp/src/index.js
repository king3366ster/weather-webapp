import React from 'react';
import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';
import './index.css';

import Routes from './Routes';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  container
);

// const root = createRoot(container);

// root.render(
//   <React.StrictMode>
//     <Routes />
//   </React.StrictMode>,
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
