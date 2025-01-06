import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/JoinPage.css';

const JoinPage = () => {
  return (
    <div className="join-container">
      <h1>Join</h1>

      <div className="social-login">
        <button className="google-btn">Google로 가입하기</button>
        <button className="naver-btn">네이버로 가입하기</button>
        <button className="kakao-btn">카카오로 가입하기</button>
      </div>

      <div className="or-section">
        <hr></hr>
        <span>또는</span>
        <hr></hr>
      </div>

      <div className="join-form">
        <Link to="/signin">
          <button className="join-btn">ID/PW 회원가입</button>
        </Link>
      </div>

      <div className="footer-links">
        <span>이미 계정이 있으신가요?</span>
        <Link to="/login"> 로그인</Link>
      </div>
    </div>
  );
};

export default JoinPage;
