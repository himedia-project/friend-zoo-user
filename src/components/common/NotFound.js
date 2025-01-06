import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCustomLogin from '../../hooks/useCustomLogin';

const NotFound = () => {
  const navigate = useNavigate();
  const { setAlertModal } = useCustomLogin();

  useEffect(() => {
    setAlertModal({
      open: true,
      title: '페이지 오류',
      message: '아직 사용못하는 페이지입니다.',
      isSuccess: false,
      onSuccess: () => {
        navigate('/'); // 메인 페이지로 리다이렉트
      },
    });
  }, []);

  return null; // 실제 404 페이지를 렌더링하지 않음
};

export default NotFound;
