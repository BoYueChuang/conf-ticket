import './Tickets.scss';

export const Tickets: React.FC = () => {
  // 組件邏輯
  return (
    <div className="tickets-container">
      <div className="tickets-header">
        <h1>我的票券</h1>
        <div className="ticket-header-status">
          <div className="ticket-header-status-item">
            <p className="status-title">已購買</p>
            <div className="status-count-wrapper">
              <p className="status-count">0</p>
            </div>
          </div>
          <div className="ticket-header-status-item">
            <p className="status-title">已取票</p>
            <div className="status-count-wrapper">
              <p className="status-count">0</p>
            </div>
          </div>
          <div className="ticket-header-status-item">
            <p className="status-title">退票紀錄</p>
            <div className="status-count-wrapper">
              <p className="status-count">0</p>
            </div>
          </div>
        </div>
      </div>
      <div className="tickets-alert-container">
        <div className="ticket-alert-title">
          <img src="/src/assets/images/ticket-alert-dot.svg" alt="" />
          <p>貼心提醒</p>
        </div>
        <div className="ticket-alert-content">
          已購買之票券需進行分票或取票，才能順利歸戶至您的App帳戶。當取票完成後，可於「已取票」中查看該票券。
        </div>
      </div>
      <div className="tickets-content-container">
        <img src="/src/assets/images/ticket-sample.png" alt="" />
        <p>您目前尚未持有任何票券</p>
      </div>
      <div className="tickets-btn-container">
        <button className="btn send-btn" type="submit">
          前往購票
        </button>
        <button className="btn cancel-btn" type="submit">
          返回上一頁
        </button>
      </div>
    </div>
  );
};
