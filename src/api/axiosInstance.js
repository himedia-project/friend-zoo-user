// src/utils/axiosInstance.js
import axios from 'axios';
import store from '../redux/store';
import { API_SERVER_HOST } from '../config/apiConfig';
import { login } from '../redux/loginSlice';

const axiosInstance = axios.create({
  baseURL: `${API_SERVER_HOST}/api`,
  // 쿠키 허용
  withCredentials: true,
});

// JWT 토큰에서 사용자 정보 추출하는 함수
const parseJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join(''),
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('JWT 파싱 에러:', error);
    return null;
  }
};

const refreshJWT = async () => {
  const res = await axiosInstance.get(`/member/refresh`);

  console.log('----------------------');
  console.log(res.data);

  return res.data;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().loginSlice.accessToken;
    console.log('axiosInstance.interceptors.request.use. token', token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof URLSearchParams) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const navigate = useNavigate();
    console.log('interceptor error: ', error);
    if (
      error.response.data &&
      error.response.data.error === 'ERROR_ACCESS_TOKEN'
    ) {
      const result = await refreshJWT();
      console.log('refreshJWT RESULT', result);

      const newAccessToken = result.newAccessToken;

      // JWT 토큰에서 사용자 정보 추출
      const userInfo = parseJWT(newAccessToken);

      // store.dispatch(setAccessToken(accessToken));
      // Redux store 업데이트 (accessToken과 함께 사용자 정보도 업데이트)
      if (userInfo) {
        store.dispatch(
          login({
            email: userInfo.email,
            roles: userInfo.roleNames,
            accessToken: newAccessToken,
          }),
        );
      }

      return axiosInstance(error.config); // 재요청
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
