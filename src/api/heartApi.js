import axiosInstance from './axiosInstance';

// 좋아요한 상품 리스트
export const getHeartProducts = async () => {
  const res = await axiosInstance.get(`/heart/product/list`);
  return res.data;
};

// 좋아요한 상품 추가
export const changeHeartProduct = async (productId) => {
  const res = await axiosInstance.post(`/heart/product/${productId}`);
  return res.data;
};

// 좋아요한 콘텐츠 리스트
export const getHeartContents = async () => {
  const res = await axiosInstance.get(`/heart/content/list`);
  return res.data;
};

// 좋아요한 콘텐츠 추가
export const changeHeartContent = async (contentId) => {
  const res = await axiosInstance.post(`/heart/content/${contentId}`);
  return res.data;
};
