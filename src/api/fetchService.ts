import { ROUTES } from "../constants/routes";

class FetchService {
  private baseURL: string;
  private readonly TOKEN_KEY = 'auth_token';

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  //  Token 管理方法
  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clearToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  hasToken(): boolean {
    return !!this.getToken();
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;

    //  從 localStorage 取得 token
    const token = this.getToken();

    // 預設設定
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    //  如果有 token，加到 Authorization header
    if (token) {
      defaultOptions.headers = {
        ...defaultOptions.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    // 合併設定
    const finalOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, finalOptions);

      // 攔截器：處理 401/403 錯誤
      if (response.status === 401 || response.status === 403) {
        this.clearToken();

        // 重定向到登入頁面
        window.location.href = ROUTES.LOGIN;
      }

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status} ${response.statusText}`
        );
      }

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

  // API 方法保持不變
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

  async post(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint: string, data: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

const fetchClient = new FetchService('/api');
const EMAIL_KEY = 'loginEmail';

//  API 服務定義
export const apiService = {
  // 認證相關 API
  memberAuthentication: {
    auth: async (email: { email: string }) => {
      const response = await fetchClient.post('/v1/auth', email);
      return response;
    },

    getCurrentUser: () => fetchClient.get('/auth/me'),
  },
  members: {
    members: async () => {
      const response = await fetchClient.get(`/v1/members?page=1&limit=1&sort=-createdAt&where%5Bemail%5D%5Bequals%5D=${encodeURIComponent(localStorage.getItem(EMAIL_KEY) as string)}`);
      return response;
    },
  },
  // 其他 API 保持不變
  users: {
    getAll: () => fetchClient.get('/users'),
    getById: (id: string) => fetchClient.get(`/users/${id}`),
    create: (data: any) => fetchClient.post('/users', data),
  },

  tickets: {
    getAll: (params?: any) => fetchClient.get('/tickets', params),
    getById: (id: string) => fetchClient.get(`/tickets/${id}`),
  },

  orders: {
    getAll: (params?: any) => fetchClient.get('/orders', params),
    create: (data: any) => fetchClient.post('/orders', data),
  },

  branches: {
    getAll: () => fetchClient.get('/branches'),
  },
};

export { fetchClient };

