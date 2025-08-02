import './Footer.scss';

export const Footer: React.FC = () => {
  // 組件邏輯
  return (
    <footer className="footer">
      <div className="footer-content">
        <img
          src="/src/assets/images/footer-logo.svg"
          alt=""
          className="footer-logo"
        />
        <div className="contact-info">
          <div className="contact-method">
            <p>聯繫我們</p>
            <p>info@thehope.co</p>
          </div>
          <div className="contact-method">
            <p>追蹤我們</p>
            <div>
              <img src="/src/assets/images/ig-icon.svg" alt="" />
              <img src="/src/assets/images/threads-icon.svg" alt="" />
              <img src="/src/assets/images/fb-icon.svg" alt="" />
              <img src="/src/assets/images/youtube-icon.png" alt="" />
              <img src="/src/assets/images/tiktok-icon.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="footer-info">
        <p>© thehope.co all rights reserved.</p>
        <div>
          <p>隱私權保護政策</p>
          <p>使用者條款</p>
        </div>
      </div>
    </footer>
  );
};
