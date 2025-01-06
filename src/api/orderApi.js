import axiosInstance from './axiosInstance';
import { API_SERVER_HOST } from '../config/apiConfig';

const host = `${API_SERVER_HOST}/api/order`;

// 주문 목록
export const getOrderList = async () => {
  const res = await axiosInstance.get(`${host}/hist/list`);
  return res.data;
};

// 주문 하기
export const postOrder = async (order) => {
  const res = await axiosInstance.post(`${host}`, order);
  return res.data;
};

// 주문 취소
export const cancelOrder = async (orderId) => {
  const res = await axiosInstance.delete(`${host}/cancel/${orderId}`);
  return res.data;
};
