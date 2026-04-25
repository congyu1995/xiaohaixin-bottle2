# 🚀 小海星·心情漂流瓶 - 部署指南

## 第一步：推送代码到GitHub

### 1. 创建GitHub仓库

1. 访问 https://github.com/new
2. 仓库名称: `mood-bottle`
3. 描述: `小海星·心情漂流瓶 - 匿名心情分享应用`
4. 选择 **Private** 或 **Public**
5. **不要**勾选 "Add a README file"（我们已经有了）
6. 点击 **Create repository**

### 2. 推送代码到GitHub

在本地执行以下命令：

```bash
cd /home/user/mood-bottle-repo

# 添加远程仓库
git remote add origin https://github.com/congyu1995/mood-bottle.git

# 推送到GitHub
git push -u origin main
```

**注意**：如果提示需要认证，请使用以下方式：

#### 方式一：使用Personal Access Token（推荐）
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 勾选 `repo` 权限
4. 生成token并复制
5. 使用token推送：
```bash
git push https://<YOUR_TOKEN>@github.com/congyu1995/mood-bottle.git main
```

#### 方式二：使用SSH
```bash
git remote set-url origin git@github.com:congyu1995/mood-bottle.git
git push -u origin main
```

---

## 第二步：创建MongoDB Atlas数据库

### 1. 注册/登录MongoDB Atlas
访问: https://www.mongodb.com/cloud/atlas/register

### 2. 创建免费集群
1. 选择 **Free** 计划
2. 选择离你最近的区域（推荐：Singapore 或 Hong Kong）
3. 点击 **Create Cluster**

### 3. 创建数据库用户
1. 左侧菜单选择 **Database Access**
2. 点击 **Add New Database User**
3. 用户名: `moodbottle`
4. 密码: 自动生成或自定义（记住这个密码）
5. 权限: `Read and write to any database`
6. 点击 **Add User**

### 4. 配置网络访问
1. 左侧菜单选择 **Network Access**
2. 点击 **Add IP Address**
3. 点击 **Allow Access from Anywhere**（会自动填入 `0.0.0.0/0`）
4. 点击 **Confirm**

### 5. 获取连接字符串
1. 左侧菜单选择 **Database**
2. 点击 **Connect**
3. 选择 **Connect your application**
4. Driver: Node.js, Version: 5.5 or later
5. 复制连接字符串，格式如：
```
mongodb+srv://moodbottle:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```
6. 将 `<password>` 替换为你的数据库用户密码

---

## 第三步：在Railway部署后端

### 1. 登录Railway
访问: https://railway.app/
点击 **Login with GitHub**

### 2. 创建新项目
1. 点击 **New Project**
2. 选择 **Deploy from GitHub repo**
3. 选择 `mood-bottle` 仓库
4. 点击 **Deploy Now**

### 3. 配置项目
Railway会自动检测到Node.js项目，但我们需要配置：

#### 配置Root Directory
1. 点击项目 → Settings
2. Root Directory: 设置为 `/server`
3. 点击 **Save**

#### 配置环境变量
1. 点击项目 → Variables
2. 点击 **Add Variable**
3. 添加以下变量：

| 变量名 | 值 |
|--------|-----|
| `MONGODB_URI` | 你的MongoDB连接字符串 |
| `NODE_ENV` | production |
| `PORT` | 3001 |
| `CLIENT_URL` | 你的前端地址（稍后添加） |

示例：
```
MONGODB_URI=mongodb+srv://moodbottle:your_password@cluster0.xxxxx.mongodb.net/mood-bottle?retryWrites=true&w=majority
```

### 4. 重新部署
1. 点击 **Deployments**
2. 点击最新部署右侧的三个点
3. 选择 **Redeploy**

### 5. 添加域名
1. 点击项目 → Settings
2. 点击 **Generate Domain**
3. 等待域名生成完成
4. 你会得到类似 `mood-bottle-production.up.railway.app` 的域名

### 6. 测试后端
访问: `https://your-domain.up.railway.app/health`
应该看到：
```json
{
  "success": true,
  "message": "服务正常运行",
  "timestamp": "2026-04-25T..."
}
```

---

## 第四步：部署前端

### 方式一：使用Vercel（推荐）

#### 1. 登录Vercel
访问: https://vercel.com/
点击 **Login with GitHub**

#### 2. 导入项目
1. 点击 **New Project**
2. 选择 `mood-bottle` 仓库
3. Framework Preset: **Create React App**
4. Root Directory: `/client`
5. 点击 **Environment Variables**
6. 添加：
   - `REACT_APP_API_URL` = `https://your-railway-domain.up.railway.app/api`
7. 点击 **Deploy**

#### 3. 等待部署完成
大约1-2分钟后，你会得到一个域名，如：
`https://mood-bottle.vercel.app`

### 方式二：使用Railway部署前端

如果想在同一个Railway项目中部署前端：

#### 1. 创建前端构建
在本地执行：
```bash
cd /home/user/mood-bottle-repo/client
npm install
npm run build
```

#### 2. 配置Railway服务
1. 在Railway项目中点击 **New Service**
2. 选择 **GitHub Repo**
3. 选择 `mood-bottle` 仓库
4. 配置Root Directory为 `/client`
5. 配置构建命令和启动命令

---

## 第五步：更新前端API配置

### 方式一：更新环境变量
在Vercel或Railway的前端项目设置中，更新环境变量：
```
REACT_APP_API_URL=https://your-railway-backend-domain.up.railway.app/api
```

### 方式二：更新后端CORS配置
在Railway后端项目变量中，更新：
```
CLIENT_URL=https://your-frontend-domain.vercel.app
```

---

## 第六步：完整测试

### 1. 测试前端
访问你的前端域名，检查：
- ✅ 页面正常加载
- ✅ 可以发布心情
- ✅ 可以共鸣
- ✅ 可以举报
- ✅ 数据持久化

### 2. 测试后端
访问你的后端域名：
- `/health` - 健康检查
- `/` - API信息
- `/api/stats` - 统计数据
- `/api/moods` - 心情列表

---

## 🎉 完成！

现在你的应用已经完全部署上线，公网用户可以访问！

### 项目地址
- **前端**: https://your-frontend-domain.vercel.app
- **后端**: https://your-backend-domain.up.railway.app
- **GitHub**: https://github.com/congyu1995/mood-bottle

---

## 常见问题

### Q: MongoDB连接失败？
A: 检查：
1. IP白名单是否设置为 `0.0.0.0/0`
2. 用户名密码是否正确
3. 连接字符串格式是否正确

### Q: 前端无法访问后端？
A: 检查：
1. `REACT_APP_API_URL` 是否正确
2. 后端 `CLIENT_URL` 是否包含前端域名
3. 浏览器控制台是否有CORS错误

### Q: Railway部署失败？
A: 检查：
1. Root Directory 是否设置为 `/server`
2. 环境变量是否完整
3. 查看部署日志排查错误

### Q: 如何查看日志？
A: 
- Railway: 点击项目 → Deployments → 点击部署 → View Logs
- Vercel: 点击项目 → Deployments → 点击部署 → Functions

---

## 维护说明

### 更新代码
```bash
cd /home/user/mood-bottle-repo
git add .
git commit -m "update: 你的更新说明"
git push origin main
```
Railway和Vercel会自动重新部署。

### 查看MongoDB数据
1. 登录MongoDB Atlas
2. 左侧菜单选择 **Browse Collections**
3. 可以查看和管理所有数据

### 监控应用
- **Railway**: 项目仪表盘查看CPU、内存使用情况
- **Vercel**: 项目Analytics查看访问数据
- **MongoDB Atlas**: Database页面查看连接数和操作统计
