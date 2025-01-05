import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './features/auth/authSlice'; // 경로를 실제 프로젝트 구조에 맞게 수정
import loginSlice from './loginSlice';

const store = configureStore({
  // 여러 리듀서들을 하나로 결합
  reducer: {
    loginSlice: loginSlice,
  },
});

export default store;
