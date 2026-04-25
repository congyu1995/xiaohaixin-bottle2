import { Mood } from '../types/mood';

// 生成唯一ID
export const generateId = (): string => {
  return `mood_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// 生成随机昵称
export const generateNickname = (existingMoods: Mood[]): string => {
  let nickname: string;
  let attempts = 0;
  
  do {
    const num = Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000;
    nickname = `漂流瓶#${num}`;
    attempts++;
    
    // 防止无限循环
    if (attempts > 1000) {
      const num = Date.now() % 100000;
      nickname = `漂流瓶#${num}`;
      break;
    }
  } while (existingMoods.some(mood => mood.nickname === nickname));
  
  return nickname;
};

// 生成用户ID
export const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// 获取今天日期字符串 YYYY-MM-DD
export const getTodayDateString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// 检查是否是今天
export const isToday = (dateString: string): boolean => {
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

// 格式化时间显示
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return '刚刚';
  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;
  
  return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
};

// 获取分类颜色
export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    '开心': '#10b981',
    '焦虑': '#f59e0b',
    '迷茫': '#3b82f6',
    '吐槽': '#f97316',
  };
  return colors[category] || '#6b7280';
};

// 获取分类背景色
export const getCategoryBgColor = (category: string): string => {
  const colors: Record<string, string> = {
    '开心': '#d1fae5',
    '焦虑': '#fef3c7',
    '迷茫': '#dbeafe',
    '吐槽': '#fed7aa',
  };
  return colors[category] || '#f3f4f6';
};
