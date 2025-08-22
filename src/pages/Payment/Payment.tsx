import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.scss';
import { TicketItem } from '../../components/common/TicketItem/TicketItem';
import { GroupPassForm } from '../../components/common/GroupPassForm/GroupPassForm';
import { TICKET_TYPES } from '../../constants/tickets';

interface SelectedTicket {
  id: string;
  name: string;
  price: number;
  selectedQuantity: number;
  totalPrice: number;
  remark?: string;
  features: { text: string }[];
  image: string;
}

interface GroupPassFormData {
  name: string;
  email: string;
  church: string;
  phone: string;
}

interface PaymentData {
  tickets: SelectedTicket[];
  groupPassFormData: GroupPassFormData[];
  summary: {
    totalAmount: number;
    totalQuantity: number;
  };
}

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem('ticketOrderData');
    if (!storedData) {
      // 如果沒有資料，重導向到選票頁面
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
  }, [navigate]);

  const handleBackToBooking = () => {
    navigate('/booking');
  };

  const handlePayment = () => {
    console.log('處理付款:', paymentData);
    // 這裡可以整合付款 API
    alert('付款功能開發中...');
  };

  // 空的 handler 函數（檢視模式不需要實際處理）
  const handleQuantityChange = () => {};
  const handleGroupPassFormChange = () => {};

  if (!paymentData) {
    return <div className="loading">載入中...</div>;
  }

  const groupPassTicket = paymentData.tickets.find(
    ticket => TICKET_TYPES.find(t => t.id === ticket.id)?.isGroupPass
  );
  const groupPassQuantity = groupPassTicket?.selectedQuantity || 0;

  return (
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

      {/* 按鈕區 */}
      <div className="payment-buttons">
        <button className="btn cancel-btn" onClick={handleBackToBooking}>
          返回修改
        </button>
        <button className="btn pay-btn" onClick={handlePayment}>
          確認付款
        </button>
      </div>
    </div>
  );
};
