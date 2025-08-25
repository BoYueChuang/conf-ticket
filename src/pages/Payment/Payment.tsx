import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { TicketItem } from '../../components/common/TicketItem/TicketItem';
import { GroupPassForm } from '../../components/common/GroupPassForm/GroupPassForm';
import { PaymentSelect } from '../../components/common/PaymentSelect/PaymentSelect';
import CreditCard from '../../components/common/CreditCard/CreditCard';
import PayButton from '../../components/common/PayButton/PayButton';

// Constants and types
import { TICKET_TYPES } from '../../constants/tickets';
import { PAYMENT_TYPES } from '../../constants/payment';
import { PaymentData, CreditCardStatus } from '../../types/payment';

// Custom hooks
import { useTapPay } from '../../hooks/useTapPay';
import { usePaymentState } from '../../hooks/usePaymentState';
import { usePaymentMethods } from '../../hooks/usePaymentMethods';
import { SuccessOrError } from '../../components/common/SuccessOrError/SuccessOrError';

import './Payment.scss';

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<
    'form' | 'success' | 'false'
  >('form');
  const [creditCardStatus, setCreditCardStatus] = useState<CreditCardStatus>({
    number: '',
    expiry: '',
    ccv: '',
  });

  // Custom hooks
  const {
    paymentType,
    paymentReady,
    handlePaymentTypeChange,
    updatePaymentReady,
  } = usePaymentState();
  useTapPay(setCreditCardStatus);
  const { setupGooglePay, setupApplePay, setupSamsungPay } = usePaymentMethods(
    paymentData!,
    updatePaymentReady,
    setPaymentStatus
  );

  const {
    register,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  // 載入訂單資料
  useEffect(() => {
    const loadPaymentData = () => {
      const storedData = sessionStorage.getItem('ticketOrderData');
      if (!storedData) {
        navigate('/booking');
        return;
      }

      try {
        const data = JSON.parse(storedData) as PaymentData;
        setPaymentData(data);
      } catch (error) {
        console.error('解析訂單資料失敗:', error);
        navigate('/booking');
      }
    };

    loadPaymentData();
  }, [navigate]);

  // Event handlers
  const handleBackToBooking = () => navigate('/booking');
  const handlePayment = () => {
    setPaymentStatus('false');
    console.log('處理付款:', paymentData);
  };
  const handleQuantityChange = () => {};
  const handleGroupPassFormChange = () => {};

  // Computed values
  const { groupPassTicket, groupPassQuantity } = useMemo(() => {
    if (!paymentData) return { groupPassTicket: null, groupPassQuantity: 0 };

    const ticket = paymentData.tickets.find(
      ticket => TICKET_TYPES.find(t => t.id === ticket.id)?.isGroupPass
    );
    return {
      groupPassTicket: ticket || null,
      groupPassQuantity: ticket?.selectedQuantity || 0,
    };
  }, [paymentData]);

  if (!paymentData) {
    return null;
  }

  return (
    <>
      {paymentStatus === 'form' && (
        <div className="payment-container">
          <h1>確認訂單</h1>

          <div className="order-content">
            {/* 票券列表 */}
            <div className="ticket-section">
              <h2>請確認您選購的票券類型與數量</h2>
              <div className="ticket-list">
                {paymentData.tickets.map(ticket => {
                  const ticketInfo = TICKET_TYPES.find(t => t.id === ticket.id);
                  if (!ticketInfo) return null;

                  if (ticketInfo.isGroupPass) {
                    return (
                      <div key={ticket.id} className="booking-group-pass-item">
                        <TicketItem
                          mode="view"
                          ticket={ticketInfo}
                          quantity={ticket.selectedQuantity}
                          onQuantityChange={handleQuantityChange}
                        />
                        {paymentData.groupPassFormData.length > 0 && (
                          <GroupPassForm
                            mode="view"
                            quantity={groupPassQuantity}
                            formData={paymentData.groupPassFormData}
                            onFormDataChange={handleGroupPassFormChange}
                          />
                        )}
                      </div>
                    );
                  }

                  return (
                    <TicketItem
                      key={ticket.id}
                      mode="view"
                      ticket={ticketInfo}
                      quantity={ticket.selectedQuantity}
                      onQuantityChange={handleQuantityChange}
                    />
                  );
                })}
              </div>
            </div>

            <div className="order-summary">
              <p className="order-summary-title">
                共{paymentData.summary.totalQuantity}張，總計
                {paymentData.summary.totalAmount.toLocaleString()}元
              </p>
            </div>
          </div>

          <div className="payment-section">
            <PaymentSelect
              value={paymentType}
              onChange={handlePaymentTypeChange}
            />
            {paymentType === PAYMENT_TYPES.CREDIT_CARD && (
              <CreditCard
                paymentType={paymentType}
                register={register}
                errors={errors}
                creditCardStatus={creditCardStatus}
              />
            )}
          </div>

          {/* 按鈕區 */}
          <div className="payment-buttons">
            {paymentType === PAYMENT_TYPES.CREDIT_CARD ? (
              <button className="btn send-btn" onClick={handlePayment}>
                前往付款
              </button>
            ) : (
              <div className="other-payment-method">
                <PayButton
                  paymentType={paymentType}
                  setupGooglePay={setupGooglePay}
                  setupApplePay={setupApplePay}
                  setupSamsungPay={setupSamsungPay}
                  isApplePayReady={paymentReady.isApplePayReady}
                  isGooglePayReady={paymentReady.isGooglePayReady}
                  isSamsungPayReady={paymentReady.isSamsungPayReady}
                />
              </div>
            )}
            <button className="btn cancel-btn" onClick={handleBackToBooking}>
              返回修改
            </button>
          </div>
        </div>
      )}

      {paymentStatus === 'success' && (
        <SuccessOrError
          type="success"
          message="票券已購買成功，請前往我的票券查看。<br/>如需開立發票請寄信至conf@thehope.co"
          titlePrefix="購買"
          successText="成功"
          successButtonText="前往我的票券"
          onSuccessClick={() => navigate('/tickets')}
        />
      )}

      {paymentStatus === 'false' && (
        <SuccessOrError
          type="error"
          message="系統發生錯誤，請再試一次。"
          titlePrefix="購買"
          errorText="失敗"
          retryButtonText="前往購買票券"
          backButtonText="返回票券系統"
          onRetryClick={() => setPaymentStatus('form')}
          onBackClick={() => navigate('/')}
        />
      )}
    </>
  );
};
