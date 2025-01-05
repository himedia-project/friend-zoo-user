// productApi.js

import axiosInstance from './axiosInstance';

import { API_SERVER_HOST } from '../config/apiConfig';

const host = `${API_SERVER_HOST}/api/product`;

// 베스트
export const getBestItemProductList = async () => {
  const response = await axiosInstance.get(`${host}/list?best=Y`);
  return response.data;
};

// 신규
export const getNewItemProductList = async () => {
  const response = await axiosInstance.get(`${host}/new`);
  return response.data;
};

// mdPick (멤버 DTO 오류로 요청 안됨)
export const getMDPickItemProductList = async () => {
  const response = await axiosInstance.get(`${host}/list?mdPick=Y`);
  return response.data;
};

// 상품사진
export const getImageView = async (fileName) => {
  const response = await axiosInstance.get(`${host}/view/${fileName}`);
  return response.data;
};
