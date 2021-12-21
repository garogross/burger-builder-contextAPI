import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import BurgerProvider from './store/burgerProvider';


const app = (
    <BurgerProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
    </BurgerProvider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
