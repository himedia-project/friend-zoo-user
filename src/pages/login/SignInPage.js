import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/SignIn.css';
import { signupPost } from '../../api/loginApi';
import Swal from 'sweetalert2'; // SweetAlert2 임포트

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateCheck = () => {
    const phoneRegex = /^010-\d{4}-\d{4}$/;

    if (!phoneRegex.test(formData.phone)) {
      Swal.fire({
        title: '입력 오류',
        text: '전화번호는 010-XXXX-XXXX 형식으로 입력해주세요.',
        icon: 'warning',
        confirmButtonText: '확인',
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateCheck()) {
      return;
    }

    try {
      await signupPost(
        formData.name,
        formData.email,
        formData.password,
        formData.phone,
      );
      Swal.fire({
        title: '회원가입 성공',
        text: '회원가입이 완료되었습니다.',
        icon: 'success',
        confirmButtonText: '확인',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
    } catch (error) {
      console.error('회원가입 실패:', error);
      Swal.fire({
        title: '회원가입 실패',
        text: '회원가입에 실패했습니다. 다시 시도해주세요.',
        icon: 'error',
        confirmButtonText: '확인',
      });
    }
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
