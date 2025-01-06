import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginPost } from '../../api/loginApi';
import '../../css/LoginPage.css';
import { login } from '../../redux/loginSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2'; // SweetAlert2 임포트

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
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
      Swal.fire({
        title: '로그인 성공',
        text: '로그인 되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });
    } catch (error) {
      console.error('로그인 실패:', error);
      Swal.fire({
        title: '로그인 실패',
        text: '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.',
        icon: 'error',
        confirmButtonText: '확인',
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
        <hr />
        <span>또는</span>
        <hr />
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
    </div>
  );
};

export default LoginPage;
