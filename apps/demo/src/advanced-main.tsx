import React from 'react';
import ReactDOM from 'react-dom/client';
import AdvancedDemo from './AdvancedDemo';
import {StandaloneThemeControl} from './DemoThemeSync';
import './demo.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AdvancedDemo/>
    <StandaloneThemeControl page="advanced"/>
  </React.StrictMode>,
);
