import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './myOwnTailwind.css'
import reportWebVitals from './reportWebVitals';
import { KshManagerProvider } from './KshManager';
import Lofi from './Components/Lofi';
import RouteMe from './RouteMe';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouteMe/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
