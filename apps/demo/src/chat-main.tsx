import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatDemo from './ChatDemo';
import {StandaloneThemeControl} from './DemoThemeSync';
import './demo.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChatDemo />
    <StandaloneThemeControl page="chat"/>
  </React.StrictMode>,
);
