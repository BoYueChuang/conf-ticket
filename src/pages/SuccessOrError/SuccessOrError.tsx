import React from 'react';
import './SuccessOrError.scss';
import { useLocation } from 'react-router-dom';

export const SuccessOrError: React.FC = () => {
  const location = useLocation();
  const { type, message } = location.state || {};

  return (
    <div className="success-error-container">
      <div className="success-error-content-container">
        <img
          src={`${type === 'success' ? '/src/assets/images/success.svg' : '/src/assets/images/error.svg'}`}
          alt=""
          className="success-error-icon"
        />
        <h1 className="success-error-title">
          退票{type === 'success' ? '成功' : '失敗'}
        </h1>
        <p className="success-error-content">{message}</p>
      </div>
      <button className="btn send-btn">
        {type === 'success' ? '返回票券系統' : '再試一次'}
      </button>
      {type === 'error' && (
        <button className="btn cancel-btn">返回票券系統</button>
      )}
    </div>
  );
};
