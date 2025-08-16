import React from 'react';
import Dialog from '../../components/common/Dialog/Dialog';
import './Refund.scss';
import { useNavigate } from 'react-router-dom';

export const Refund: React.FC = () => {
  const navigate = useNavigate();
  const [isRefundDialogOpen, setRefundDialogOpen] = React.useState(false);
  const [isRefundCheckBoxDisabled, setRefundCheckBoxDisabled] =
    React.useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = React.useState(false);

  const handleRefundConfirm = () => {
    setRefundDialogOpen(false);
    setRefundCheckBoxDisabled(false); // 閱讀完條款後，啟用 checkbox
  };

  const handleRefundCancel = () => {
    setRefundDialogOpen(false);
  };

  const handleCheckboxChange = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  // 確定退票
  const Submit = () => {
    navigate('/refund/success', {
      state: {
        type: 'success',
        message:
          '退款金額將於 10 個工作天內退回至您的原付款方式，如需開立發票請寄信至conf@thehope.co',
      },
    });
  };

  // 組件邏輯
  return (
    <div className="refund-container">
      <div className="refund-header">
        <h1>建立個人檔案</h1>
        <div className="refund-header-content">
          <p className="refund-header-content-title">
            退票申請前，請詳閱以下退票需知：
          </p>
          <div>
            <ul className="refund-header-content-list">
              <li>
                <span className="number">1.</span>退款將酌收 10% 手續費
              </li>
              <li>
                <span className="number">2.</span>退款金額將於 10
                個工作天內退回至您的原付款方式
              </li>
              <li>
                <span className="number">3.</span>
                退票僅能整筆申請退款，無法部分退票
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="refund-content">
        <p className="refund-content-title">請確認您欲申請退票之資訊：</p>
        <div className="refund-content-info">
          <div className="refund-content-info-item">
            <p className="refund-content-info-item-label">票券票種</p>
            <p className="refund-content-info-item-content">CREATIVE PASS</p>
          </div>
          <div className="refund-content-info-item">
            <p className="refund-content-info-item-label">票券張數</p>
            <p className="refund-content-info-item-content">2</p>
          </div>
          <div className="refund-content-info-item">
            <p className="refund-content-info-item-label">訂單編號</p>
            <p className="refund-content-info-item-content">1139475023</p>
          </div>
          <div className="refund-content-info-item">
            <p className="refund-content-info-item-label">使用日期</p>
            <p className="refund-content-info-item-content">
              2026.05.01-2026.05.03
            </p>
          </div>
        </div>
      </div>
      <div className="refund-checkbox-container">
        <input
          type="checkbox"
          id="refund"
          className="refund-checkbox"
          checked={isCheckboxChecked}
          onChange={handleCheckboxChange}
          disabled={isRefundCheckBoxDisabled}
        />
        <label htmlFor="refund">我已閱讀並同意</label>
        <button
          className="refund-terms-link"
          onClick={() => setRefundDialogOpen(true)}
        >
          退票條款
        </button>
      </div>
      <div className="refund-button">
        <button
          className="btn send-btn"
          disabled={!isCheckboxChecked}
          onClick={Submit}
        >
          確定退票
        </button>
        <button className="btn cancel-btn">取消</button>
      </div>

      <Dialog
        isOpen={isRefundDialogOpen}
        onClose={() => setRefundDialogOpen(false)}
        title="使用者條款"
        confirmText="我同意"
        cancelText="取消"
        onConfirm={handleRefundConfirm}
        onCancel={handleRefundCancel}
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
