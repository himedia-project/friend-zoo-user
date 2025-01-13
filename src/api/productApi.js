// productApi.js

import axiosInstance from './axiosInstance';

// 베스트
export const getBestItemProductList = async () => {
  // http://localhost:8080/api/product/list/all?best=Y
  const response = await axiosInstance.get(`/product/list/all?best=Y`);
  return response.data;
};

// 신규
export const getNewItemProductList = async () => {
  // http://localhost:8080/api/product/list/all
  const response = await axiosInstance.get(`/product/list/all`);
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
  // http://localhost:8080/api/product/list/mdPick=Y
  const response = await axiosInstance.get(`/product/list/all?mdPick=Y`);
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
    `/product/list/all?categoryId=${categoryId}`,
  );
  return response.data;
};

// search http://localhost:8080/api/product/list/산리오
export const getSearchProductList = async (keyword) => {
  const response = await axiosInstance.get(
    `/product/list/all?searchKeyword=${keyword}`,
  );
  return response.data;
};
