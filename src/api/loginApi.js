import axiosInstance from './axiosInstance';
import axios from 'axios';
import { API_SERVER_HOST } from '../config/apiConfig';

const host = `${API_SERVER_HOST}/api/member`;

// 로그인
export const loginPost = async (email, password) => {
  const response = await axios.post(
    `${host}/login`,
    { email, password },
    {
      withCredentials: true,
    },
  );
  console.log(response.data);
  return response.data;
};

// 로그아웃
export const logoutPost = async () => {
  const response = await axiosInstance.post(`${host}/logout`);
  return response.data;
};

// 회원가입
export const signupPost = async (name, email, password, phone) => {
  const response = await axiosInstance.post(`${host}/join`, {
    name,
    email,
    password,
    phone,
  });
  return response.data;
};

// 회원가입, 이메일 중록 확인 요청
export const checkEmailPost = async (email) => {
  const response = await axiosInstance.post(`${host}/checkEmail`, { email });
  return response.data;
};

// 회원가입시, 비밀번호 확인 요청
export const checkPasswordPost = async (password) => {
  const response = await axiosInstance.post(`${host}/checkPassword`, {
    password,
  });
  return response.data;
};
