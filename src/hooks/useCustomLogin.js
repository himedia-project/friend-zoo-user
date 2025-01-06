import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { logout } from '../redux/loginSlice';

export const AUTH_ERROR_TYPES = {
  ERROR_ACCESS_TOKEN: 'ERROR_ACCESS_TOKEN',
  ERROR_ACCESSDENIED: 'ERROR_ACCESSDENIED',
};

const useCustomLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alertModal, setAlertModal] = useState({
    open: false,
    title: '',
    message: '',
    isSuccess: false,
  });

  // 인증 에러 처리
  const handleAuthError = (error) => {
    const errorMessage = error?.response?.data?.error;

    if (
      errorMessage === AUTH_ERROR_TYPES.ERROR_ACCESS_TOKEN ||
      errorMessage === AUTH_ERROR_TYPES.ERROR_ACCESSDENIED
    ) {
      dispatch(logout());
      setAlertModal({
        open: true,
        title: '로그인 필요',
        message: '세션이 만료되었습니다. 다시 로그인해 주세요.',
        isSuccess: false,
        onSuccess: () => {
          navigate('/login');
        },
      });
      return true;
    }
    return false;
  };

  // 로그인 필요 처리
  const requireAuth = (email) => {
    if (!email) {
      setAlertModal({
        open: true,
        title: '로그인 필요',
        message: '로그인을 하셔야 합니다.',
        isSuccess: false,
        onSuccess: () => {
          navigate('/login');
        },
      });
      return false;
    }
    return true;
  };

  return {
    alertModal,
    setAlertModal,
    handleAuthError,
    requireAuth,
  };
};

export default useCustomLogin;
