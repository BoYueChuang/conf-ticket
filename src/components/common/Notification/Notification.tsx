import React from 'react';
import './Notification.scss';

interface NotificationProps {
  status?: 'success' | 'error' | 'warning' | 'info';
  text?: string;
}

export const NotificationMessage: React.FC<NotificationProps> = ({
  status = 'success',
  text = '您已成功註冊The Hope Conference票券系統會員。',
}) => {
  const getIcon = () => {
    switch (status) {
      case 'success':
        return <i className="success-icon" />;
    }
  };

  // 組件邏輯
  return (
    <div className="notification-container">
      {getIcon()}
      <p>{text}</p>
    </div>
  );
};
