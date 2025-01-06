import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginPost } from '../../api/loginApi';
import '../../css/LoginPage.css';
import { login } from '../../redux/loginSlice';
import { useDispatch } from 'react-redux';
import AlertModal from '../../components/common/AlertModal';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    // rememberEmail: false,
  });
  const [alertModal, setAlertModal] = useState({
    open: false,
    title: '',
    message: '',
    isSuccess: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginPost(loginForm.email, loginForm.password);
      console.log('로그인 성공:', response);

      dispatch(login(response));
      setAlertModal({
        open: true,
        title: '로그인 성공',
        message: '로그인 되었습니다.',
        isSuccess: true,
        onSuccess: () => {
          navigate('/');
        },
      });
    } catch (error) {
      console.error('로그인 실패:', error);
      setAlertModal({
        open: true,
        title: '로그인 실패',
        message: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
        isSuccess: false,
      });
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <div className="social-login">
        <button className="google-btn">Google로 시작하기</button>
        <button className="naver-btn">네이버로 시작하기</button>
        <button className="kakao-btn">카카오로 시작하기</button>
      </div>

      <div className="or-section">
        <hr></hr>
        <span>또는</span>
        <hr></hr>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          value={loginForm.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={loginForm.password}
          onChange={handleChange}
          required
        />
        {/* <label>
          <input
            type="checkbox"
            name="rememberEmail"
            checked={loginForm.rememberEmail}
            onChange={handleChange}
          />{' '}
          이메일 기억하기
        </label> */}
        <button type="submit" className="login-btn">
          로그인
        </button>
      </form>

      <div className="footer-links">
        <a href="#!">이메일 찾기</a> | <a href="#!">비밀번호 찾기</a>
      </div>

      <div className="guest-order">
        <Link to="/join">회원가입</Link>
      </div>

      <AlertModal
        open={alertModal.open}
        onClose={() => {
          setAlertModal({ ...alertModal, open: false });
          alertModal.onSuccess?.();
        }}
        title={alertModal.title}
        message={alertModal.message}
        isSuccess={alertModal.isSuccess}
      />
    </div>
  );
};

export default LoginPage;
