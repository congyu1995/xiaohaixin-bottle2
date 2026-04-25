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

// 环境变量验证
console.log('🔍 检查环境变量...');
console.log('NODE_ENV:', process.env.NODE_ENV || '未设置');
console.log('PORT:', process.env.PORT || '未设置 (将使用默认值 3001)');
console.log('MONGODB_URI:', process.env.MONGODB_URI ? '已设置 ✓' : '未设置 ✗');
console.log('CLIENT_URL:', process.env.CLIENT_URL || '未设置 (将允许所有来源)');

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
    env: {
      nodeEnv: process.env.NODE_ENV || 'development',
      hasMongoUri: !!process.env.MONGODB_URI,
    },
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
    console.log('\n╔══════════════════════════════════════════╗');
    console.log('║                                          ║');
    console.log('║   🌊 小海星·心情漂流瓶                   ║');
    console.log('║                                          ║');
    console.log('╚══════════════════════════════════════════╝\n');
    
    // 连接数据库
    await connectDB();
    
    // 启动HTTP服务器
    app.listen(PORT, () => {
      console.log(`\n✅ 服务器启动成功!`);
      console.log(`📍 端口: ${PORT}`);
      console.log(`🌍 环境: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 健康检查: http://localhost:${PORT}/health`);
      console.log(`\n按 Ctrl+C 停止服务器\n`);
    });
  } catch (error) {
    console.error('\n❌ 服务器启动失败:', error);
    process.exit(1);
  }
};

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('\n📤 收到SIGTERM信号，正在关闭服务器...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n📤 收到SIGINT信号，正在关闭服务器...');
  process.exit(0);
});

// 未捕获异常处理
process.on('uncaughtException', (error) => {
  console.error('❌ 未捕获的异常:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ 未处理的Promise拒绝:', reason);
  process.exit(1);
});

startServer();
