import { useEffect, useState } from 'react';
import { apiService, fetchClient } from '../../api/fetchService';
import './Login.scss';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [requiredError, setRequiredError] = useState('');
  const [formatError, setFormatError] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5分鐘

  useEffect(() => {
    if (timerSeconds <= 0) return; // 當計時器歸零時停止

    const interval = setInterval(() => {
      setTimerSeconds(prevSeconds => {
        if (prevSeconds <= 1) {
          return 0; // 確保不會變成負數
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerSeconds]);

  // 必填驗證
  const validateRequired = (emailValue: string) => {
    if (!emailValue.trim()) {
      return '必填';
    }
    return '';
  };

  // 郵件格式驗證
  const validateEmailFormat = (emailValue: string) => {
    if (!emailValue.trim()) return ''; // 空值時不檢查格式

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      return '輸入格式錯誤';
    }
    return '';
  };

  // 輸入變更處理 - Email
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // 即時驗證
    if (requiredError || formatError) {
      const requiredMsg = validateRequired(value);
      const formatMsg = validateEmailFormat(value);
      setRequiredError(requiredMsg);
      setFormatError(formatMsg);
    }
  };

  // Email blur 驗證
  const handleEmailBlur = () => {
    const requiredMsg = validateRequired(email);
    const formatMsg = validateEmailFormat(email);
    setRequiredError(requiredMsg);
    setFormatError(formatMsg);
  };

  // 第一步：提交 Email，發送登入連結至信箱
  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setRequiredError('');
      setFormatError('');

      const requiredMsg = validateRequired(email);
      const formatMsg = validateEmailFormat(email);

      if (requiredMsg || formatMsg) {
        setRequiredError(requiredMsg);
        setFormatError(formatMsg);
        return;
      }

      // 調用發送 OTP 的 API
      const response = await apiService.auth.auth({ email });
      fetchClient.setToken('sadasasdas');

      console.log('OTP 發送成功：', response);

      // 成功後切換到 OTP 輸入階段
      setIsEmailSubmitted(true);
    } catch (error: any) {
      console.error('發送 OTP 失敗:', error.message);
      setFormatError(error.message || '發送失敗，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  // 重新發送 email
  const handleResendOTP = async () => {
    if (timerSeconds > 0) return;
    try {
      setIsLoading(true);

      const response = await apiService.auth.auth({ email });
      resetTimer();
      console.log('OTP 發送成功：', response);
    } catch (error: any) {
      console.error('重新發送失敗:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 格式化時間為 MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分${remainingSeconds.toString().padStart(2, '0')}秒`;
  };

  // 重置計時器
  const resetTimer = () => {
    setTimerSeconds(300);
  };

  // 根據狀態渲染不同的表單
  return (
    <div className="login-container">
      {!isEmailSubmitted ? (
        // 第一階段：輸入 Email
        <form onSubmit={handleEmailSubmit} className="login-form">
          <div className="form-block">
            <h1>登入/註冊帳戶</h1>
            <p className="form-description">
              請輸入您的電子郵件地址，並按下「發送電子郵件」，您將收到來自conf@thehope.co寄送的一次性密碼。
            </p>
            <div className="form-label">
              <label htmlFor="email">電子郵件</label>
              {requiredError && <p className="invaild-text">{requiredError}</p>}
            </div>
            <input
              id="email"
              className={`form-input ${requiredError || formatError ? 'invalid' : 'valid'}`}
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
            {formatError && <p className="invaild-text">{formatError}</p>}
          </div>

          <div className="btn-container">
            <button
              className="btn send-btn m-t-40"
              type="submit"
              disabled={isLoading}
            >
              發送電子郵件
            </button>
          </div>
        </form>
      ) : (
        // 第二階段：登入連結已發送
        <div className="login-form">
          <div className="form-block">
            <h1>登入連結已發送</h1>
            <p className="form-description">
              系統已將登入連結寄至 {email}
              <br />
              ，請前往您填寫的信箱，點擊信件中的連結登入票券系統。
            </p>
          </div>

          <div className="otp-actions">
            <p>沒有收到郵件？</p>
            <p
              className={`${timerSeconds > 0 ? 'disabled' : ''} resend-otp`}
              onClick={handleResendOTP}
            >
              {timerSeconds > 0
                ? `${formatTime(timerSeconds)}可重新發送`
                : '重新發送'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
