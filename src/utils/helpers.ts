import { v4 as uuidv4 } from 'uuid';
import { Mood } from '../models/Mood';

// 生成唯一ID
export const generateId = (): string => {
  return uuidv4();
};

// 生成随机昵称
export const generateNickname = async (): Promise<string> => {
  let nickname: string;
  let attempts = 0;
  
  do {
    const num = Math.floor(Math.random() * (99999 - 1000 + 1)) + 1000;
    nickname = `漂流瓶#${num}`;
    attempts++;
    
    // 防止无限循环
    if (attempts > 100) {
      const num = Date.now() % 100000;
      nickname = `漂流瓶#${num}`;
      
      // 最终检查
      const exists = await Mood.findOne({ nickname });
      if (!exists) break;
    }
  } while (await Mood.findOne({ nickname }));
  
  return nickname;
};

// 获取今天日期字符串 YYYY-MM-DD
export const getTodayDateString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

// 检查是否是今天
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

// 格式化时间显示
export const formatTime = (date: Date): string => {
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
