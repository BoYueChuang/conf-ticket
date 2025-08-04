import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { NotificationMessage } from '../../components/common/Notification/Notification';
import { Select } from '../../components/common/Select/Select';
import './Profile.scss';

export const Profile: React.FC = () => {
  const location = useLocation();
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedChurch, setSelectedChurch] = useState('');
  const [selectedChurchIdentity, setSelectedChurchIdentity] = useState('');
  const [showNotification, setShowNotification] = useState(
    location.state?.fromLogin === true
  );

  // 組件邏輯
  return (
    <div>
      {showNotification && (
        <NotificationMessage
          status="success"
          text="您已成功註冊The Hope Conference票券系統會員。"
          onClose={() => setShowNotification(false)}
        />
      )}

      <div className="profile-container">
        <div className="profile-header">
          <h1>建立個人檔案</h1>
          <p>
            為提供後續良好的特會報到體驗，請填寫以下資訊，讓我們更多認識您。
          </p>
        </div>
        <div className="profile-form">
          <div className="form-item">
            <div className="form-label">
              <label htmlFor="name">姓名</label>
              <p>必填</p>
            </div>
            <input
              id="name"
              className={`form-input`}
              type="text"
              placeholder="請輸入姓名"
              aria-label="請輸入姓名"
              aria-required
              required
            />
          </div>
          <div className="form-item">
            <div className="form-label">
              <label htmlFor="name">電話</label>
              <p>必填</p>
            </div>
            <input
              id="phone"
              className={`form-input`}
              type="number"
              placeholder="請輸入電話"
              aria-label="請輸入電話"
              aria-required
              required
            />
          </div>
          <div className="form-item">
            <div className="form-label">
              <label htmlFor="name">性別</label>
              <p>必填</p>
            </div>
            <Select
              options={[
                { id: 'male', label: '男' },
                { id: 'female', label: '女' },
              ]}
              value={selectedGender}
              onChange={setSelectedGender}
              placeholder="請選擇"
            />
          </div>
          <div className="form-item">
            <div className="form-label">
              <label htmlFor="name">所屬教會</label>
              <p>必填</p>
            </div>
            <Select
              options={[
                { id: 'taipei', label: 'The Hope 台北分部' },
                { id: 'taichung', label: 'The Hope 台中分部' },
                { id: 'online', label: 'The Hope 線上分部' },
                { id: 'other', label: '其他' },
              ]}
              value={selectedChurch}
              onChange={setSelectedChurch}
              placeholder="請選擇"
            />
          </div>
          <div className="form-item">
            <div className="form-label">
              <label htmlFor="name">所屬教會姓名</label>
              <p>必填</p>
            </div>
            <input
              id="church-name"
              className={`form-input`}
              type="text"
              placeholder="請選擇"
              aria-label="請選擇"
              aria-required
              required
            />
          </div>
          <div className="form-item">
            <div className="form-label">
              <label htmlFor="name">所屬教會身份</label>
              <p>必填</p>
            </div>
            <Select
              options={[
                { id: 'senior-pastor', label: '主任牧師' },
                { id: 'pastor', label: '牧師' },
                { id: 'minister ', label: '傳道' },
                { id: 'ministry-leader', label: '事工負責人' },
                { id: 'student', label: '神學生' },
                { id: 'congregation ', label: '會眾' },
              ]}
              value={selectedChurchIdentity}
              onChange={setSelectedChurchIdentity}
              placeholder="請選擇"
            />
          </div>
        </div>
        <div className="profile-checkbox-button">
          <div className="profile-checkbox">
            <div>
              <input type="checkbox" id="user-terms" />
              <label htmlFor="user-terms">我已閱讀並同意</label>
              <a href="javascript:void(0)">使用者條款</a>
            </div>
            <div>
              <input type="checkbox" id="privacy-policy" />
              <label htmlFor="privacy-policy">我已閱讀並同意</label>
              <a href="javascript:void(0)">隱私權保護政策</a>
            </div>
          </div>
          <div className="profile-button">
            <button className="send-btn" type="submit">
              儲存個人檔案
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
