# 小海星·心情漂流瓶 🌊

一个轻量级的匿名心情分享应用，以"漂流瓶"为隐喻，营造安全、自由的情感表达空间。

## 🌟 功能特性

### 必做功能 ✅
- **浏览与筛选**: 心情列表按时间倒序，支持分类筛选（全部/开心/焦虑/迷茫/吐槽）
- **匿名投递**: 正文≤200字，随机生成昵称（漂流瓶#数字）
- **共鸣机制**: 点击toggle共鸣状态，实时更新计数
- **举报机制**: 二次确认，内容保留并标记"已举报"
- **持久化**: 所有数据完整保留

### 进阶功能 ✅
- 空状态温馨提示
- 总心情数/今日新增统计
- 运营筛选"只看已举报"

### 额外功能
- 每日发布限制（10条/天）
- 敏感词过滤
- 发布成功动画
- 响应式设计

## 🏗️ 技术栈

### 前端
- React 18 + TypeScript
- 原生CSS（移动端优先）
- LocalStorage持久化

### 后端
- Node.js + Express + TypeScript
- MongoDB数据库
- 安全中间件（Helmet、CORS、Rate Limit）

### 部署
- Railway（后端）
- MongoDB Atlas（数据库）
- GitHub（代码托管）

## 📦 项目结构

```
mood-bottle/
├── client/                  # 前端
│   ├── src/
│   │   ├── components/     # React组件
│   │   ├── hooks/          # 自定义Hooks
│   │   ├── services/       # API服务
│   │   ├── types/          # TypeScript类型
│   │   └── utils/          # 工具函数
│   └── public/
│
└── server/                  # 后端
    ├── src/
    │   ├── controllers/    # 控制器
    │   ├── models/         # 数据模型
    │   ├── routes/         # 路由
    │   ├── middleware/     # 中间件
    │   ├── config/         # 配置
    │   └── utils/          # 工具
    └── dist/               # 编译输出
```

## 🚀 本地开发

### 前置要求
- Node.js >= 18.0.0
- MongoDB >= 6.0

### 1. 克隆项目
```bash
git clone https://github.com/congyu1995/mood-bottle.git
cd mood-bottle
```

### 2. 后端设置
```bash
cd server
npm install
cp .env.example .env
# 编辑.env配置MongoDB连接
npm run dev
```

### 3. 前端设置
```bash
cd ../client
npm install
npm start
```

### 4. 访问应用
- 前端: http://localhost:3000
- 后端API: http://localhost:3001
- 健康检查: http://localhost:3001/health

## 🌐 在线演示

- **应用地址**: [待部署后更新]
- **API文档**: [待部署后更新]

## 📡 API接口

### 心情相关
- `GET /api/moods` - 获取心情列表
- `POST /api/moods` - 发布心情
- `GET /api/stats` - 获取统计数据
- `PATCH /api/moods/:id/view` - 增加浏览数

### 用户操作
- `POST /api/resonance` - 共鸣操作
- `POST /api/report` - 举报操作
- `GET /api/user-state/:userId` - 获取用户状态

### 系统接口
- `GET /health` - 健康检查
- `GET /` - API信息

## 🔒 安全特性

- ✅ CORS跨域保护
- ✅ Helmet安全头
- ✅ Rate Limit频率限制
- ✅ 敏感词过滤
- ✅ 输入验证
- ✅ XSS防护

## 📊 数据库设计

### Moods集合
```javascript
{
  _id: ObjectId,
  nickname: String,        // 漂流瓶#数字
  content: String,         // 正文
  category: String,        // 分类
  resonanceCount: Number,  // 共鸣数
  viewCount: Number,       // 浏览数
  isReported: Boolean,     // 是否举报
  userId: String,          // 用户ID
  createdAt: Date,
  updatedAt: Date
}
```

### UserStates集合
```javascript
{
  _id: ObjectId,
  userId: String,          // 用户ID
  resonanceIds: [String],  // 已共鸣的心情
  reportIds: [String],     // 已举报的心情
  dailyPublishCount: Number,
  lastPublishDate: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 界面预览

![心情列表](screenshots/list.png)
![发布界面](screenshots/publish.png)

## 📝 开发日志

- **2026-04-25**: v1.0.0发布
  - 完成全部必做功能
  - 完成全部进阶功能
  - 后端API开发完成
  - Railway部署配置完成

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📄 许可证

MIT License

---

**小海星·心情漂流瓶** - 让每一份心情都能被听见 🌊

Made with ❤️ by congyu1995
