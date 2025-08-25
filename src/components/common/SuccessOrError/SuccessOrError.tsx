import React from 'react';
import './SuccessOrError.scss';

interface SuccessOrErrorProps {
  type?: 'success' | 'error';
  message?: string;
  useList?: boolean;
  titlePrefix?: string;
  successText?: string;
  errorText?: string;
  successButtonText?: string;
  retryButtonText?: string;
  backButtonText?: string;
  onSuccessClick?: () => void;
  onRetryClick?: () => void;
  onBackClick?: () => void;
}

export const SuccessOrError: React.FC<SuccessOrErrorProps> = ({
  type = 'success',
  message = '',
  useList = false,
  titlePrefix = '退票',
  successText = '成功',
  errorText = '失敗',
  successButtonText = '返回票券系統',
  retryButtonText = '再試一次',
  backButtonText = '返回票券系統',
  onSuccessClick,
  onRetryClick,
  onBackClick,
}) => {
  return (
    <div className="success-error-container">
      <div className="success-error-content-container">
        <img
          src={`${type === 'success' ? '/src/assets/images/success.svg' : '/src/assets/images/error.svg'}`}
          alt=""
          className="success-error-icon"
        />
        <h1 className="success-error-title">
          {titlePrefix}
          {type === 'success' ? successText : errorText}
        </h1>
        {useList ? (
          <ul
            className="success-error-list"
            dangerouslySetInnerHTML={{
              __html: message
                ? message
                    .split('<br/>')
                    .map(item => item.trim())
                    .filter(item => item)
                    .map(item => `<li>${item.replace(/^[•\-\*]\s*/, '')}</li>`)
                    .join('')
                : '',
            }}
          />
        ) : (
          <div
            className="success-error-content"
            dangerouslySetInnerHTML={{
              __html: message ? message.replace(/\n/g, '<br />') : '',
            }}
          />
        )}
      </div>
      <div className="success-error-btn-container">
        <button
          className="btn send-btn"
          onClick={type === 'success' ? onSuccessClick : onRetryClick}
        >
          {type === 'success' ? successButtonText : retryButtonText}
        </button>
        {type === 'error' && (
          <button className="btn cancel-btn" onClick={onBackClick}>
            {backButtonText}
          </button>
        )}
      </div>
    </div>
  );
};
