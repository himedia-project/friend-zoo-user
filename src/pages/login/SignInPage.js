import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/SignIn.css';
import { signupPost } from '../../api/loginApi';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직 추가
    console.log(formData);
    signupPost(
      formData.name,
      formData.email,
      formData.password,
      formData.phone,
    );
    console.log('회원가입 완료');
    alert('회원가입 완료하였습니다');
    navigate('/login');
  };

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="이름"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="tel"
            name="phone"
            placeholder="연락처"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          가입하기
        </button>
      </form>

      <div className="footer-links">
        <span>이미 계정이 있으신가요?</span>
        <Link to="/login"> 로그인</Link>
      </div>
    </div>
  );
};

export default SignInPage;
