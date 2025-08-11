import { useEffect, useState } from 'react';
import { NotificationMessage } from '../../components/common/Notification/Notification';
import './Main.scss';

export const Main: React.FC = () => {
  const [showNotification, setShowNotification] = useState('');

  useEffect(() => {
    const fromProfile = sessionStorage.getItem('fromProfile');

    if (fromProfile === 'true') {
      setShowNotification('true');
      // 立即清除標記
      sessionStorage.removeItem('fromProfile');
    }
  }, []);

  // 組件邏輯
  return (
    <>
      {showNotification && (
        <NotificationMessage
          status="success"
          text="您的個人檔案已儲存成功"
          onClose={() => setShowNotification('')}
        />
      )}
      <div className="main-container">
        <h1>票券系統</h1>
        <div className="main-buttons">
          <div className="button-block">
            <p>購買票券</p>
            <img src="/src/assets/images/black-arrow-right-icon.svg" alt="" />
          </div>
          <div className="button-block">
            <p>我的票券</p>
            <img src="/src/assets/images/black-arrow-right-icon.svg" alt="" />
          </div>
          <div className="button-block">
            <p>個人檔案</p>
            <img src="/src/assets/images/black-arrow-right-icon.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
