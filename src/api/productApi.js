// productApi.js

import axiosInstance from './axiosInstance';

import { API_SERVER_HOST } from '../config/apiConfig';

const host1 = `${API_SERVER_HOST}/api`;
const host = `${API_SERVER_HOST}/api/product`;

// 베스트
export const getBestItemProductList = async () => {
  const response = await axiosInstance.get(`${host}/list/best`);
  return response.data;
};

// 신규
export const getNewItemProductList = async () => {
  const response = await axiosInstance.get(`${host}/new`);
  return response.data;
};

// mdPick
export const getMDPickItemProductList = async () => {
  const response = await axiosInstance.get(`${host}/list/mdPick`);
  return response.data;
};

// style
export const getStyleItemProductList = async () => {
  const response = await axiosInstance.get(`${host1}/content/list`);
  return response.data;
};

// 상품사진
export const getImageView = async (fileName) => {
  const response = await axiosInstance.get(`${host}/view/${fileName}`);
  return response.data;
};

// 상품 상세
export const getProductById = async (productId) => {
  const response = await axiosInstance.get(`${host}/detail/${productId}`);
  return response.data;
};
