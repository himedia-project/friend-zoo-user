import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paymentApi } from '../../api/paymentApi';

const PaymentFailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handlePaymentCancel = async () => {
    try {
      const orderId = searchParams.get('orderId');
      if (!orderId) {
        throw new Error('주문 정보가 없습니다.');
      }
      await paymentApi.cancelPayment(orderId, {
        cancelReason: '사용자 결제 취소',
      });
      alert('결제가 취소되었습니다.');
      navigate('/cart');
    } catch (error) {
      console.error('결제 취소 실패:', error);
      alert('결제 취소에 실패했습니다: ' + error.message);
    }
  };

  return (
    <div className="payment-fail-container">
      <h1>결제 실패</h1>
      <p>결제 중 문제가 발생했습니다.</p>
      <p>에러 메시지: {searchParams.get('message')}</p>
      <div className="button-group">
        <button onClick={handlePaymentCancel} className="cancel-button">
          결제 취소
        </button>
        <button onClick={() => navigate('/cart')} className="back-button">
          장바구니로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default PaymentFailPage;
