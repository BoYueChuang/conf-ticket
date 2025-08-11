import { useState } from 'react';
import { TicketsCard } from '../TicketsCard/TicketsCard';
import './Tickets.scss';

export const Tickets: React.FC = () => {
  const tickets: any = [
    // {
    //   id: 1,
    //   title: "SPECIAL A PASS",
    //   startDate: "05.01",
    //   endDate: "05.03",
    //   startTime: "18:00",
    //   endTime: "21:30",
    //   quantity: 1,
    //   orderNumber: "1139475023",
    //   details: [
    //     "特會全場次＆WORKSHOP＆特會影片（一個月線上觀看權限）",
    //     "5/2 與 Wade Joye 牧師午餐及 Live QA",
    //     "5/3 與 Pastors 午餐及 Live QA（與談牧者：高力豪牧師、周學正牧師、柳子駿牧師、葉豐軒牧師）"
    //   ]
    // },
    // {
    //   id: 2,
    //   title: "VIP PASS",
    //   startDate: "05.02",
    //   endDate: "05.03",
    //   startTime: "19:00",
    //   endTime: "22:00",
    //   quantity: 2,
    //   orderNumber: "1139475024",
    //   details: [
    //     "特會全場次入場權限",
    //     "VIP 座位區域",
    //     "專屬休息區使用權"
    //   ]
    // },

    // {
    //   id: 3,
    //   title: "GENERAL PASS",
    //   startDate: "05.03",
    //   endDate: "05.03",
    //   startTime: "20:00",
    //   endTime: "21:30",
    //   quantity: 1,
    //   orderNumber: "1139475025",
    //   details: [
    //     "特會當日入場權限",
    //     "一般座位區域"
    //   ]
    // }
  ];
  // 使用 useState 管理當前活動的狀態
  const [activeStatus, setActiveStatus] = useState('collected');

  // 票券狀態數據
  const ticketStatuses = [
    { key: 'purchased', title: '已購買', count: 0 },
    { key: 'collected', title: '已取票', count: 0 },
    { key: 'refunded', title: '退票紀錄', count: 0 }
  ];

  // 點擊處理函數
  const handleStatusClick = (statusKey: string) => {
    setActiveStatus(statusKey);
  };

  const noTicketText = () => {
    switch (activeStatus) {
      case 'purchased':
        return '您尚未購買任何票券';
      case 'collected':
        return '您尚未持有任何票券';
      case 'refunded':
        return '目前尚無退票紀錄';
      default:
        return '您尚未持有任何票券';
    }
  };

  const getAlertContent = () => {

    switch (activeStatus) {
      case 'purchased':
        return (
          <>
            購買票券後，請先進行分票，系統將寄送取票通知至您填寫的信箱。<br />
            於信件點擊開通票券後，可至「票券系統」→「我的票券」→「已取票」查看，票券也將自動歸戶至您的 App 帳戶。
          </>
        );
      case 'collected':
        return (
          <>
            已取票之票券將自動與您的 App 帳戶同步，作為活動報到與入場憑證。<br />
            每人僅限持有一張票券。
          </>
        )
      case 'refunded':
        return (
          <>
            完成退票手續後，系統將於 5 個工作天內退款至您原付款的信用卡。<br />
            如需開立發票，請來信至 conf@thehope.co
          </>
        );
      default:
        return (
          <>
            已取票之票券將自動與您的 App 帳戶同步，作為活動報到與入場憑證。<br />
            每人僅限持有一張票券。
          </>
        );
    }
  };

  // 組件邏輯
  return (
    <div className="tickets-container">
      <div className="tickets-header">
        <h1>我的票券</h1>
        <div className="ticket-header-status">
          {ticketStatuses.map((status) => (
            <div
              key={status.key}
              className={`ticket-header-status-item ${activeStatus === status.key ? 'active' : ''}`}
              onClick={() => handleStatusClick(status.key)}
            >
              <p className="status-title">{status.title}</p>
              <div className="status-count-wrapper">
                <p className="status-count">{status.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="tickets-alert-container">
        <div className="ticket-alert-title">
          <img src="/src/assets/images/ticket-alert-dot.svg" alt="" />
          <p>貼心提醒</p>
        </div>
        <div className="ticket-alert-content">
          {getAlertContent()}
        </div>
      </div>
      <div className="tickets-content-container">
        {tickets.length === 0 ? (
          <>
            <img src="/src/assets/images/ticket-sample.png" alt="" className='ticket-pic' />
            <p>{noTicketText()}</p>
          </>
        ) : (
          <>
            {
              tickets.map((ticket: any) => (
                <TicketsCard
                  key={ticket.id}
                  title={ticket.title}
                  startDate={ticket.startDate}
                  endDate={ticket.endDate}
                  startTime={ticket.startTime}
                  endTime={ticket.endTime}
                  quantity={ticket.quantity}
                  orderNumber={ticket.orderNumber}
                  details={ticket.details}
                />
              ))
            }
          </>
        )}
      </div>
      {tickets.length === 0 && activeStatus !== 'refunded' && (
        <div className="tickets-btn-container">
          <button className="btn send-btn" type="submit">
            前往購票
          </button>
        </div>
      )}
    </div>
  );
};
