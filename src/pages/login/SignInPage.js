import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/SignIn.css';
import { signupPost } from '../../api/loginApi';
import { useNavigate } from 'react-router-dom';
import AlertModal from '../../components/common/AlertModal';

const SignInPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
  });
  const [alertModal, setAlertModal] = useState({
    open: false,
    title: '',
    message: '',
    isSuccess: false,
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
      setAlertModal({
        open: true,
        title: '입력 오류',
        message: '전화번호는 010-XXXX-XXXX 형식으로 입력해주세요.',
        isSuccess: false,
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
      setAlertModal({
        open: true,
        title: '회원가입 성공',
        message: '회원가입이 완료되었습니다.',
        isSuccess: true,
        onSuccess: () => {
          navigate('/login');
        },
      });
    } catch (error) {
      console.error('회원가입 실패:', error);
      setAlertModal({
        open: true,
        title: '회원가입 실패',
        message: '회원가입에 실패했습니다. 다시 시도해주세요.',
        isSuccess: false,
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

export default SignInPage;
