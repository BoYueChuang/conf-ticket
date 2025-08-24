import { useEffect } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import './CreditCard.scss';

// 宣告 TPDirect 全域變數的型別
declare global {
  let TPDirect: any;
}

interface CreditCardProps {
  paymentType: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  creditCardStatus: {
    number: string;
    expiry: string;
    ccv: string;
  };
}

const CreditCard: React.FC<CreditCardProps> = props => {
  const { paymentType, register, errors, creditCardStatus } = props;
  useEffect(() => {
    // 只在選擇 credit-card 時執行設置
    if (paymentType === 'credit-card') {
      // 設置 TPDirect
      TPDirect.card.setup({
        fields: {
          number: {
            element: '#card-number',
            placeholder: '**** **** **** ****',
          },
          expirationDate: {
            element: '#card-expiration-date',
            placeholder: 'MM / YY',
          },
          ccv: {
            element: '#card-ccv',
            placeholder: 'ccv',
          },
        },
        styles: {
          input: {
            'font-size': '16px',
            color: '#070707',
            'font-family': 'Noto Sans TC',
          },
          // 可選：添加 focus 狀態樣式
          'input:focus': {
            'border-color': '#007bff',
            outline: 'none',
          },
          // 可選：添加錯誤狀態樣式
          '.has-error input': {
            'border-color': '#dc3545',
          },
        },
      });
    }
  }, [paymentType]); // 依賴於 paymentType.value 變更來執行

  if (paymentType === 'credit-card') {
    return (
      <div className="credit-card-block">
        <p className="credit-card-title">請輸入信用卡資訊</p>
        <div className="credit-card-form">
          <div className="credit-card-form-item">
            <p className="label-chinese">持卡人姓名</p>
            <input
              className="form-input"
              {...register('name', {
                required:
                  paymentType === 'credit-card' ? 'Required 必填' : false,
              })}
              type="text"
            />
            {errors.name && (
              <p className="error-message">
                {typeof errors.name?.message === 'string'
                  ? errors.name?.message
                  : ''}
              </p>
            )}
          </div>
          <div className="credit-card-form-item">
            <p className="label-chinese">信用卡卡號</p>
            <div
              className={`tpfield ${!creditCardStatus.number ? 'error-border' : ''}`}
              id="card-number"
            ></div>
            <p className="valid-text">{creditCardStatus.number}</p>
          </div>
          <div className="credit-card-date-ccv-block">
            <div className="credit-card-form-item">
              <p className="label-chinese">有效日期</p>
              <div
                className={`tpfield ${!creditCardStatus.expiry ? 'error-border' : ''}`}
                id="card-expiration-date"
              ></div>
              <p className="valid-text">{creditCardStatus.expiry}</p>
            </div>
            <div className="credit-card-form-item">
              <p className="label-chinese">末三碼</p>
              <div
                className={`tpfield ${!creditCardStatus.ccv ? 'error-border' : ''}`}
                id="card-ccv"
              ></div>
              <p className="valid-text">{creditCardStatus.ccv}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null; // 如果不是 credit-card, 可以返回 null 或其他內容
};

export default CreditCard;
