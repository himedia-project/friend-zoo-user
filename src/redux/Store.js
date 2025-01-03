// src/store.js
import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './features/auth/authSlice'; // 경로를 실제 프로젝트 구조에 맞게 수정

const store = configureStore({
    reducer: {
        // auth: authReducer, // authSlice를 reducer로 추가
    },
});

export default store;
