import React from 'react';
import ReactDOM from 'react-dom/client';
import LoadingDemo from './LoadingDemo';
import {StandaloneThemeControl} from './DemoThemeSync';
import './demo.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LoadingDemo/>
    <StandaloneThemeControl page="loading"/>
  </React.StrictMode>,
);
