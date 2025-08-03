import { useState } from 'react';
import { apiService } from '../../api/fetchService';
import './Login.scss';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(''); // 🔥 新增 OTP state
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState(''); // 🔥 OTP 專用錯誤訊息
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false); // 🔥 重新命名，更清楚
  const [isLoading, setIsLoading] = useState(false);

  // 郵件格式驗證
  const validateEmail = (emailValue: string) => {
    // 空值檢查
    if (!emailValue.trim()) {
      return '信箱為必填欄位';
    }

    // 郵件格式驗證
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return '請輸入有效的信箱格式';
    }

    return '';
  };

  // 🔥 OTP 驗證
  const validateOTP = (otpValue: string) => {
    if (!otpValue.trim()) {
      return '驗證碼為必填欄位';
    }

    if (otpValue.length !== 6) {
      return '請輸入6位數驗證碼';
    }

    if (!/^\d+$/.test(otpValue)) {
      return '驗證碼只能包含數字';
    }

    return '';
  };

  // 輸入變更處理 - Email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // 即時驗證
    if (error) {
      const errorMessage = validateEmail(value);
      setError(errorMessage);
    }
  };

  // 🔥 輸入變更處理 - OTP
  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // 只允許數字
    setOtp(value);

    // 即時驗證
    if (otpError) {
      const errorMessage = validateOTP(value);
      setOtpError(errorMessage);
    }
  };

  // Email blur 驗證
  const handleEmailBlur = () => {
    const errorMessage = validateEmail(email);
    setError(errorMessage);
  };

  // 🔥 OTP blur 驗證
  const handleOTPBlur = () => {
    const errorMessage = validateOTP(otp);
    setOtpError(errorMessage);
  };

  // 🔥 第一步：提交 Email，發送 OTP
  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError('');

      const errorMessage = validateEmail(email);
      if (errorMessage) {
        setError(errorMessage);
        return;
      }

      // 🔥 調用發送 OTP 的 API
      const response = await apiService.auth.auth({ email });

      console.log('OTP 發送成功：', response);

      // 🔥 成功後切換到 OTP 輸入階段
      setIsEmailSubmitted(true);
    } catch (error: any) {
      console.error('發送 OTP 失敗:', error.message);
      setError(error.message || '發送失敗，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 第二步：驗證 OTP，完成登入
  const handleOTPSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setOtpError('');

      const errorMessage = validateOTP(otp);
      if (errorMessage) {
        setOtpError(errorMessage);
        return;
      }

      // 🔥 調用驗證 OTP 的 API
      const response = apiService.auth.authCallBack(otp);

      console.log('登入成功：', response);

      // 🔥 儲存 token（如果 API 有回傳）
      if ((await response).token) {
        apiService.auth.setToken((await response).token);
      }

      // 🔥 導向首頁或其他頁面
      // navigate('/dashboard');
    } catch (error: any) {
      console.error('OTP 驗證失敗:', error.message);
      setOtpError(error.message || 'OTP 驗證失敗，請檢查驗證碼');
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 返回到 Email 輸入階段
  const handleBackToEmail = () => {
    setIsEmailSubmitted(false);
    setOtp('');
    setOtpError('');
  };

  // 🔥 重新發送 OTP
  const handleResendOTP = async () => {
    try {
      setIsLoading(true);
      setOtpError('');

      const response = await apiService.auth.authCallBack(otp);
      console.log('重新發送 OTP 成功：', response);
    } catch (error: any) {
      console.error('重新發送失敗:', error.message);
      setOtpError('重新發送失敗，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 根據狀態渲染不同的表單
  return (
    <div className="login-container">
      {!isEmailSubmitted ? (
        // 📧 第一階段：輸入 Email
        <form onSubmit={handleEmailSubmit} className="login-form">
          <div className="form-block">
            <h1>登入/註冊帳戶</h1>
            <p className="form-description">
              請輸入您的電子郵件地址，並按下「發送電子郵件」，您將收到來自conf@thehope.co寄送的一次性密碼。
            </p>
            <label htmlFor="email">電子郵件</label>
            <input
              id="email"
              className={`form-input ${error ? 'invalid' : 'valid'}`}
              type="email"
              placeholder="請輸入電子郵件"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              disabled={isLoading}
              aria-label="請輸入電子郵件"
              aria-required
              required
            />
            {error && <p className="invaild-text">{error}</p>}
          </div>

          <div className="btn-container">
            <button
              className="send-btn m-t-40"
              type="submit"
              disabled={isLoading}
            >
              發送電子郵件
            </button>
          </div>
        </form>
      ) : (
        // 第二階段：輸入 OTP
        <form onSubmit={handleOTPSubmit} className="login-form">
          <div className="form-block">
            <h1>密碼已發送</h1>
            <p className="form-description">
              系統已發送一次性密碼至：{email}
              <br />
              請前往您的電子郵件查看，並於下方輸入。
            </p>
            <label htmlFor="otp">一次性密碼</label>
            <input
              id="otp"
              className={`form-input ${otpError ? 'invalid' : 'valid'}`}
              type="text"
              placeholder="請輸入一次性密碼"
              value={otp}
              onChange={handleOTPChange}
              onBlur={handleOTPBlur}
              disabled={isLoading}
              autoComplete="one-time-code" // 🔥 啟用 OTP 自動填入
              inputMode="numeric" // 🔥 手機顯示數字鍵盤
              pattern="[0-9]*" // 🔥 只允許數字
              maxLength={6} // 🔥 限制長度
              aria-label="請輸入一次性密碼"
              aria-required
              required
            />
            {otpError && <p className="invaild-text">{otpError}</p>}
          </div>

          <div className="btn-container">
            <button
              className="send-btn m-t-40"
              type="submit"
              disabled={isLoading}
            >
              發送電子郵件
            </button>
          </div>

          <div className="otp-actions">
            <p>沒有收到郵件？</p>
            <p className="resend-otp" onClick={handleResendOTP}>
              重新發送
            </p>
          </div>
        </form>
      )}
    </div>
  );
};
