import './TicketDistribution.scss';

export const TicketDistribution: React.FC = () => {
  // 組件邏輯
  return (
    <form className="distribution-container">
      <div className="distribution-header">
        <h1>填寫取票者資訊</h1>
        <div className="distribution-header-content">
          <p className="distribution-header-content-title">
            您要分票的票券資訊為：
          </p>
          <div className="distribution-header-content-info">
            <div className="distribution-header-content-info-item">
              <p className="distribution-header-content-info-item-label">
                票券票種
              </p>
              <p className="distribution-header-content-info-item-content">
                CREATIVE PASS
              </p>
            </div>
            <div className="distribution-header-content-info-item">
              <p className="distribution-header-content-info-item-label">
                票券張數
              </p>
              <p className="distribution-header-content-info-item-content">2</p>
            </div>
            <div className="distribution-header-content-info-item">
              <p className="distribution-header-content-info-item-label">
                使用日期
              </p>
              <p className="distribution-header-content-info-item-content">
                2026.05.01-2026.05.03
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="distribution-form">
        <p className="distribution-form-title">
          請勾選要分出的票券，並填寫取票者的電子郵件，系統將自動發送取票資訊至填寫的信箱。
        </p>
        <div className="distribution-form-item">
          <input id="email" type="checkbox" />
          <div className="distribution-form-item-content">
            <label>取票者1</label>
            <input
              className={`form-input`}
              type="text"
              placeholder="請輸入電子郵件"
              aria-label="請輸入電子郵件"
              aria-required
              required
            />
          </div>
        </div>
        <div className="distribution-form-item">
          <input id="email" type="checkbox" />
          <div className="distribution-form-item-content">
            <label>取票者1</label>
            <input
              className={`form-input`}
              type="text"
              placeholder="請輸入電子郵件"
              aria-label="請輸入電子郵件"
              aria-required
              required
            />
          </div>
        </div>
        <div className="distribution-form-item">
          <input id="email" type="checkbox" />
          <div className="distribution-form-item-content">
            <label>取票者1</label>
            <input
              className={`form-input`}
              type="text"
              placeholder="請輸入電子郵件"
              aria-label="請輸入電子郵件"
              aria-required
              required
            />
          </div>
        </div>
      </div>
      <div>
        <button className="btn send-btn" type="submit">
          前往分票
        </button>
        <button className="btn cancel-btn">返回</button>
      </div>
    </form>
  );
};
