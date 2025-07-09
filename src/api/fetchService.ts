// src/api/fetchService.ts

// 基礎 fetch 封裝
class FetchService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;

    // 預設設定
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // 🔥 自動帶上 cookies（包含 JWT token）
    };

    // 合併設定
    const finalOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    // 🔥 如果使用 localStorage 方式，可以在這裡加上 token
    // const token = localStorage.getItem('token');
    // if (token) {
    //     finalOptions.headers = {
    //         ...finalOptions.headers,
    //         'Authorization': `Bearer ${token}`
    //     };
    // }

    console.log('📤 Fetch Request:', options.method || 'GET', url);

    try {
      const response = await fetch(url, finalOptions);

      console.log('📥 Fetch Response:', response.status, url);

      // 🔥 攔截器：處理 40X 錯誤
      if (response.status === 401 || response.status === 403) {
        console.warn('🚨 Authentication failed, redirecting to login...');
        this.handleAuthError();
        throw new Error(`Authentication failed: ${response.status}`);
      }

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

      // 如果是 DELETE 請求且沒有內容，直接返回成功
      if (response.status === 204) {
        return { success: true };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ Fetch Error:', error);
      throw error;
    }
  }

  // 🔥 處理認證錯誤的方法
  private handleAuthError() {
    // 清除本地儲存的 token（如果有使用 localStorage）
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    // 重定向到登入頁面
    window.location.href = '/login';

    // 或者如果你使用 React Router，可以這樣：
    // import { useNavigate } from 'react-router-dom';
    // const navigate = useNavigate();
    // navigate('/login');
  }

  // 🔥 新增：設置 token 的方法（如果使用 localStorage 方式）
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // 🔥 新增：清除 token 的方法
  clearToken() {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  // 🔥 新增：檢查是否有 token
  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  // GET 請求
  async get(endpoint: string, params?: Record<string, any>) {
    let url = endpoint;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
      const paramString = searchParams.toString();
      if (paramString) {
        url += `?${paramString}`;
      }
    }

    return this.request(url, { method: 'GET' });
  }

  // POST 請求
  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // PUT 請求
  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // PATCH 請求
  async patch(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  // DELETE 請求
  async delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

const fetchClient = new FetchService('/api');

// API 服務定義
export const apiService = {
  // 🔥 新增：認證相關 API
  auth: {
    login: (credentials: { email: string; password: string }) =>
      fetchClient.post('/auth/login', credentials),
    logout: () => fetchClient.post('/auth/logout', {}),
    refreshToken: () => fetchClient.post('/auth/refresh', {}),
    getCurrentUser: () => fetchClient.get('/auth/me'),

    // Token 管理方法
    setToken: (token: string) => fetchClient.setToken(token),
    clearToken: () => fetchClient.clearToken(),
    hasToken: () => fetchClient.hasToken(),
  },

  // 用戶相關
  users: {
    getAll: () => fetchClient.get('/users'),
    getById: (id: string) => fetchClient.get(`/users/${id}`),
    create: (data: any) => fetchClient.post('/users', data),
    update: (id: string, data: any) => fetchClient.put(`/users/${id}`, data),
    delete: (id: string) => fetchClient.delete(`/users/${id}`),
  },

  // 票券相關
  tickets: {
    getAll: (params?: any) => fetchClient.get('/tickets', params),
    getById: (id: string) => fetchClient.get(`/tickets/${id}`),
    getByCategory: (category: string) =>
      fetchClient.get('/tickets', { category }),
  },

  // 訂單相關
  orders: {
    getAll: (params?: any) => fetchClient.get('/orders', params),
    getById: (id: string) => fetchClient.get(`/orders/${id}`),
    create: (data: any) => fetchClient.post('/orders', data),
    getUserOrders: (userId: string) => fetchClient.get('/orders', { userId }),
  },

  // 分部相關
  branches: {
    getAll: () => fetchClient.get('/branches'),
  },
};

// 🔥 匯出 fetchClient 以便其他地方使用
export { fetchClient };
