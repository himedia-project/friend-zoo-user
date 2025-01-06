import axiosInstance from './axiosInstance';
import { API_SERVER_HOST } from '../config/apiConfig';

const host = `${API_SERVER_HOST}/api/cart`;

export const getCartItems = async () => {
  const res = await axiosInstance.get(`${host}/item/list`);
  return res.data;
};

// 장바구니 수량 변경
// export const postChangeCart = async (cartItemId, productId, qty) => {
//   const res = await axiosInstance.post(`${host}/change`, {
//     cartItemId,
//     productId,
//     qty,
//   });
//   return res.data;
// };
export const postChangeCart = async (cartItem) => {
  const res = await axiosInstance.post(`${host}/change`, cartItem);
  return res.data;
};
