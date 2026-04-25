import { Document } from 'mongoose';

// 心情分类类型
export type Category = '开心' | '焦虑' | '迷茫' | '吐槽';

// 心情接口
export interface IMood extends Document {
  _id: string;
  nickname: string;              // 漂流瓶#数字
  content: string;               // 正文内容
  category: Category;            // 分类
  resonanceCount: number;        // 共鸣数
  viewCount: number;             // 浏览数
  isReported: boolean;           // 是否被举报
  createdAt: Date;               // 发布时间
  updatedAt: Date;               // 更新时间
  userId: string;                // 发布者ID（加密）
  ipAddress?: string;            // IP地址（用于安全）
}

// 用户状态接口
export interface IUserState extends Document {
  _id: string;
  userId: string;                // 用户唯一ID
  resonanceIds: string[];        // 已共鸣的心情ID列表
  reportIds: string[];           // 已举报的心情ID列表
  dailyPublishCount: number;     // 今日发布计数
  lastPublishDate: string;       // 最后发布日期 YYYY-MM-DD
  createdAt: Date;
  updatedAt: Date;
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 统计数据
export interface IStats {
  total: number;
  todayNew: number;
}

// 心情创建DTO
export interface CreateMoodDto {
  content: string;
  category: Category;
  userId: string;
}

// 共鸣DTO
export interface ResonanceDto {
  moodId: string;
  userId: string;
}

// 举报DTO
export interface ReportDto {
  moodId: string;
  userId: string;
}
