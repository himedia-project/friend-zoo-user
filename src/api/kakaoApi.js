import axios from 'axios';

import { API_SERVER_HOST, FRONT_HOST } from '../config/apiConfig';

const rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
const client_secret = process.env.REACT_APP_KAKAO_CLIENT_SECRET;

// 리다이렉트 uri => kakaoRedirectPage로 이동
const redirect_uri = `${FRONT_HOST}/member/kakao`;

// 인증 code 요청 url
const auth_code_path = `https://kauth.kakao.com/oauth/authorize`;

// access token 요청 url
const access_token_url = `https://kauth.kakao.com/oauth/token`;

// 환경변수에서 값을 제대로 가져오는지 디버깅을 위해 로깅
console.log('REST API KEY:', process.env.REACT_APP_KAKAO_REST_API_KEY);
console.log('FRONT HOST:', FRONT_HOST);

// 카카오 로그인 요청 -> 카카오 로그인 페이지(리다이렉트 페이지)로 이동
export const getKakaoLoginLink = () => {
  const kakaoURL = new URL(auth_code_path);
  kakaoURL.searchParams.append('client_id', rest_api_key);
  kakaoURL.searchParams.append('redirect_uri', redirect_uri);
  kakaoURL.searchParams.append('response_type', 'code');

  console.log('getKakaoLoginLink kakaoURL: ', kakaoURL.toString());
  return kakaoURL.toString();
};

// 카카오 로그인 후 code를 받고, 서버가 대신 kakao oauth2서버에 access_token 요청
export const getAccessToken = async (authCode) => {
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/kakao/token?code=${authCode}`,
  );
  console.log('getAccessToken res: ', res);
  return res.data;
};

// 카카오 사용자 정보 서버에 요청
export const getMemberWithAccessToken = async (accessToken) => {
  const header = {
    withCredentials: true,
  };
  const res = await axios.get(
    `${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`,
    header,
  );
  return res.data;
};
