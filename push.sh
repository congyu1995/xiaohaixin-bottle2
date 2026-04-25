#!/bin/bash

# 小海星·心情漂流瓶 - GitHub推送脚本

echo "🌊 准备推送代码到GitHub..."

# 检查git配置
if [ ! -d ".git" ]; then
    echo "初始化Git仓库..."
    git init
    git branch -m main
fi

# 检查是否有远程仓库
if ! git remote | grep -q "origin"; then
    echo ""
    echo "❌ 未检测到远程仓库"
    echo ""
    echo "请按照以下步骤操作："
    echo ""
    echo "1. 访问 https://github.com/new"
    echo "2. 创建名为 'mood-bottle' 的仓库"
    echo "3. 执行以下命令："
    echo ""
    echo "   git remote add origin https://github.com/congyu1995/mood-bottle.git"
    echo "   git push -u origin main"
    echo ""
    exit 1
fi

# 添加所有更改
echo "📦 添加文件..."
git add .

# 提交
echo "💾 提交更改..."
git commit -m "update: 更新部署配置和文档"

# 推送
echo "🚀 推送到GitHub..."
git push origin main

echo ""
echo "✅ 推送完成！"
echo ""
echo "接下来："
echo "1. 访问 Railway.app 部署后端"
echo "2. 访问 Vercel.com 部署前端"
echo "3. 详细步骤请查看 DEPLOY.md"
