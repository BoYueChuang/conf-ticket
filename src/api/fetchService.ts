
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

        console.log('📤 Fetch Request:', options.method || 'GET', url);

        try {
            const response = await fetch(url, finalOptions);

            console.log('📥 Fetch Response:', response.status, url);

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
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
        getByCategory: (category: string) => fetchClient.get('/tickets', { category }),
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