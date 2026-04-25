// 心情分类类型
export type Category = '全部' | '开心' | '焦虑' | '迷茫' | '吐槽';

// 心情数据模型
export interface Mood {
  id: string;                    // 心情唯一ID
  nickname: string;              // 漂流瓶#数字
  content: string;               // 正文内容
  category: Exclude<Category, '全部'>; // 分类（不含"全部"）
  resonanceCount: number;        // 共鸣数
  viewCount: number;             // 浏览数
  isReported: boolean;           // 是否被举报
  createdAt: string;             // 发布时间 ISO格式
  userId: string;                // 发布者ID
}

// 用户状态模型
export interface UserState {
  userId: string;                // 用户ID
  resonanceIds: string[];        // 已共鸣的心情ID列表
  reportIds: string[];           // 已举报的心情ID列表
  publishedMoodIds: string[];    // 自己发布的心情ID
  dailyPublishCount: number;     // 今日发布计数
  lastPublishDate: string;       // 最后发布日期 YYYY-MM-DD
}

// 统计数据
export interface Stats {
  total: number;                 // 总心情数
  todayNew: number;              // 今日新增
}
