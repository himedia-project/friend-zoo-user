import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import '../../css/PayCompletePage.css';
import { useNavigate } from 'react-router-dom';

const PayCompletePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // 폭죽 효과 실행
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="complete-container">
      <div className="complete-content">
        <div className="success-icon">✓</div>
        <h1>결제가 완료되었습니다!</h1>
        <p>주문하신 상품은 빠르게 배송해드리겠습니다.</p>
        <button className="home-button" onClick={() => navigate('/')}>
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default PayCompletePage;
