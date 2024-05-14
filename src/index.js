import React from 'react';
import ReactDOM from 'react-dom';
import Main from './Main.tsx';
import { AppProvider } from './AppContext.tsx'; 
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppProvider> 
    <BrowserRouter>  
        <Main />
      </BrowserRouter>
    </AppProvider>
  </React.StrictMode>
);

reportWebVitals();
