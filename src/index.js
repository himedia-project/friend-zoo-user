// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // 수정: 'react-dom'에서 'react-dom/client'로 변경
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/Store';
import {BrowserRouter} from "react-router-dom"; // Redux store 경로에 맞게 수정

const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot 사용
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);
