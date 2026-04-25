#!/bin/bash

# 小海星·心情漂流瓶 - GitHub推送脚本
# 仓库: https://github.com/congyu1995/xiaohaixin-bottle2

echo "════════════════════════════════════════════╗"
echo "                                            ║"
echo "  🌊 推送代码到GitHub                       ║"
echo "                                            ║"
echo "  仓库: xiaohaixin-bottle2                  ║"
echo "  账号: congyu1995                          ║"
echo "                                            ║"
echo "════════════════════════════════════════════╝"
echo ""

# 进入项目目录
cd /home/user/mood-bottle-repo

# 检查远程仓库
if git remote | grep -q "origin"; then
    echo "✅ 远程仓库已配置"
else
    echo "➕ 添加远程仓库..."
    git remote add origin https://github.com/congyu1995/xiaohaixin-bottle2.git
fi

# 显示远程仓库信息
echo ""
echo "📍 远程仓库信息："
git remote -v

# 显示待推送的提交
echo ""
echo "📋 待推送的提交："
git log --oneline

echo ""
echo "════════════════════════════════════════════╗"
echo "                                            ║"
echo "  ⚠️  需要GitHub认证才能推送               ║"
echo "                                            ║"
echo "  请选择以下方式之一：                      ║"
echo "                                            ║"
echo "  1. 使用Personal Access Token             ║"
echo "     命令:                                 ║"
echo "     git push https://<TOKEN>@github.com/  ║"
echo "         congyu1995/xiaohaixin-bottle2.git ║"
echo "         main                              ║"
echo "                                            ║"
echo "  2. 使用SSH密钥                           ║"
echo "     命令:                                 ║"
echo "     git remote set-url origin \\          ║"
echo "         git@github.com:congyu1995/        ║"
echo "         xiaohaixin-bottle2.git            ║"
echo "     git push -u origin main               ║"
echo "                                            ║"
echo "════════════════════════════════════════════╝"
