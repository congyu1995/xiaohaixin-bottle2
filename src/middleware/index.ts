import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

// 请求频率限制
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15分钟
  max: 100, // 最多100个请求
  message: {
    success: false,
    message: '请求过于频繁，请稍后再试',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 发布频率限制
export const publishLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1小时
  max: 20, // 最多20次发布
  message: {
    success: false,
    message: '发布频率超限，请稍后再试',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 错误处理中间件
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error);
  
  res.status(error.status || 500).json({
    success: false,
    message: error.message || '服务器内部错误',
  });
};

// 404处理
export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: '接口不存在',
  });
};
