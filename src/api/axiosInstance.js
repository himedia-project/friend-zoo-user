// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api", // 기본 URL 설정
});

export default axiosInstance;