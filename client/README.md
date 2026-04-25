# 小海星·心情漂流瓶 🌊

一个轻量级的匿名心情分享应用，以"漂流瓶"为隐喻，营造安全、自由的情感表达空间。

## ✨ 功能特性

### 必做功能（已全部实现）

#### 1. 浏览与筛选 ✓
- [x] 心情列表按时间倒序排列（最新在上）
- [x] 顶部分类筛选：「全部/开心/焦虑/迷茫/吐槽」
- [x] 心情卡片展示：随机昵称（漂流瓶#数字）、正文、分类标签、共鸣数、浏览数、已举报标记

#### 2. 匿名投递 ✓
- [x] 正文输入（≤200字，实时字数统计）
- [x] 四选一分类选择（开心/焦虑/迷茫/吐槽）
- [x] 发布后新内容立即置顶显示
- [x] 随机生成唯一昵称

#### 3. 共鸣机制 ✓
- [x] 点击toggle共鸣状态
- [x] 共鸣数±1实时更新
- [x] 同用户同内容仅一次
- [x] 高亮显示已共鸣状态

#### 4. 举报机制 ✓
- [x] 二次确认弹窗
- [x] 内容保留但增加"已举报"标记
- [x] 不可重复举报

#### 5. 持久化 ✓
- [x] 用户再次打开时，所有内容保留
- [x] 共鸣状态与数量保留
- [x] 举报标记保留

### 进阶功能（已全部实现）

- [x] 空状态提示（分类无内容时显示温馨提示）
- [x] 页面顶部展示"总心情数"和"今日新增"
- [x] 运营筛选："只看已举报"视图（点击🚨按钮）

### 额外功能

- [x] 每日发布限制（每天最多10条）
- [x] 发布成功动画提示
- [x] 时间友好显示（刚刚/分钟前/小时前/天前）
- [x] 响应式设计（移动端优先）

## 🛠 技术栈

- **框架**: React 18 + TypeScript
- **状态管理**: useState + Context
- **持久化**: localStorage
- **样式**: CSS3（原生CSS，无框架依赖）

## 📦 项目结构

```
mood-bottle/
├── public/
│   └── index.html              # HTML模板
├── src/
│   ├── components/
│   │   ├── StatsBar.tsx        # 统计栏组件
│   │   ├── FilterBar.tsx       # 分类筛选栏
│   │   ├── MoodCard.tsx        # 心情卡片
│   │   ├── MoodList.tsx        # 心情列表
│   │   ├── EmptyState.tsx      # 空状态组件
│   │   └── PublishModal.tsx    # 发布浮层
│   ├── hooks/
│   │   ├── useLocalStorage.ts  # 本地存储Hook
│   │   ├── useUserState.ts     # 用户状态管理
│   │   └── useMoodData.ts      # 心情数据管理
│   ├── types/
│   │   └── mood.ts             # TypeScript类型定义
│   ├── utils/
│   │   └── dataUtils.ts        # 工具函数
│   ├── App.tsx                 # 主应用组件
│   ├── App.css                 # 样式文件
│   └── index.tsx               # 入口文件
├── package.json
└── tsconfig.json
```

## 🚀 快速开始

### 安装依赖

```bash
cd mood-bottle
npm install
```

### 启动开发服务器

```bash
npm start
```

应用将在 `http://localhost:3000` 打开。

### 构建生产版本

```bash
npm run build
```

## 📱 界面预览

### 首页
- 顶部：标题 + 统计信息（总心情数、今日新增）
- 中部：分类筛选栏 + 运营筛选按钮
- 主体：心情卡片列表
- 底部：浮动发布按钮

### 心情卡片
- 随机昵称 + 发布时间
- 心情正文
- 分类标签（带颜色标识）
- 共鸣数 + 浏览数
- 已举报标记（如有）
- 共鸣按钮 + 举报按钮

### 发布浮层
- 正文输入框（200字限制，实时计数）
- 分类选择（四选一）
- 投递按钮

## 🎨 设计亮点

### 匿名感设计
- 随机昵称格式：`漂流瓶#{数字}`
- 无头像、无用户主页
- 每次发布生成新昵称

### 交互体验
- 共鸣状态即时反馈
- 发布成功动画提示
- 空状态温馨引导

### 数据持久化
- 本地存储完整保留用户状态
- 共鸣、举报、发布历史均可恢复

## 📊 数据结构

### 心情数据 (Mood)
```typescript
interface Mood {
  id: string;                    // 心情唯一ID
  nickname: string;              // 漂流瓶#数字
  content: string;               // 正文内容
  category: '开心' | '焦虑' | '迷茫' | '吐槽';
  resonanceCount: number;        // 共鸣数
  viewCount: number;             // 浏览数
  isReported: boolean;           // 是否被举报
  createdAt: string;             // 发布时间 ISO格式
  userId: string;                // 发布者ID
}
```

### 用户状态 (UserState)
```typescript
interface UserState {
  userId: string;                // 用户ID
  resonanceIds: string[];        // 已共鸣的心情ID列表
  reportIds: string[];           // 已举报的心情ID列表
  publishedMoodIds: string[];    // 自己发布的心情ID
  dailyPublishCount: number;     // 今日发布计数
  lastPublishDate: string;       // 最后发布日期
}
```

## 🔒 安全考虑

- 用户ID仅本地存储，前端不展示
- 昵称随机生成，无规律可循
- 发布频率限制（每天10条）
- 敏感词过滤（需接入后端API）

## 📝 开发日志

- **2026-04-25**: V1.0版本发布
  - 完成所有必做功能
  - 完成所有进阶功能
  - 完善交互细节和样式

## 📄 License

MIT

---

**小海星·心情漂流瓶** - 让每一份心情都能被听见 🌊
