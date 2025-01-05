import axiosInstance from './axiosInstance';
import { API_SERVER_HOST } from '../config/apiConfig';

const host = `${API_SERVER_HOST}/api/heart`;

export const getHeartProducts = async () => {
  const res = await axiosInstance.get(`${host}/product/list`);
  return res.data;
};

export const changeHeartProduct = async (productId) => {
  const res = await axiosInstance.post(`${host}/product`, { productId });
  return res.data;
};

// 좋아요한 콘텐츠 리스트
export const getHeartContents = async () => {
  const res = await axiosInstance.get(`${host}/content/list`);
  return res.data;
};

// 좋아요한 콘텐츠 추가
export const changeHeartContent = async (contentId) => {
  const res = await axiosInstance.post(`${host}/content`, { contentId });
  return res.data;
};
