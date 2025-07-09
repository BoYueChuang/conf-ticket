import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '../../../api/fetchService';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode; // 自訂載入畫面
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children, fallback }) => {
  const [authStatus, setAuthStatus] = useState<
    'checking' | 'authenticated' | 'unauthenticated'
  >('checking');
  const [userInfo, setUserInfo] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 檢查認證狀態
  const checkAuth = async () => {
    try {
      // 調用 userinfo API 檢查認證狀態
      const response = await apiService.users.getAll();

      console.log('✅ AuthGuard: Authentication passed:', response);
      setAuthStatus('authenticated');
      setUserInfo(response);
    } catch (error: any) {
      console.log('❌ AuthGuard: Authentication failed:', error.message);
      setAuthStatus('unauthenticated');
      setUserInfo(null);

      // 重定向到登入頁面
      console.log('🔄 AuthGuard: Redirecting to login...');
      navigate('/login', {
        replace: true,
        state: { from: location.pathname }, // 記住來源頁面
      });
    }
  };

  // 🔥 組件載入時檢查認證
  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // 🔥 如果正在檢查認證，顯示載入畫面
  if (authStatus === 'checking') {
    return (
      fallback || (
        <div className="auth-guard-loading">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>驗證身份中...</p>
          </div>
        </div>
      )
    );
  }

  // 🔥 如果未認證，顯示空白（因為會重定向）
  if (authStatus === 'unauthenticated') {
    return null;
  }

  // 🔥 認證通過，渲染子組件並傳遞用戶資訊
  return (
    <AuthContext.Provider value={{ userInfo }}>{children}</AuthContext.Provider>
  );
};

// 🔥 建立 Context 供子組件使用用戶資訊
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = React.createContext<{
  userInfo: any;
} | null>(null);

// 🔥 Custom Hook 方便子組件使用
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthGuard');
  }
  return context;
};
