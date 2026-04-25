import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import routes from './routes';
import { limiter, publishLimiter, errorHandler, notFoundHandler } from './middleware';

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(helmet());
app.use(compression());
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));

// 静态文件服务（用于部署前端）
app.use(express.static('public'));

// 速率限制
app.use('/api/', limiter);

// 路由
app.use('/api', routes);

// 发布接口额外限流
app.use('/api/moods', publishLimiter);

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: '服务正常运行',
    timestamp: new Date().toISOString(),
  });
});

// 根路径
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🌊 小海星·心情漂流瓶 API',
    version: '1.0.0',
    endpoints: {
      moods: '/api/moods',
      stats: '/api/stats',
      health: '/health',
    },
  });
});

// 错误处理
app.use(notFoundHandler);
app.use(errorHandler);

// 启动服务器
const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`
╔══════════════════════════════════════════╗
║                                          ║
║   🌊 心情漂流瓶服务器已启动               ║
║                                          ║
║   端口: ${PORT}                          ║
║   环境: ${process.env.NODE_ENV || 'development'}                    ║
║                                          ║
╚══════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('❌ 服务器启动失败:', error);
    process.exit(1);
  }
};

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('📤 收到SIGTERM信号，正在关闭服务器...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('📤 收到SIGINT信号，正在关闭服务器...');
  process.exit(0);
});

startServer();
