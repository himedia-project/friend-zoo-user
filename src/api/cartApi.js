import axiosInstance from './axiosInstance';

export const getCartItems = async () => {
  const res = await axiosInstance.get(`/cart/item/list`);
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
  const res = await axiosInstance.post(`/cart/change`, cartItem);
  return res.data;
};
