import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paymentApi } from '../../api/paymentApi';
import confetti from 'canvas-confetti';
import '../../css/PaymentSuccessPage.css';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const confirmComplete = useRef(false);

  // 페이지 로드 시 즉시 폭죽 효과 실행
  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  // 결제 확인 및 폭죽 효과
  useEffect(() => {
    const confirmPayment = async () => {
      if (confirmComplete.current) return;

      try {
        const paymentKey = searchParams.get('paymentKey');
        const orderId = searchParams.get('orderId');
        const amount = searchParams.get('amount');

        if (!paymentKey || !orderId || !amount) {
          throw new Error('필수 결제 정보가 누락되었습니다.');
        }

        // 결제 승인 요청
        confirmComplete.current = true;
        const response = await paymentApi.confirmPayment(
          paymentKey,
          orderId,
          parseInt(amount),
        );

        console.log('Payment confirmation response:', response);
      } catch (error) {
        console.error('결제 승인 실패:', error);
        confirmComplete.current = false;
        navigate('/payment/fail', {
          state: {
            orderId: searchParams.get('orderId'),
            message: error.response?.data?.message || error.message,
          },
        });
      }
    };

    confirmPayment();
  }, [searchParams, navigate]);

  return (
    <div className="complete-container">
      <div className="complete-content">
        <div className="success-icon">✓</div>
        <h1>결제가 완료되었습니다!</h1>
        <p>주문하신 상품은 빠르게 배송해드리겠습니다.</p>
        <button
          className="home-button"
          onClick={(e) => {
            e.preventDefault();
            navigate('/', { replace: true });
          }}
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
