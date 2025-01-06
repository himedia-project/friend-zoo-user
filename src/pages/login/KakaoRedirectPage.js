import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import { getAccessToken, getMemberWithAccessToken } from '../../api/kakaoApi';
import { login } from '../../redux/loginSlice';

const KakaoRedirectPage = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const authCode = searchParams.get('code');

  useEffect(() => {
    // 카카오 로그인 처리
    getAccessToken(authCode).then((accessToken) => {
      console.log('getAccessToken: ', accessToken);
      // 카카오 사용자 정보 요청
      getMemberWithAccessToken(accessToken)
        .then((memberInfo) => {
          console.log('memberInfo: ', memberInfo);
          // dispatch를 이용하여 login action을 호출
          dispatch(login(memberInfo));

          if (memberInfo) {
            Swal.fire({
              title: '로그인 성공',
              text: '카카오 계정으로 로그인되었습니다.',
              icon: 'success',
              confirmButtonText: '확인',
            }).then((result) => {
              if (result.isConfirmed) {
                navigate('/');
              }
            });
          }
        })
        .catch((error) => {
          console.error('카카오 로그인 실패:', error);
          Swal.fire({
            title: '로그인 실패',
            text: '카카오 로그인에 실패했습니다.',
            icon: 'error',
            confirmButtonText: '확인',
          }).then(() => {
            navigate('/login');
          });
        });
    });
  }, [authCode]);

  return (
    <div>
      <div>Kakao Login Redirect</div>
    </div>
  );
};

export default KakaoRedirectPage;
