import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NotificationMessage } from '../../components/common/Notification/Notification';
import { Select } from '../../components/common/Select/Select';
import './Profile.scss';
import Dialog from '../../components/common/Dialog/Dialog';
import React from 'react';

export const Profile: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedChurch, setSelectedChurch] = useState('');
  const [selectedChurchIdentity, setSelectedChurchIdentity] = useState('');
  const [showNotification, setShowNotification] = useState('');
  const navigate = useNavigate();
  const [isUserTermsDialogOpen, setUserTermsDialogOpen] = React.useState(false);
  const [isPrivacyPolicyDialogOpen, setPrivacyPolicyDialogOpen] =
    React.useState(false);
  const [isUserTermsCheckBoxDisabled, setUserTermsCheckBoxDisabled] =
    React.useState(true);
  const [isPrivacyPolicyCheckBoxDisabled, setPrivacyPolicyCheckBoxDisabled] =
    React.useState(true);

  const handleUserTermsConfirm = () => {
    setUserTermsDialogOpen(false);
    setUserTermsCheckBoxDisabled(false);
  };

  const handleUserTermsCancel = () => {
    setUserTermsDialogOpen(false);
  };

  const handlePrivacyPolicyConfirm = () => {
    setPrivacyPolicyCheckBoxDisabled(false);
    setPrivacyPolicyDialogOpen(false);
  };

  const handlePrivacyPolicyCancel = () => {
    setPrivacyPolicyDialogOpen(false);
  };

  useEffect(() => {
    const fromLogin = sessionStorage.getItem('fromLogin');

    if (fromLogin === 'true') {
      setShowNotification('true');
      // 立即清除標記
      sessionStorage.removeItem('fromLogin');
    }
  }, []);

  // 儲存個人檔案
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 儲存個人檔案成功後導向 main
    sessionStorage.setItem('fromProfile', 'true');
    navigate('/main', { replace: true });
  };

  // 組件邏輯
  return (
    <div>
      {showNotification && (
        <NotificationMessage
          status="success"
          text="您已成功註冊The Hope Conference票券系統會員。"
          onClose={() => setShowNotification('')}
        />
      )}

      <form onSubmit={handleSubmit} className="profile-container">
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
              <input
                type="checkbox"
                id="user-terms"
                disabled={isUserTermsCheckBoxDisabled}
              />
              <label htmlFor="user-terms">我已閱讀並同意</label>
              <a
                href="javascript:void(0)"
                onClick={() => setUserTermsDialogOpen(true)}
              >
                使用者條款
              </a>
            </div>
            <div>
              <input
                type="checkbox"
                id="privacy-policy"
                disabled={isPrivacyPolicyCheckBoxDisabled}
              />
              <label htmlFor="privacy-policy">我已閱讀並同意</label>
              <a
                href="javascript:void(0)"
                onClick={() => setPrivacyPolicyDialogOpen(true)}
              >
                隱私權保護政策
              </a>
            </div>
          </div>
          <div className="profile-button">
            <button className="btn send-btn" type="submit">
              儲存個人檔案
            </button>
          </div>
        </div>
      </form>

      <Dialog
        isOpen={isUserTermsDialogOpen}
        onClose={() => setUserTermsDialogOpen(false)}
        title="使用者條款"
        confirmText="我同意"
        cancelText="取消"
        onConfirm={handleUserTermsConfirm}
        onCancel={handleUserTermsCancel}
        requireScrollToBottom={true} // 啟用滾動到底部功能
      >
        <div>
          <p>
            <strong>2.</strong>{' '}
            憑票申請購票，回一書暨口罩接觸對效果或定全部恕兼，但右覺用暴標辦，或使用暫FUN、動滋券折抵等虛享優惠，則需依套畫承或電器申請提回，恕無法讓部份票券，請依相關公告說明辦理。
          </p>

          <p>
            <strong>3.</strong>{' '}
            退票申請送出後，恕無法修改退票張數及取消退票申請，請務必於退票申請送出前，確認退票資料是否正確。
          </p>

          <p>
            <strong>4.</strong>{' '}
            退款方式：憑款扣除退票手續費，刷退至原刷卡購票之信用卡。信用卡退款時間依各大作業時間為準，建議於退票申請完成後，可留意當期或下期信用卡帳單。
          </p>

          <p>
            <strong>5.</strong>{' '}
            本系統票券分級退票者，本系統將依退票申請表上之聯絡方式通知申請人取回票券，若無法和申請人取得聯繫或無法送或取回票券共識者，本系統將不負票券保管或任何其他責任，所有責任與後果將由申請人自行負擔。
          </p>

          <p>
            <strong>6.</strong>{' '}
            當您確認本系統已收到您的退票申請資料，可於申請退票的5個工作天後至訂單查詢網絡或手機，訂單狀態將改為【個人因事辦理退票】，訂單狀態若無顯示，請聯必向本系統客服認證呈異確度，(聯繫電話)，道歉的
          </p>
        </div>
      </Dialog>
      <Dialog
        isOpen={isPrivacyPolicyDialogOpen}
        onClose={() => setPrivacyPolicyDialogOpen(false)}
        title="隱私權保護政策"
        confirmText="我同意"
        cancelText="取消"
        onConfirm={handlePrivacyPolicyConfirm}
        onCancel={handlePrivacyPolicyCancel}
        requireScrollToBottom={true} // 啟用滾動到底部功能
      >
        <div>
          <p>
            <strong>2.</strong>{' '}
            憑票申請購票，回一書暨口罩接觸對效果或定全部恕兼，但右覺用暴標辦，或使用暫FUN、動滋券折抵等虛享優惠，則需依套畫承或電器申請提回，恕無法讓部份票券，請依相關公告說明辦理。
          </p>

          <p>
            <strong>3.</strong>{' '}
            退票申請送出後，恕無法修改退票張數及取消退票申請，請務必於退票申請送出前，確認退票資料是否正確。
          </p>

          <p>
            <strong>4.</strong>{' '}
            退款方式：憑款扣除退票手續費，刷退至原刷卡購票之信用卡。信用卡退款時間依各大作業時間為準，建議於退票申請完成後，可留意當期或下期信用卡帳單。
          </p>

          <p>
            <strong>5.</strong>{' '}
            本系統票券分級退票者，本系統將依退票申請表上之聯絡方式通知申請人取回票券，若無法和申請人取得聯繫或無法送或取回票券共識者，本系統將不負票券保管或任何其他責任，所有責任與後果將由申請人自行負擔。
          </p>

          <p>
            <strong>6.</strong>{' '}
            當您確認本系統已收到您的退票申請資料，可於申請退票的5個工作天後至訂單查詢網絡或手機，訂單狀態將改為【個人因事辦理退票】，訂單狀態若無顯示，請聯必向本系統客服認證呈異確度，(聯繫電話)，道歉的
          </p>
        </div>
      </Dialog>
    </div>
  );
};
