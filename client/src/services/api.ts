// API配置
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// API请求封装
const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || '请求失败');
    }
    
    return data;
  } catch (error) {
    console.error('API请求错误:', error);
    throw error;
  }
};

// 心情API
export const moodApi = {
  // 获取心情列表
  getMoods: async (category?: string, reported?: boolean) => {
    const params = new URLSearchParams();
    if (category && category !== '全部') params.append('category', category);
    if (reported) params.append('reported', 'true');
    
    const query = params.toString() ? `?${params.toString()}` : '';
    return apiRequest(`/moods${query}`);
  },
  
  // 获取统计数据
  getStats: async () => {
    return apiRequest('/stats');
  },
  
  // 发布心情
  createMood: async (data: { content: string; category: string; userId: string }) => {
    return apiRequest('/moods', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  
  // 共鸣操作
  toggleResonance: async (moodId: string, userId: string) => {
    return apiRequest('/resonance', {
      method: 'POST',
      body: JSON.stringify({ moodId, userId }),
    });
  },
  
  // 举报操作
  reportMood: async (moodId: string, userId: string) => {
    return apiRequest('/report', {
      method: 'POST',
      body: JSON.stringify({ moodId, userId }),
    });
  },
  
  // 增加浏览数
  incrementViewCount: async (moodId: string) => {
    return apiRequest(`/moods/${moodId}/view`, {
      method: 'PATCH',
    });
  },
  
  // 获取用户状态
  getUserState: async (userId: string) => {
    return apiRequest(`/user-state/${userId}`);
  },
};
