// productApi.js

import axiosInstance from './axiosInstance';

// 베스트
export const getBestItemProductList = async () => {
  const response = await axiosInstance.get(`/product/list/best`);
  return response.data;
};

// 신규
export const getNewItemProductList = async () => {
  const response = await axiosInstance.get(`/product/new`);
  return response.data;
};

// mdPick
// 상품 상세
export const getProductById = async (productId) => {
  const response = await axiosInstance.get(`/product/detail/${productId}`);
  return response.data;
};

// mdPick (멤버 DTO 오류로 요청 안됨)
export const getMDPickItemProductList = async () => {
  const response = await axiosInstance.get(`/product/list/mdPick`);
  return response.data;
};

// style
export const getStyleItemProductList = async () => {
  const response = await axiosInstance.get(`/content/list`);
  return response.data;
};

// 해당 카테고리 조회
export const getCategoryId = async (categoryId) => {
  const response = await axiosInstance.get(
    `/product/detail/category/${categoryId}`,
  );
  return response.data;
};

// search http://localhost:8080/api/product/list/산리오
export const getSearchProductList = async (keyword) => {
  const response = await axiosInstance.get(`/product/list/${keyword}`);
  return response.data;
};
