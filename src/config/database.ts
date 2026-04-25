import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ 错误: MONGODB_URI 环境变量未设置');
  console.error('请在Railway中添加以下环境变量:');
  console.error('MONGODB_URI=mongodb+srv://用户名:密码@cluster.mongodb.net/数据库名');
  process.exit(1);
}

export const connectDB = async (): Promise<void> => {
  try {
    console.log('🔄 正在连接 MongoDB...');
    console.log(`📍 MongoDB URI: ${MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
    
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log(`✅ MongoDB 连接成功: ${conn.connection.host}`);
    console.log(`📊 数据库: ${conn.connection.name}`);
    
    // 连接事件监听
    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB 连接错误:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB 连接断开');
    });
    
  } catch (error: any) {
    console.error('❌ MongoDB 连接失败');
    console.error('错误类型:', error.name);
    console.error('错误信息:', error.message);
    
    if (error.name === 'MongooseServerSelectionError') {
      console.error('\n可能的原因:');
      console.error('1. MongoDB Atlas IP白名单未设置为 0.0.0.0/0');
      console.error('2. 用户名或密码错误');
      console.error('3. 连接字符串格式错误');
      console.error('4. 网络连接问题');
    }
    
    process.exit(1);
  }
};

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('📤 MongoDB 连接已关闭');
  } catch (error) {
    console.error('❌ 关闭 MongoDB 连接失败:', error);
  }
};
