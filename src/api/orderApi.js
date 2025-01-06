import axiosInstance from './axiosInstance';

// 주문 목록
export const getOrderList = async () => {
  const res = await axiosInstance.get(`/order/hist/list`);
  return res.data;
};

// 주문 하기
export const postOrder = async (order) => {
  const res = await axiosInstance.post(`/order`, order);
  return res.data;
};

// 주문 취소
export const cancelOrder = async (orderId) => {
  const res = await axiosInstance.post(`/order/${orderId}/cancel`);
  return res.data;
};
