import axiosInstance from './axiosInstance';
import axios from 'axios';
import { API_SERVER_HOST } from '../config/apiConfig';

const host = `${API_SERVER_HOST}/api/cart`;

export const getCartItems = async () => {
  const res = await axiosInstance.get(`${host}/item/list`);
  return res.data;
};

export const postChangeCart = async (cartItem) => {
  const res = await axiosInstance.post(`${host}/change`, cartItem);
  return res.data;
};
