import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ChatMenuPortal from './ChatMenuPortal';
import './demo.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
    <ChatMenuPortal/>
  </React.StrictMode>,
);
