#!/bin/bash

# 小海星·心情漂流瓶 - 快速部署脚本

echo "🌊 开始部署小海星·心情漂流瓶..."

# 检查是否在项目根目录
if [ ! -d "server" ] || [ ! -d "client" ]; then
    echo "❌ 请在项目根目录执行此脚本"
    exit 1
fi

# 部署后端
echo ""
echo "📦 部署后端..."
cd server
npm install
npm run build
echo "✅ 后端构建完成"

# 部署前端
echo ""
echo "📦 部署前端..."
cd ../client
npm install
npm run build
echo "✅ 前端构建完成"

# 提示
echo ""
echo "══════════════════════════════════════════╗"
echo "                                          ║"
echo "  ✅ 构建完成！                          ║"
echo "                                          ║"
echo "  接下来：                                ║"
echo "  1. 推送代码到GitHub                     ║"
echo "  2. 在Railway部署后端                    ║"
echo "  3. 在Vercel部署前端                     ║"
echo "                                          ║"
echo "  详细步骤请查看 DEPLOY.md 文件           ║"
echo "                                          ║"
echo "══════════════════════════════════════════╝"
