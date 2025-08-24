import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Payment.scss';
import { TicketItem } from '../../components/common/TicketItem/TicketItem';
import { GroupPassForm } from '../../components/common/GroupPassForm/GroupPassForm';
import { TICKET_TYPES } from '../../constants/tickets';
import { PaymentSelect } from '../../components/common/PaymentSelect/PaymentSelect';
import CreditCard from '../../components/common/CreditCard/CreditCard';
import PayButton from '../../components/common/PayButton/PayButton';

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

const PAYMENT_TYPES = {
  APPLE_PAY: 'apple-pay',
  GOOGLE_PAY: 'google-pay',
  SAMSUNG_PAY: 'samsung-pay',
  CREDIT_CARD: 'credit-card',
};

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [paymentType, setPaymentType] = useState<string>('');
  const [creditCardStatus, setCreditCardStatus] = useState({
    number: '',
    expiry: '',
    ccv: '',
  });
  const [isApplePayReady, setIsApplePayReady] = useState(false);
  const [isGooglePayReady, setIsGooglePayReady] = useState(false);
  const [isSamsungPayReady, setIsSamsungPayReady] = useState(false);
  const [giveStatus, setGiveStatus] = useState('');
  const {
    register,
    watch,
    formState: { errors },
    trigger,
  } = useForm({
    mode: 'onChange', // 當輸入改變時觸發驗證
  });

  // **初始化設定 **
  useEffect(() => {
    const tappayAppId = Number(import.meta.env.VITE_TAPPAY_APP_ID) || 0;
    const tappayAppKey = import.meta.env.VITE_TAPPAY_APP_KEY || '';
    const appleMerchantId = import.meta.env.VITE_APPLE_MERCHANT_ID || '';
    const googleMerchantId = import.meta.env.VITE_GOOGLE_MERCHANT_ID || '';

    if (!tappayAppId || !tappayAppKey) {
      // Error handling
      console.error('Missing TapPay configuration in environment variables.');
    }

    TPDirect.setupSDK(
      tappayAppId,
      tappayAppKey,
      'sandbox' // or 'sandbox'
    );

    TPDirect.paymentRequestApi.checkAvailability();
    TPDirect.paymentRequestApi.setupApplePay({
      merchantIdentifier: appleMerchantId,
      countryCode: 'TW',
    });
    const googlePaySetting = {
      googleMerchantId: googleMerchantId,
      allowedCardAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
      merchantName: 'The Hope',
    };
    TPDirect.googlePay.setupGooglePay(googlePaySetting);
    TPDirect.samsungPay.setup({
      country_code: 'tw',
    });
  }, []);

  useEffect(() => {
    TPDirectCardOnUpdate();
  }, []);

  // 設置 Credit Card 欄位狀態
  const TPDirectCardOnUpdate = () => {
    TPDirect.card.onUpdate((update: any) => {
      // 檢查欄位是否無效
      const isInvalid = (status: number) => status === 3 || status === 2;
      const isRequired = (status: number) => status === 1;

      setCreditCardStatus({
        number: isRequired(update.status.number)
          ? 'Required 必填'
          : isInvalid(update.status.number)
            ? 'Invalid Card Number\n卡號無效'
            : '',
        expiry: isRequired(update.status.expiry)
          ? 'Required 必填'
          : isInvalid(update.status.expiry)
            ? 'Invalid Expiration Date\n到期日無效'
            : '',
        ccv: isRequired(update.status.ccv)
          ? 'Required 必填'
          : isInvalid(update.status.ccv)
            ? 'Invalid Security Code\n安全碼無效'
            : '',
      });
    });
  };

  useEffect(() => {
    const storedData = sessionStorage.getItem('ticketOrderData');
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

  // 渲染付款組件的函數
  const renderPaymentComponent = () => {
    switch (paymentType) {
      case 'credit-card':
        return (
          <CreditCard
            paymentType={paymentType}
            register={register}
            errors={errors}
            creditCardStatus={creditCardStatus}
          />
        );
      case 'apple-pay':
      case 'google-pay':
      case 'samsung-pay':
        return renderOtherPaymentMethod();
      default:
        return null;
    }
  };

  // 統一的其他付款方式處理函數
  const renderOtherPaymentMethod = () => {
    const getPaymentLabel = () => {
      switch (paymentType) {
        case 'apple-pay':
          return 'Apple Pay';
        case 'google-pay':
          return 'Google Pay';
        case 'samsung-pay':
          return 'Samsung Pay';
        default:
          return '其他付款方式';
      }
    };

    return (
      <div className="other-payment-method">
        <p>您選擇了 {getPaymentLabel()}</p>
        <p>請在下一步驟中完成付款</p>
      </div>
    );
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

  // **設置 Google Pay**
  const setupGooglePay = () => {
    setIsGooglePayReady(true);

    let lastfour = '';

    const paymentRequest = {
      allowedNetworks: ['AMEX', 'JCB', 'MASTERCARD', 'VISA'],
      price: paymentData.summary.totalAmount.toString(), // optional
      currency: 'TWD', // optional
    };
    TPDirect.googlePay.setupPaymentRequest(
      paymentRequest,
      function (err: any, result: any) {
        console.log(err);
        if (result.canUseGooglePay) {
          TPDirect.googlePay.getPrime(function (err: any, prime: any) {
            console.log(err);

            if (err) {
              alert('此裝置不支援 Google Pay');
              return;
            }
            postPay(prime, lastfour);
          });
        }
      }
    );
  };

  // **設置 Apple Pay**
  const setupApplePay = async () => {
    setIsApplePayReady(true);

    const paymentRequest = {
      supportedNetworks: ['AMEX', 'JCB', 'MASTERCARD', 'VISA'],
      supportedMethods: ['apple_pay'],
      displayItems: [
        {
          label: 'TapPay',
          amount: {
            currency: 'TWD',
            value: paymentData.summary.totalAmount.toString(),
          },
        },
      ],
      total: {
        label: '付給 TapPay',
        amount: {
          currency: 'TWD',
          value: paymentData.summary.totalAmount.toString(),
        },
      },
    };

    const result: {
      browserSupportPaymentRequest: boolean;
      canMakePaymentWithActiveCard: boolean;
    } = await new Promise(resolve => {
      TPDirect.paymentRequestApi.setupPaymentRequest(paymentRequest, resolve);
    });

    if (!result.browserSupportPaymentRequest) {
      setIsApplePayReady(false);
      alert('此裝置不支援 Apple Pay');
      return;
    }

    if (!result.canMakePaymentWithActiveCard) {
      setIsApplePayReady(false);
      alert('此裝置沒有支援的卡片可以付款');
      return;
    }

    setTimeout(() => {
      const button = document.querySelector('#apple-pay-button-container');

      if (button) {
        button.innerHTML = '';
        TPDirect.paymentRequestApi.setupTappayPaymentButton(
          '#apple-pay-button-container',
          (getPrimeResult: any) => {
            postPay(getPrimeResult.prime, getPrimeResult.card.lastfour);
          }
        );
      }
    }, 100);
  };

  // **設置 Samsung Pay**
  const setupSamSungPay = () => {
    setIsSamsungPayReady(true);
    const paymentRequest = {
      supportedNetworks: ['MASTERCARD', 'VISA'],
      total: {
        label: 'The Hope',
        amount: {
          currency: 'TWD',
          value: paymentData.summary.totalAmount.toString(), // 直接獲取最新值
        },
      },
    };

    TPDirect.samsungPay.setupPaymentRequest(paymentRequest);
    TPDirect.samsungPay.getPrime(function (result: any) {
      if (result.status !== 0) {
        alert('此裝置不支援 Samsung Pay');
        return;
      }

      postPay(result.prime, result.card.lastfour);
    });
  };

  // **傳送至後端 API**
  const postPay = (prime: string, last_four: string) => {
    console.log('✅ 付款中');
    fetch('https://confgive.thehope.app/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prime: prime,
        amount: Number(paymentData.summary.totalAmount),
        cardholder: {
          last_four,
          name: 'sss',
        },
      }),
    })
      .then(res => res.json())
      .then(res => {
        console.log('✅ 付款成功');
        if (res.status === 0) {
          setGiveStatus('success');
        }
      })
      .catch(error => {
        console.log('❌ 錯誤：', error);
      });
  };

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

      <div className="payment-section">
        <PaymentSelect value={paymentType} onChange={setPaymentType} />
        {renderPaymentComponent()}
      </div>

      {/* 按鈕區 */}
      <div className="payment-buttons">
        <button className="btn send-btn" onClick={handlePayment}>
          前往付款
        </button>
        {paymentType}
        <PayButton
          paymentType={paymentType}
          setupGooglePay={setupGooglePay}
          setupApplePay={setupApplePay}
          setupSamsungPay={setupSamSungPay}
          isApplePayReady={isApplePayReady}
          isGooglePayReady={isGooglePayReady}
          isSamsungPayReady={isSamsungPayReady}
        ></PayButton>
        <button className="btn cancel-btn" onClick={handleBackToBooking}>
          返回修改
        </button>
      </div>
    </div>
  );
};
