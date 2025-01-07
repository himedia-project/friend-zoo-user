import axiosInstance from './axiosInstance';

export const getCategoryList = async () => {
  const response = await axiosInstance.get(`/category/list`);
  return response.data;
};
