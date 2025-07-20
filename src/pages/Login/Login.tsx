import { useState } from 'react';
import { apiService } from '../../api/fetchService';
import './Login.scss';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 郵件格式驗證
  const validateEmail = (emailValue: any) => {
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

  // 輸入變更處理
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    // 即時驗證（如果已經提交過或有錯誤時）
    if (isSubmitted || error) {
      const errorMessage = validateEmail(value);
      setError(errorMessage);
    }
  };

  // 失去焦點時驗證
  const handleBlur = () => {
    const errorMessage = validateEmail(email);
    setError(errorMessage);
  };

  // 提交處理
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 防止表單默認提交行為
    try {
      setIsSubmitted(true);
      setIsLoading(true);

      const errorMessage = validateEmail(email);
      setError(errorMessage);

      if (!errorMessage) {
        const data = await apiService.auth.login({
          email,
        });

        console.log('登入成功：', data);
        alert(`信箱驗證成功：${email}`);

        // 登入成功後的處理，例如導向首頁
        // navigate('/dashboard'); // 如果使用 react-router
      } else {
      }
    } catch (error: any) {
      console.error('登入失敗:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 組件邏輯
  return (
    <form onSubmit={handleSubmit}>
      <div className="login-container">
        <div className="mail-block">
          <label htmlFor="mail">電子郵件</label>
          {/* 抓取使用者輸入的電子郵件 */}
          <input
            id="mail"
            className={`form-input ${error ? 'invaild' : 'vaild'}`}
            type="text"
            placeholder="請輸入電子郵件"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleBlur}
            disabled={isLoading}
            aria-label="請輸入電子郵件"
            aria-required
            required
          />
          {error && <p className="invaild-text">{error}</p>}
        </div>
        <input className="send-btn" type="submit" value="發送電子郵件"></input>
      </div>
    </form>
  );
};
